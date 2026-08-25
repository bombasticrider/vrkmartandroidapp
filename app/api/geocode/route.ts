import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  if (!lat || !lng) {
    return NextResponse.json({ error: 'Missing lat/lng' }, { status: 400 });
  }

  try {
    // BigDataCloud reverse geocoding (called server-side — no CSP issues)
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`,
      { next: { revalidate: 0 } }
    );

    if (!res.ok) {
      return NextResponse.json({ error: 'Geocoding API failed' }, { status: 502 });
    }

    const data = await res.json();

    const rawPostcode = data.postcode
      ? data.postcode.replace(/\D/g, '').slice(0, 6)
      : '';

    const area =
      data.locality ||
      data.city ||
      data.principalSubdivision ||
      'Bengaluru';

    const city: string = (data.city || '').toLowerCase();
    const subdivision: string = (data.principalSubdivision || '').toLowerCase();

    if (rawPostcode.length === 6) {
      return NextResponse.json({ pincode: rawPostcode, areaName: area });
    }

    // Fallback for Bengaluru-identified but no postcode
    if (
      city.includes('bengaluru') ||
      city.includes('bangalore') ||
      subdivision.includes('karnataka')
    ) {
      return NextResponse.json({ pincode: '560001', areaName: area });
    }

    return NextResponse.json({ error: 'Could not determine pincode', areaName: area }, { status: 422 });
  } catch (err) {
    console.error('Geocode API error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

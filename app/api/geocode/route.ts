import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  if (!lat || !lng) {
    return NextResponse.json({ error: 'Missing lat/lng' }, { status: 400 });
  }

  try {
    // 1. Primary: OpenStreetMap Nominatim (High accuracy for Indian postal codes & sectors)
    try {
      const osmRes = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'VRKMart-GroceryApp/1.0',
            'Accept-Language': 'en',
          },
          next: { revalidate: 0 },
        }
      );

      if (osmRes.ok) {
        const osmData = await osmRes.json();
        const address = osmData.address || {};
        const rawPin = address.postcode
          ? address.postcode.replace(/\D/g, '').slice(0, 6)
          : '';

        const areaName =
          address.suburb ||
          address.neighbourhood ||
          address.county ||
          address.city ||
          address.town ||
          address.village ||
          'Bengaluru';

        if (rawPin.length === 6) {
          return NextResponse.json({
            pincode: rawPin,
            areaName,
            city: address.city || address.state_district || 'Bengaluru',
            state: address.state || 'Karnataka',
          });
        }
      }
    } catch (e) {
      console.warn('Nominatim fallback triggered:', e);
    }

    // 2. Fallback: BigDataCloud API
    const bdcRes = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`,
      { next: { revalidate: 0 } }
    );

    if (bdcRes.ok) {
      const bdcData = await bdcRes.json();
      const rawPostcode = bdcData.postcode
        ? bdcData.postcode.replace(/\D/g, '').slice(0, 6)
        : '';

      const area =
        bdcData.locality ||
        bdcData.city ||
        bdcData.principalSubdivision ||
        'Bengaluru';

      const city = (bdcData.city || '').toLowerCase();
      const subdivision = (bdcData.principalSubdivision || '').toLowerCase();

      if (rawPostcode.length === 6) {
        return NextResponse.json({ pincode: rawPostcode, areaName: area });
      }

      // If recognized as Bengaluru/Karnataka area but missing exact postcode
      if (
        city.includes('bengaluru') ||
        city.includes('bangalore') ||
        subdivision.includes('karnataka')
      ) {
        return NextResponse.json({ pincode: '560001', areaName: area });
      }

      // If outside Karnataka, assign 999999 so it cleanly triggers View-Only Mode
      return NextResponse.json({ pincode: '999999', areaName: area });
    }

    return NextResponse.json(
      { error: 'Could not determine pincode' },
      { status: 422 }
    );
  } catch (err) {
    console.error('Geocode API error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

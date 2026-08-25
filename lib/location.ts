/**
 * Reverse geocoding utility to get Indian postal code and area name from GPS coordinates
 */
export async function getPincodeFromCoordinates(
  lat: number,
  lng: number
): Promise<{ pincode: string; areaName: string } | null> {
  try {
    // Free, fast reverse geocoding API for client side
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
    );

    if (!res.ok) return null;

    const data = await res.json();
    const rawPostcode = data.postcode ? data.postcode.replace(/\D/g, '').slice(0, 6) : '';
    const area = data.locality || data.city || data.principalSubdivision || 'Bengaluru';

    if (rawPostcode.length === 6) {
      return {
        pincode: rawPostcode,
        areaName: area,
      };
    }

    // Fallback: Check if city is Bengaluru or Karnataka
    if (
      data.city?.toLowerCase().includes('bengaluru') ||
      data.city?.toLowerCase().includes('bangalore') ||
      data.principalSubdivision?.toLowerCase().includes('karnataka')
    ) {
      return {
        pincode: '560001',
        areaName: area,
      };
    }

    return null;
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    return null;
  }
}

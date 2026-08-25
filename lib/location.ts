/**
 * Reverse geocoding utility — calls our own /api/geocode server route
 * so no CSP or CORS issues arise from direct browser → external API calls.
 */
export async function getPincodeFromCoordinates(
  lat: number,
  lng: number
): Promise<{ pincode: string; areaName: string } | null> {
  try {
    const res = await fetch(
      `/api/geocode?lat=${lat}&lng=${lng}`,
      { method: 'GET' }
    );

    if (!res.ok) return null;

    const data = await res.json();

    if (data.pincode && data.pincode.length === 6) {
      return {
        pincode: data.pincode,
        areaName: data.areaName || 'Bengaluru',
      };
    }

    return null;
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    return null;
  }
}

import { Router, Request, Response } from 'express';
import { AGRI_RESOURCES, GOVT_SCHEMES, AgriResource } from '../data/resourcesDatabase';

const router = Router();

// Haversine formula to compute distance in kilometers
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return parseFloat((R * c).toFixed(1));
}

// GET /api/resources - Get nearby agricultural resources with optional lat/lng and type filter
router.get('/', (req: Request, res: Response) => {
  const { lat, lng, type, search } = req.query;
  let resources = [...AGRI_RESOURCES];

  if (type && type !== 'All') {
    resources = resources.filter((r) => r.type.toLowerCase() === (type as string).toLowerCase());
  }

  if (search) {
    const q = (search as string).toLowerCase();
    resources = resources.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.city.toLowerCase().includes(q) ||
        r.state.toLowerCase().includes(q) ||
        r.services.some((s) => s.toLowerCase().includes(q))
    );
  }

  // Calculate distance if lat/lng are provided
  let userLat: number | null = null;
  let userLng: number | null = null;

  if (lat && lng) {
    userLat = parseFloat(lat as string);
    userLng = parseFloat(lng as string);
  }

  const enriched = resources.map((r) => {
    let distanceKm: number | null = null;
    if (userLat !== null && userLng !== null && !isNaN(userLat) && !isNaN(userLng)) {
      distanceKm = getDistanceFromLatLonInKm(userLat, userLng, r.latitude, r.longitude);
    }
    return {
      ...r,
      distanceKm
    };
  });

  // Sort by distance if calculated
  if (userLat !== null && userLng !== null) {
    enriched.sort((a, b) => (a.distanceKm ?? 9999) - (b.distanceKm ?? 9999));
  }

  return res.json({
    success: true,
    total: enriched.length,
    userLocation: userLat !== null ? { lat: userLat, lng: userLng } : null,
    data: enriched
  });
});

// GET /api/resources/schemes - Get Government agricultural schemes
router.get('/schemes', (_req: Request, res: Response) => {
  return res.json({
    success: true,
    total: GOVT_SCHEMES.length,
    data: GOVT_SCHEMES
  });
});

export default router;

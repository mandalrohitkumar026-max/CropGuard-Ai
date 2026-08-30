import { Router, Request, Response } from 'express';
import { reportStore } from '../services/reportStore';
import { CROPS_DATABASE } from '../data/cropsDatabase';

const router = Router();

// GET /api/stats - Farmer dashboard summary metrics
router.get('/', (_req: Request, res: Response) => {
  const reports = reportStore.getAll();

  const totalScans = reports.length;
  const healthyScans = reports.filter((r) => r.severity === 'Healthy').length;
  const diseasesDetected = totalScans - healthyScans;
  const highRiskCases = reports.filter((r) => r.severity === 'Severe').length;
  const moderateCases = reports.filter((r) => r.severity === 'Moderate').length;
  const mildCases = reports.filter((r) => r.severity === 'Mild').length;

  const averageConfidence =
    totalScans > 0 ? parseFloat((reports.reduce((acc, curr) => acc + curr.confidence, 0) / totalScans).toFixed(1)) : 0;

  // Breakdown by crop
  const cropMap: Record<string, number> = {};
  reports.forEach((r) => {
    cropMap[r.crop.name] = (cropMap[r.crop.name] || 0) + 1;
  });

  // Recent 5 scans
  const recentScans = reports.slice(0, 5);

  return res.json({
    success: true,
    data: {
      totalScans,
      healthyScans,
      diseasesDetected,
      highRiskCases,
      moderateCases,
      mildCases,
      averageConfidence,
      cropBreakdown: cropMap,
      totalSupportedCrops: CROPS_DATABASE.length,
      recentScans
    }
  });
});

export default router;

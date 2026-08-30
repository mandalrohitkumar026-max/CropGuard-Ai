import { Router, Request, Response } from 'express';
import { reportStore, SavedReport } from '../services/reportStore';

const router = Router();

// GET /api/reports - Get all saved reports
router.get('/', (req: Request, res: Response) => {
  const { crop, severity, search } = req.query;
  let reports = reportStore.getAll();

  if (crop && crop !== 'All') {
    reports = reports.filter((r) => r.crop.id.toLowerCase() === (crop as string).toLowerCase() || r.crop.name.toLowerCase() === (crop as string).toLowerCase());
  }

  if (severity && severity !== 'All') {
    reports = reports.filter((r) => r.severity.toLowerCase() === (severity as string).toLowerCase());
  }

  if (search) {
    const q = (search as string).toLowerCase();
    reports = reports.filter(
      (r) =>
        r.disease.name.toLowerCase().includes(q) ||
        r.crop.name.toLowerCase().includes(q) ||
        r.fieldLocation?.toLowerCase().includes(q) ||
        r.farmerName?.toLowerCase().includes(q)
    );
  }

  return res.json({
    success: true,
    total: reports.length,
    data: reports
  });
});

// GET /api/reports/:id - Get specific report by ID
router.get('/:id', (req: Request, res: Response) => {
  const report = reportStore.getById(req.params.id);
  if (!report) {
    return res.status(404).json({ success: false, error: 'Diagnostic report not found.' });
  }
  return res.json({ success: true, data: report });
});

// POST /api/reports - Save or update report
router.post('/', (req: Request, res: Response) => {
  const payload = req.body as SavedReport;
  if (!payload || !payload.id) {
    return res.status(400).json({ success: false, error: 'Invalid report data.' });
  }
  const saved = reportStore.save(payload);
  return res.status(201).json({ success: true, data: saved, message: 'Report saved to farmer records.' });
});

// DELETE /api/reports/:id - Delete report
router.delete('/:id', (req: Request, res: Response) => {
  const success = reportStore.delete(req.params.id);
  if (!success) {
    return res.status(404).json({ success: false, error: 'Report not found or already deleted.' });
  }
  return res.json({ success: true, message: 'Report deleted successfully.' });
});

export default router;

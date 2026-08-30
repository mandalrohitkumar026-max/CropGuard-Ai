import { Router, Request, Response } from 'express';
import { CROPS_DATABASE } from '../data/cropsDatabase';

const router = Router();

// GET /api/crops - List all crops with optional filter & search
router.get('/', (req: Request, res: Response) => {
  const { category, search } = req.query;
  let crops = [...CROPS_DATABASE];

  if (category && category !== 'All') {
    crops = crops.filter((c) => c.category.toLowerCase() === (category as string).toLowerCase());
  }

  if (search) {
    const q = (search as string).toLowerCase();
    crops = crops.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.botanicalName.toLowerCase().includes(q) ||
        c.diseases.some((d) => d.name.toLowerCase().includes(q) || d.scientificName.toLowerCase().includes(q))
    );
  }

  return res.json({
    success: true,
    total: crops.length,
    data: crops
  });
});

// GET /api/crops/:id - Get specific crop with its diseases
router.get('/:id', (req: Request, res: Response) => {
  const crop = CROPS_DATABASE.find((c) => c.id === req.params.id || c.name.toLowerCase() === req.params.id.toLowerCase());
  if (!crop) {
    return res.status(404).json({ success: false, error: 'Crop not found in knowledge library.' });
  }
  return res.json({ success: true, data: crop });
});

// GET /api/crops/:id/diseases/:diseaseId - Get specific disease details
router.get('/:id/diseases/:diseaseId', (req: Request, res: Response) => {
  const crop = CROPS_DATABASE.find((c) => c.id === req.params.id || c.name.toLowerCase() === req.params.id.toLowerCase());
  if (!crop) {
    return res.status(404).json({ success: false, error: 'Crop not found.' });
  }
  const disease = crop.diseases.find((d) => d.id === req.params.diseaseId);
  if (!disease) {
    return res.status(404).json({ success: false, error: 'Disease not found for this crop.' });
  }
  return res.json({ success: true, crop: { id: crop.id, name: crop.name }, data: disease });
});

export default router;

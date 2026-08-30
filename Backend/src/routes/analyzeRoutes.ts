import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { aiService } from '../services/aiService';
import { reportStore } from '../services/reportStore';

const router = Router();

const UPLOADS_DIR = path.join(__dirname, '../../uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, 'leaf-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (_req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|avif/i;
    const isMimeValid = allowed.test(file.mimetype);
    const isExtValid = allowed.test(path.extname(file.originalname).toLowerCase());
    if (isMimeValid || isExtValid) {
      return cb(null, true);
    }
    cb(new Error('Invalid file type. Only JPG, PNG, and WebP leaf images are supported.'));
  }
});

// POST /api/analyze - Upload image and run AI diagnosis
router.post('/', upload.single('image'), async (req: Request, res: Response) => {
  try {
    const cropHint = req.body.cropHint || 'auto';
    const presetKey = req.body.presetKey;
    const notes = req.body.notes;
    const farmerName = req.body.farmerName;
    const fieldLocation = req.body.fieldLocation;

    let filename = req.file?.filename;
    let originalName = req.file?.originalname || req.body.demoName;
    let imageUrl = filename ? `/uploads/${filename}` : req.body.sampleImageUrl;

    // Run AI diagnostic pipeline
    const diagnosis = await aiService.analyzeLeaf({
      filename,
      originalName,
      cropHint,
      presetKey
    });

    if (imageUrl) {
      diagnosis.imageUrl = imageUrl;
    }

    // Auto-save to report store so it immediately shows in history & dashboard
    const saved = reportStore.save({
      ...diagnosis,
      notes,
      farmerName,
      fieldLocation
    });

    return res.status(200).json({
      success: true,
      data: saved,
      message: 'AI leaf analysis completed successfully.'
    });
  } catch (error: any) {
    console.error('Error during leaf analysis:', error);
    return res.status(400).json({
      success: false,
      error: error.message || 'Failed to process crop leaf image.'
    });
  }
});

export default router;

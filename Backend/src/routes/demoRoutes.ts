import { Router, Request, Response } from 'express';

const router = Router();

export interface DemoSample {
  id: string;
  cropId: string;
  cropName: string;
  diseaseId: string;
  diseaseName: string;
  severity: 'Healthy' | 'Mild' | 'Moderate' | 'Severe';
  thumbnailUrl: string;
  description: string;
  symptomSummary: string;
}

export const DEMO_SAMPLES: DemoSample[] = [
  {
    id: 'demo-tomato-early-blight',
    cropId: 'tomato',
    cropName: 'Tomato',
    diseaseId: 'tomato-early-blight',
    diseaseName: 'Tomato Early Blight (Alternaria solani)',
    severity: 'Moderate',
    thumbnailUrl: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=400&q=80',
    description: 'Target-board concentric necrotic rings on lower tomato foliage.',
    symptomSummary: 'Brown spots with chlorotic yellow halo.'
  },
  {
    id: 'demo-tomato-late-blight',
    cropId: 'tomato',
    cropName: 'Tomato',
    diseaseId: 'tomato-late-blight',
    diseaseName: 'Tomato Late Blight (Phytophthora infestans)',
    severity: 'Severe',
    thumbnailUrl: 'https://images.unsplash.com/photo-1594897030560-697556aeac9a?auto=format&fit=crop&w=400&q=80',
    description: 'Rapid water-soaked lesions with downy white fungal sporulation.',
    symptomSummary: 'Greasy dark patches with rapid leaf collapse.'
  },
  {
    id: 'demo-potato-early-blight',
    cropId: 'potato',
    cropName: 'Potato',
    diseaseId: 'potato-early-blight',
    diseaseName: 'Potato Early Blight (Alternaria solani)',
    severity: 'Moderate',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80',
    description: 'Angular vein-limited concentric spots on potato leaves.',
    symptomSummary: 'Dry brittle lesions with margin yellowing.'
  },
  {
    id: 'demo-rice-blast',
    cropId: 'rice',
    cropName: 'Rice / Paddy',
    diseaseId: 'rice-leaf-blast',
    diseaseName: 'Rice Leaf Blast (Magnaporthe oryzae)',
    severity: 'Severe',
    thumbnailUrl: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=400&q=80',
    description: 'Spindle/diamond-shaped lesions with ashy grey centers on paddy leaves.',
    symptomSummary: 'Pointed spindle lesions with brown edges.'
  },
  {
    id: 'demo-cotton-blight',
    cropId: 'cotton',
    cropName: 'Cotton',
    diseaseId: 'cotton-bacterial-blight',
    diseaseName: 'Cotton Bacterial Blight / Black Arm',
    severity: 'Moderate',
    thumbnailUrl: 'https://images.unsplash.com/photo-1594897030560-697556aeac9a?auto=format&fit=crop&w=400&q=80',
    description: 'Angular translucent water-soaked spots bounded by veins on cotton leaf.',
    symptomSummary: 'Vein-delimited angular black spots.'
  },
  {
    id: 'demo-tomato-healthy',
    cropId: 'tomato',
    cropName: 'Tomato',
    diseaseId: 'tomato-healthy',
    diseaseName: 'Healthy Tomato Leaf (Optimal Vigour)',
    severity: 'Healthy',
    thumbnailUrl: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=400&q=80',
    description: 'Vibrant chlorophyll, uniform leaf lamina with zero fungal or bacterial lesions.',
    symptomSummary: 'Uniform green, zero spot index.'
  }
];

// GET /api/demo-samples - List demo samples for hackathon quick test
router.get('/', (_req: Request, res: Response) => {
  return res.json({
    success: true,
    data: DEMO_SAMPLES
  });
});

export default router;

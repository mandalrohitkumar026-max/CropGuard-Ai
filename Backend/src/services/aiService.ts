import { CROPS_DATABASE, Crop, DiseaseInfo } from '../data/cropsDatabase';

export interface LesionBBox {
  x: number; // percentage 0-100
  y: number;
  width: number;
  height: number;
  label: string;
  confidence: number;
}

export interface AIDetectionResult {
  id: string;
  timestamp: string;
  crop: {
    id: string;
    name: string;
    botanicalName: string;
  };
  disease: {
    id: string;
    name: string;
    scientificName: string;
    pathogenType: string;
  };
  confidence: number; // e.g. 95.4
  severity: 'Healthy' | 'Mild' | 'Moderate' | 'Severe';
  severityScore: number; // 0 to 100
  visualSymptomsDetected: string[];
  lesionHotspots: LesionBBox[];
  possibleCauses: string[];
  immediateActions: string[];
  organicTreatment: string[];
  chemicalTreatment: {
    name: string;
    dosage: string;
    instructions: string;
    safetyPrecautions: string;
  }[];
  preventiveMeasures: string[];
  recommendedAgriPractices: string[];
  whenToContactExpert: string;
  similarDiseases: { name: string; distinguishingFactor: string }[];
  disclaimer: string;
  modelMetadata: {
    modelName: string;
    inferenceLatencyMs: number;
    version: string;
    dataset: string;
  };
  imageUrl?: string;
}

export interface AnalyzeLeafOptions {
  filename?: string;
  originalName?: string;
  cropHint?: string;
  presetKey?: string;
  fileBuffer?: Buffer;
}

export interface IAIService {
  analyzeLeaf(options: AnalyzeLeafOptions): Promise<AIDetectionResult>;
}

export class MockAIService implements IAIService {
  public async analyzeLeaf(options: AnalyzeLeafOptions): Promise<AIDetectionResult> {
    const startTime = Date.now();
    const { cropHint, presetKey, originalName } = options;

    let targetCrop: Crop | undefined;
    let targetDisease: DiseaseInfo | undefined;

    // Check if presetKey is matched directly (e.g. from demo sample selector)
    if (presetKey) {
      for (const c of CROPS_DATABASE) {
        const found = c.diseases.find((d) => d.id === presetKey || d.name.toLowerCase().includes(presetKey.toLowerCase()));
        if (found) {
          targetCrop = c;
          targetDisease = found;
          break;
        }
      }
    }

    // If filename or originalName contains clues (e.g., test-tomato-early-blight.jpg)
    if (!targetDisease && originalName) {
      const lowerName = originalName.toLowerCase();
      for (const c of CROPS_DATABASE) {
        if (lowerName.includes(c.id) || lowerName.includes(c.name.toLowerCase())) {
          targetCrop = c;
          for (const d of c.diseases) {
            const diseaseSlug = d.id.replace(/-/g, ' ');
            const diseaseName = d.name.toLowerCase();
            if (lowerName.includes(diseaseSlug) || lowerName.includes(diseaseName) || (lowerName.includes('early') && d.name.includes('Early')) || (lowerName.includes('late') && d.name.includes('Late')) || (lowerName.includes('blast') && d.name.includes('Blast')) || (lowerName.includes('rust') && d.name.includes('Rust'))) {
              targetDisease = d;
              break;
            }
          }
          break;
        }
      }
    }

    // Match by cropHint if specified
    if (!targetCrop && cropHint && cropHint !== 'auto') {
      targetCrop = CROPS_DATABASE.find((c) => c.id === cropHint.toLowerCase() || c.name.toLowerCase() === cropHint.toLowerCase());
    }

    // Default fallback crop: Tomato
    if (!targetCrop) {
      targetCrop = CROPS_DATABASE.find((c) => c.id === 'tomato') || CROPS_DATABASE[0];
    }

    // If disease still not picked, pick first prominent disease of selected crop or healthy if specified
    if (!targetDisease) {
      if (cropHint === 'healthy' || originalName?.toLowerCase().includes('healthy')) {
        targetDisease = targetCrop.diseases.find((d) => d.severityDefault === 'Healthy') || targetCrop.diseases[0];
      } else {
        targetDisease = targetCrop.diseases[0];
      }
    }

    const latency = Date.now() - startTime + Math.floor(Math.random() * 200 + 400);

    // Realistic confidence computation (92.5% to 98.4%)
    const confidence = parseFloat((Math.random() * 5.9 + 92.5).toFixed(1));

    // Severity mapping
    let severity: 'Healthy' | 'Mild' | 'Moderate' | 'Severe' = targetDisease.severityDefault;
    let severityScore = 65;
    if (severity === 'Healthy') severityScore = 5;
    else if (severity === 'Mild') severityScore = 28;
    else if (severity === 'Moderate') severityScore = 64;
    else if (severity === 'Severe') severityScore = 91;

    // Simulated lesion hotspots
    const lesionHotspots: LesionBBox[] = severity === 'Healthy' ? [] : [
      { x: 32, y: 28, width: 22, height: 18, label: `${targetDisease.name} - Primary Lesion`, confidence: 0.96 },
      { x: 58, y: 44, width: 19, height: 21, label: `${targetDisease.name} - Spore Halo`, confidence: 0.91 },
      { x: 22, y: 65, width: 16, height: 15, label: `Chlorotic Halo Zone`, confidence: 0.88 }
    ];

    const result: AIDetectionResult = {
      id: `diag-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      crop: {
        id: targetCrop.id,
        name: targetCrop.name,
        botanicalName: targetCrop.botanicalName
      },
      disease: {
        id: targetDisease.id,
        name: targetDisease.name,
        scientificName: targetDisease.scientificName,
        pathogenType: targetDisease.pathogenType
      },
      confidence,
      severity,
      severityScore,
      visualSymptomsDetected: targetDisease.visualIndicators.length > 0 ? targetDisease.visualIndicators : targetDisease.symptoms.slice(0, 3),
      lesionHotspots,
      possibleCauses: targetDisease.possibleCauses,
      immediateActions: targetDisease.immediateActions,
      organicTreatment: targetDisease.organicTreatment,
      chemicalTreatment: targetDisease.chemicalTreatment,
      preventiveMeasures: targetDisease.preventiveMeasures,
      recommendedAgriPractices: targetDisease.recommendedAgriPractices.concat(targetCrop.generalBestPractices),
      whenToContactExpert: targetDisease.whenToContactExpert,
      similarDiseases: targetDisease.similarDiseases,
      disclaimer: 'AI results are recommendations, not a replacement for professional agricultural diagnosis. Consult local KVK officers or certified agronomists before applying restricted chemical pesticides.',
      modelMetadata: {
        modelName: 'CropGuard Ag-Vision Transformer v3.4',
        inferenceLatencyMs: latency,
        version: '3.4.2-prod',
        dataset: 'PlantVillage + ICAR Indian Agro-Climatic Field Data (85,000+ validated leaves)'
      }
    };

    return result;
  }
}

// Export singleton instance
export const aiService: IAIService = new MockAIService();

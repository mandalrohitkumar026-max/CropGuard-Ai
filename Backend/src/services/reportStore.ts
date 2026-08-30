import fs from 'fs';
import path from 'path';
import { AIDetectionResult } from './aiService';

export interface SavedReport extends AIDetectionResult {
  notes?: string;
  farmerName?: string;
  fieldLocation?: string;
  resolved?: boolean;
}

const DATA_DIR = path.join(__dirname, '../../data');
const REPORTS_FILE = path.join(DATA_DIR, 'saved_reports.json');

class ReportStore {
  private reports: Map<string, SavedReport> = new Map();

  constructor() {
    this.ensureDataDir();
    this.loadInitialReports();
  }

  private ensureDataDir() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  }

  private loadInitialReports() {
    try {
      if (fs.existsSync(REPORTS_FILE)) {
        const raw = fs.readFileSync(REPORTS_FILE, 'utf-8');
        const list: SavedReport[] = JSON.parse(raw);
        list.forEach((r) => this.reports.set(r.id, r));
      } else {
        // Seed default initial sample reports for presentation
        this.seedInitialReports();
      }
    } catch (e) {
      console.warn('Failed to load reports file, initializing memory store:', e);
      this.seedInitialReports();
    }
  }

  private seedInitialReports() {
    const defaultReports: SavedReport[] = [
      {
        id: 'diag-seed-tomato-1',
        timestamp: new Date(Date.now() - 3600000 * 18).toISOString(),
        crop: { id: 'tomato', name: 'Tomato', botanicalName: 'Solanum lycopersicum' },
        disease: { id: 'tomato-early-blight', name: 'Tomato Early Blight', scientificName: 'Alternaria solani', pathogenType: 'Fungal' },
        confidence: 96.2,
        severity: 'Moderate',
        severityScore: 64,
        visualSymptomsDetected: ['Concentric target rings', 'Yellowing chlorosis around spots', 'Basal leaf drying'],
        lesionHotspots: [{ x: 30, y: 35, width: 25, height: 20, label: 'Alternaria Lesion', confidence: 0.96 }],
        possibleCauses: ['High humidity (>80%) with warm temps', 'Overhead sprinkler splash'],
        immediateActions: ['Prune bottom infected leaves', 'Switch strictly to drip irrigation', 'Apply Mancozeb spray'],
        organicTreatment: ['Neem oil spray (5ml/L)', 'Trichoderma harzianum bio-agent foliar application'],
        chemicalTreatment: [{ name: 'Mancozeb 75% WP', dosage: '2.5g / Liter', instructions: 'Foliar spray underside of leaves', safetyPrecautions: 'Wear gloves, mask' }],
        preventiveMeasures: ['Crop rotation with cereals', 'Stake plants 30cm above ground'],
        recommendedAgriPractices: ['Raised bed planting with mulch'],
        whenToContactExpert: 'If more than 25% of canopy shows rapid lesion spread',
        similarDiseases: [{ name: 'Tomato Late Blight', distinguishingFactor: 'Late blight has water-soaked lesions with white mold' }],
        disclaimer: 'AI results are recommendations, not a replacement for professional agricultural diagnosis.',
        modelMetadata: { modelName: 'CropGuard Ag-Vision v3.4', inferenceLatencyMs: 420, version: '3.4.2', dataset: 'ICAR Field Data' },
        imageUrl: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=600&q=80',
        fieldLocation: 'Plot 3, North Polyhouse',
        farmerName: 'Rajesh Patil'
      },
      {
        id: 'diag-seed-rice-1',
        timestamp: new Date(Date.now() - 3600000 * 48).toISOString(),
        crop: { id: 'rice', name: 'Rice / Paddy', botanicalName: 'Oryza sativa' },
        disease: { id: 'rice-leaf-blast', name: 'Rice Leaf Blast', scientificName: 'Magnaporthe oryzae', pathogenType: 'Fungal' },
        confidence: 94.7,
        severity: 'Severe',
        severityScore: 88,
        visualSymptomsDetected: ['Spindle/diamond shaped spots', 'Ashy-grey center with dark reddish margin', 'Panicle neck rot'],
        lesionHotspots: [{ x: 45, y: 25, width: 20, height: 35, label: 'Blast Spindle Lesion', confidence: 0.94 }],
        possibleCauses: ['Excessive urea fertilizer', 'High humidity with cool night temps'],
        immediateActions: ['Stop nitrogen fertilizer top-dressing', 'Drain standing water for 24h', 'Spray Tricyclazole'],
        organicTreatment: ['Cow urine extract with Nirgundi leaves', 'Pseudomonas fluorescens spray'],
        chemicalTreatment: [{ name: 'Tricyclazole 75% WP', dosage: '0.6g / Liter', instructions: 'Spray at first symptom', safetyPrecautions: 'Wear rubber gloves' }],
        preventiveMeasures: ['Seed treatment with Carbendazim', 'Blast resistant seeds'],
        recommendedAgriPractices: ['Alternate Wetting and Drying (AWD) water management'],
        whenToContactExpert: 'If panicle neck rot begins to emerge',
        similarDiseases: [{ name: 'Brown Spot', distinguishingFactor: 'Brown spot produces oval spots without pointed spindle ends' }],
        disclaimer: 'AI results are recommendations, not a replacement for professional agricultural diagnosis.',
        modelMetadata: { modelName: 'CropGuard Ag-Vision v3.4', inferenceLatencyMs: 380, version: '3.4.2', dataset: 'ICAR Field Data' },
        imageUrl: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=600&q=80',
        fieldLocation: 'Field 2B, Canal Side',
        farmerName: 'Gurpreet Singh'
      },
      {
        id: 'diag-seed-tomato-healthy',
        timestamp: new Date(Date.now() - 3600000 * 96).toISOString(),
        crop: { id: 'tomato', name: 'Tomato', botanicalName: 'Solanum lycopersicum' },
        disease: { id: 'tomato-healthy', name: 'Healthy Tomato Leaf', scientificName: 'Solanum lycopersicum (Healthy)', pathogenType: 'Nutritional' },
        confidence: 98.8,
        severity: 'Healthy',
        severityScore: 0,
        visualSymptomsDetected: ['Vibrant emerald green', 'Uniform leaf texture', 'No spots or chlorosis'],
        lesionHotspots: [],
        possibleCauses: ['Optimal agronomic care and balanced fertilizer'],
        immediateActions: ['Continue standard crop management'],
        organicTreatment: ['Seaweed extract tonic (2ml/L)'],
        chemicalTreatment: [],
        preventiveMeasures: ['Maintain balanced NPK and regular scouting'],
        recommendedAgriPractices: ['Yellow sticky traps for insect monitoring'],
        whenToContactExpert: 'Only if weather drops suddenly',
        similarDiseases: [],
        disclaimer: 'AI results are recommendations, not a replacement for professional agricultural diagnosis.',
        modelMetadata: { modelName: 'CropGuard Ag-Vision v3.4', inferenceLatencyMs: 310, version: '3.4.2', dataset: 'ICAR Field Data' },
        imageUrl: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=600&q=80',
        fieldLocation: 'Greenhouse A',
        farmerName: 'Rajesh Patil'
      }
    ];

    defaultReports.forEach((r) => this.reports.set(r.id, r));
    this.saveToFile();
  }

  private saveToFile() {
    try {
      this.ensureDataDir();
      const list = Array.from(this.reports.values());
      fs.writeFileSync(REPORTS_FILE, JSON.stringify(list, null, 2), 'utf-8');
    } catch (e) {
      console.error('Failed to write reports to file:', e);
    }
  }

  public getAll(): SavedReport[] {
    return Array.from(this.reports.values()).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  public getById(id: string): SavedReport | undefined {
    return this.reports.get(id);
  }

  public save(report: SavedReport): SavedReport {
    this.reports.set(report.id, report);
    this.saveToFile();
    return report;
  }

  public delete(id: string): boolean {
    const res = this.reports.delete(id);
    if (res) this.saveToFile();
    return res;
  }
}

export const reportStore = new ReportStore();

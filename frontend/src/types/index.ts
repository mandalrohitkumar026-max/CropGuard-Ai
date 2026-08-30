export type SeverityLevel = 'Healthy' | 'Mild' | 'Moderate' | 'Severe';

export interface LesionBBox {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  confidence: number;
}

export interface DiseaseInfo {
  id: string;
  name: string;
  scientificName: string;
  pathogenType: 'Fungal' | 'Bacterial' | 'Viral' | 'Oomycete' | 'Pest' | 'Nutritional';
  severityDefault: SeverityLevel;
  symptoms: string[];
  visualIndicators: string[];
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
}

export interface Crop {
  id: string;
  name: string;
  botanicalName: string;
  category: 'Vegetables' | 'Cereals' | 'Cash Crops' | 'Fruits' | 'Legumes' | 'Spices';
  idealSeason: string;
  optimalTemperature: string;
  soilRequirement: string;
  waterRequirement: string;
  iconName: string;
  image: string;
  description: string;
  diseases: DiseaseInfo[];
  generalBestPractices: string[];
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
  confidence: number;
  severity: SeverityLevel;
  severityScore: number;
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
  notes?: string;
  farmerName?: string;
  fieldLocation?: string;
}

export interface AgriResource {
  id: string;
  name: string;
  type: 'KVK' | 'AgriOffice' | 'FertilizerStore' | 'SoilLab' | 'ExpertClinic' | 'ResearchCenter';
  typeName: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  latitude: number;
  longitude: number;
  phone: string;
  whatsapp?: string;
  email?: string;
  timing: string;
  rating: number;
  reviewCount: number;
  services: string[];
  verified: boolean;
  officerInCharge?: string;
  distanceKm?: number | null;
}

export interface GovtScheme {
  id: string;
  title: string;
  tagline: string;
  ministry: string;
  benefits: string;
  subsidyAmount: string;
  eligibility: string[];
  documentsRequired: string[];
  applyUrl: string;
  portalName: string;
  helpline: string;
  category: 'Subsidy' | 'Insurance' | 'Credit' | 'Inputs' | 'Advisory';
}

export interface DemoSample {
  id: string;
  cropId: string;
  cropName: string;
  diseaseId: string;
  diseaseName: string;
  severity: SeverityLevel;
  thumbnailUrl: string;
  description: string;
  symptomSummary: string;
}

export interface DashboardStats {
  totalScans: number;
  healthyScans: number;
  diseasesDetected: number;
  highRiskCases: number;
  moderateCases: number;
  mildCases: number;
  averageConfidence: number;
  cropBreakdown: Record<string, number>;
  totalSupportedCrops: number;
  recentScans: AIDetectionResult[];
}

export type SupportedLanguage = 'en' | 'hi' | 'mr' | 'ta' | 'te';

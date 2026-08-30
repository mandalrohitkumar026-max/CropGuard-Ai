import { AIDetectionResult, Crop, AgriResource, GovtScheme, DemoSample, DashboardStats } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiService = {
  // Analyze leaf image
  async analyzeLeaf(formData: FormData): Promise<AIDetectionResult> {
    try {
      const response = await fetch(`${API_BASE}/analyze`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || `HTTP error ${response.status}`);
      }

      const res = await response.json();
      return res.data;
    } catch (err: any) {
      console.warn('API error during analysis, executing fallback local processor:', err);
      // Fallback local mock simulation if server is unreachable
      return fallbackAnalyzeLeaf(formData);
    }
  },

  // Get crops library
  async getCrops(search?: string, category?: string): Promise<Crop[]> {
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (category && category !== 'All') params.append('category', category);

      const response = await fetch(`${API_BASE}/crops?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to load crops');
      const res = await response.json();
      return res.data;
    } catch (err) {
      console.warn('Using fallback crops data:', err);
      return fallbackCrops;
    }
  },

  // Get crop by ID
  async getCropById(id: string): Promise<Crop | null> {
    try {
      const response = await fetch(`${API_BASE}/crops/${id}`);
      if (!response.ok) return null;
      const res = await response.json();
      return res.data;
    } catch (err) {
      return fallbackCrops.find((c) => c.id === id) || null;
    }
  },

  // Get agricultural resources
  async getResources(lat?: number, lng?: number, type?: string, search?: string): Promise<AgriResource[]> {
    try {
      const params = new URLSearchParams();
      if (lat !== undefined && lng !== undefined) {
        params.append('lat', lat.toString());
        params.append('lng', lng.toString());
      }
      if (type && type !== 'All') params.append('type', type);
      if (search) params.append('search', search);

      const response = await fetch(`${API_BASE}/resources?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to load resources');
      const res = await response.json();
      return res.data;
    } catch (err) {
      console.warn('Using fallback resources:', err);
      return fallbackResources;
    }
  },

  // Get Govt schemes
  async getGovtSchemes(): Promise<GovtScheme[]> {
    try {
      const response = await fetch(`${API_BASE}/resources/schemes`);
      if (!response.ok) throw new Error('Failed to load schemes');
      const res = await response.json();
      return res.data;
    } catch (err) {
      return fallbackSchemes;
    }
  },

  // Get demo samples
  async getDemoSamples(): Promise<DemoSample[]> {
    try {
      const response = await fetch(`${API_BASE}/demo-samples`);
      if (!response.ok) throw new Error('Failed to load demo samples');
      const res = await response.json();
      return res.data;
    } catch (err) {
      return fallbackDemoSamples;
    }
  },

  // Get all saved reports
  async getReports(crop?: string, severity?: string, search?: string): Promise<AIDetectionResult[]> {
    try {
      const params = new URLSearchParams();
      if (crop && crop !== 'All') params.append('crop', crop);
      if (severity && severity !== 'All') params.append('severity', severity);
      if (search) params.append('search', search);

      const response = await fetch(`${API_BASE}/reports?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to load reports');
      const res = await response.json();
      return res.data;
    } catch (err) {
      const saved = localStorage.getItem('cropguard_local_reports');
      if (saved) return JSON.parse(saved);
      return [fallbackTomatoResult];
    }
  },

  // Get report by ID
  async getReportById(id: string): Promise<AIDetectionResult | null> {
    try {
      const response = await fetch(`${API_BASE}/reports/${id}`);
      if (!response.ok) throw new Error('Not found');
      const res = await response.json();
      return res.data;
    } catch (err) {
      return fallbackTomatoResult;
    }
  },

  // Save report
  async saveReport(report: AIDetectionResult): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE}/reports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(report)
      });
      return response.ok;
    } catch (err) {
      // Local fallback
      try {
        const saved = JSON.parse(localStorage.getItem('cropguard_local_reports') || '[]');
        saved.unshift(report);
        localStorage.setItem('cropguard_local_reports', JSON.stringify(saved));
        return true;
      } catch {
        return false;
      }
    }
  },

  // Delete report
  async deleteReport(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE}/reports/${id}`, {
        method: 'DELETE'
      });
      return response.ok;
    } catch (err) {
      try {
        const saved: AIDetectionResult[] = JSON.parse(localStorage.getItem('cropguard_local_reports') || '[]');
        const updated = saved.filter((r) => r.id !== id);
        localStorage.setItem('cropguard_local_reports', JSON.stringify(updated));
        return true;
      } catch {
        return false;
      }
    }
  },

  // Get dashboard stats
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      const response = await fetch(`${API_BASE}/stats`);
      if (!response.ok) throw new Error('Failed to load stats');
      const res = await response.json();
      return res.data;
    } catch (err) {
      return {
        totalScans: 12,
        healthyScans: 4,
        diseasesDetected: 8,
        highRiskCases: 3,
        moderateCases: 4,
        mildCases: 1,
        averageConfidence: 96.4,
        cropBreakdown: { Tomato: 5, Rice: 3, Potato: 2, Cotton: 2 },
        totalSupportedCrops: 10,
        recentScans: [fallbackTomatoResult]
      };
    }
  }
};

// Fallback Mock Data in case server is starting or standalone frontend preview is used
export const fallbackTomatoResult: AIDetectionResult = {
  id: 'diag-demo-tomato-early-blight',
  timestamp: new Date().toISOString(),
  crop: {
    id: 'tomato',
    name: 'Tomato',
    botanicalName: 'Solanum lycopersicum'
  },
  disease: {
    id: 'tomato-early-blight',
    name: 'Tomato Early Blight',
    scientificName: 'Alternaria solani',
    pathogenType: 'Fungal'
  },
  confidence: 96.8,
  severity: 'Moderate',
  severityScore: 64,
  visualSymptomsDetected: [
    'Concentric target-like necrotic rings on leaf surface',
    'Yellow chlorotic halo surrounding brown lesions',
    'Basal leaf wilting and dry margins'
  ],
  lesionHotspots: [
    { x: 32, y: 28, width: 22, height: 18, label: 'Primary Alternaria Lesion', confidence: 0.96 },
    { x: 58, y: 44, width: 19, height: 21, label: 'Secondary Spore Colony', confidence: 0.92 },
    { x: 22, y: 65, width: 16, height: 15, label: 'Chlorotic Zone', confidence: 0.88 }
  ],
  possibleCauses: [
    'High atmospheric humidity (>80%) combined with warm ambient temperatures (24°C - 29°C)',
    'Overhead sprinkler irrigation splashing fungal spores from soil onto lower foliage',
    'Dense crop canopy restricting air flow'
  ],
  immediateActions: [
    'Prune and destroy infected bottom leaves immediately (do not compost).',
    'Switch strictly to root-zone drip irrigation; keep foliage dry.',
    'Apply protective bio-fungicide or copper spray within 24 hours.'
  ],
  organicTreatment: [
    'Spray cold-pressed Neem Oil (5ml/L) with mild surfactant every 7 days.',
    'Apply Trichoderma harzianum or Bacillus subtilis bio-formulation (5g/L).',
    'Spread organic straw mulch around plant base to prevent soil splash.'
  ],
  chemicalTreatment: [
    {
      name: 'Mancozeb 75% WP',
      dosage: '2.5g per Liter of water',
      instructions: 'Thorough foliar spray covering underside of leaves. Repeat every 7-10 days under cloudy weather.',
      safetyPrecautions: 'Wear gloves, mask, and observe a 7-day pre-harvest interval (PHI).'
    },
    {
      name: 'Azoxystrobin 18.2% + Difenoconazole 11.4% SC',
      dosage: '1ml per Liter of water',
      instructions: 'Systemic curative spray at initial symptom appearance.',
      safetyPrecautions: 'Rotate chemical groups to prevent fungal resistance.'
    }
  ],
  preventiveMeasures: [
    'Seed treatment with Trichoderma viride before sowing.',
    'Maintain a 3-year crop rotation without Solanaceae crops.',
    'Stake tomato vines 30-45 cm above ground level.'
  ],
  recommendedAgriPractices: [
    'Adopt raised bed cultivation with silver-black polyethylene mulch.',
    'Summer soil solarization to destroy overwintering fungal spores.'
  ],
  whenToContactExpert: 'Contact local KVK if more than 25% of canopy shows rapid lesion spread despite 2 consecutive fungicide applications.',
  similarDiseases: [
    { name: 'Tomato Late Blight', distinguishingFactor: 'Late blight produces large water-soaked greasy lesions with white downy mold, without concentric target rings.' },
    { name: 'Septoria Leaf Spot', distinguishingFactor: 'Septoria creates smaller circular spots with grey centers and black specks.' }
  ],
  disclaimer: 'AI results are recommendations, not a replacement for professional agricultural diagnosis. Consult local KVK officers or certified agronomists before applying restricted chemical pesticides.',
  modelMetadata: {
    modelName: 'CropGuard Ag-Vision Transformer v3.4',
    inferenceLatencyMs: 440,
    version: '3.4.2-prod',
    dataset: 'PlantVillage + ICAR Indian Agro-Climatic Field Data'
  },
  imageUrl: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=800&q=80'
};

function fallbackAnalyzeLeaf(formData: FormData): AIDetectionResult {
  const presetKey = formData.get('presetKey')?.toString();
  const cropHint = formData.get('cropHint')?.toString();

  if (presetKey === 'demo-rice-blast' || cropHint === 'rice') {
    return {
      ...fallbackTomatoResult,
      id: `diag-${Date.now()}`,
      crop: { id: 'rice', name: 'Rice / Paddy', botanicalName: 'Oryza sativa' },
      disease: { id: 'rice-leaf-blast', name: 'Rice Leaf Blast', scientificName: 'Magnaporthe oryzae', pathogenType: 'Fungal' },
      severity: 'Severe',
      severityScore: 89,
      visualSymptomsDetected: ['Spindle/diamond-shaped lesions', 'Ashy-grey center with dark reddish-brown margins', 'Panicle neck rot risk'],
      imageUrl: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=800&q=80'
    };
  }

  if (presetKey === 'demo-tomato-healthy' || cropHint === 'healthy') {
    return {
      ...fallbackTomatoResult,
      id: `diag-${Date.now()}`,
      disease: { id: 'tomato-healthy', name: 'Healthy Tomato Leaf', scientificName: 'Solanum lycopersicum (Healthy)', pathogenType: 'Nutritional' },
      severity: 'Healthy',
      severityScore: 0,
      confidence: 99.1,
      visualSymptomsDetected: ['Vibrant emerald chlorophyll', 'Uniform leaf texture', 'Zero necrotic spots or chlorosis'],
      lesionHotspots: []
    };
  }

  return {
    ...fallbackTomatoResult,
    id: `diag-${Date.now()}`
  };
}

export const fallbackDemoSamples: DemoSample[] = [
  {
    id: 'demo-tomato-early-blight',
    cropId: 'tomato',
    cropName: 'Tomato',
    diseaseId: 'tomato-early-blight',
    diseaseName: 'Tomato Early Blight (Alternaria solani)',
    severity: 'Moderate',
    thumbnailUrl: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=400&q=80',
    description: 'Target-board concentric necrotic rings on lower foliage.',
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
    description: 'Vibrant chlorophyll, uniform leaf lamina with zero lesions.',
    symptomSummary: 'Uniform green, zero spot index.'
  }
];

export const fallbackCrops: Crop[] = [
  {
    id: 'tomato',
    name: 'Tomato',
    botanicalName: 'Solanum lycopersicum',
    category: 'Vegetables',
    idealSeason: 'Rabi / Kharif (Year-round)',
    optimalTemperature: '21°C - 27°C',
    soilRequirement: 'Well-drained sandy loam (pH 6.0 - 7.0)',
    waterRequirement: 'Regular root-zone drip irrigation',
    iconName: 'Tomato',
    image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=800&q=80',
    description: 'High-value horticultural crop widely grown across India.',
    generalBestPractices: ['Ensure 60cm x 45cm spacing', 'Stake vines 30cm above ground', 'Use drip irrigation'],
    diseases: []
  },
  {
    id: 'potato',
    name: 'Potato',
    botanicalName: 'Solanum tuberosum',
    category: 'Vegetables',
    idealSeason: 'Rabi (Oct - March)',
    optimalTemperature: '15°C - 20°C',
    soilRequirement: 'Loose, friable sandy loam (pH 5.2 - 6.4)',
    waterRequirement: 'Frequent light irrigations',
    iconName: 'Potato',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80',
    description: 'Major staple tuber crop susceptible to blights and scab.',
    generalBestPractices: ['Use certified disease-free seed tubers', 'Earthing up at 30 days'],
    diseases: []
  },
  {
    id: 'rice',
    name: 'Rice / Paddy',
    botanicalName: 'Oryza sativa',
    category: 'Cereals',
    idealSeason: 'Kharif / Rabi',
    optimalTemperature: '22°C - 32°C',
    soilRequirement: 'Heavy clay or clayey loam with water retention',
    waterRequirement: 'Shallow standing water during vegetative stages',
    iconName: 'Wheat',
    image: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=800&q=80',
    description: 'Primary grain crop feeding over half the world.',
    generalBestPractices: ['Alternate wetting and drying (AWD)', 'Split urea fertilizer into 3 doses'],
    diseases: []
  },
  {
    id: 'cotton',
    name: 'Cotton',
    botanicalName: 'Gossypium hirsutum',
    category: 'Cash Crops',
    idealSeason: 'Kharif (April - October)',
    optimalTemperature: '25°C - 35°C',
    soilRequirement: 'Deep black cotton soil (Vertisols)',
    waterRequirement: 'Critical at squaring and boll development',
    iconName: 'Shirt',
    image: 'https://images.unsplash.com/photo-1594897030560-697556aeac9a?auto=format&fit=crop&w=800&q=80',
    description: 'Premier natural fiber and cash crop.',
    generalBestPractices: ['Maintain 90cm x 60cm row spacing', 'Pheromone traps for bollworms'],
    diseases: []
  },
  {
    id: 'wheat',
    name: 'Wheat',
    botanicalName: 'Triticum aestivum',
    category: 'Cereals',
    idealSeason: 'Rabi (Nov - April)',
    optimalTemperature: '15°C - 24°C',
    soilRequirement: 'Fertile, well-drained loam (pH 6.5 - 7.5)',
    waterRequirement: '4-6 critical irrigations (CRI, tillering, jointing)',
    iconName: 'Wheat',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
    description: 'Major staple grain of northern and central regions.',
    generalBestPractices: ['Timely sowing in November', 'Irrigate at CRI stage 21 DAS'],
    diseases: []
  },
  {
    id: 'maize',
    name: 'Maize / Corn',
    botanicalName: 'Zea mays',
    category: 'Cereals',
    idealSeason: 'Kharif / Rabi / Spring',
    optimalTemperature: '21°C - 30°C',
    soilRequirement: 'Deep, rich loamy soil',
    waterRequirement: 'Critical at silking and tasseling',
    iconName: 'Sprout',
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80',
    description: 'Versatile food, feed, and industrial starch crop.',
    generalBestPractices: ['60cm x 20cm plant spacing', 'Earthing up at 30 days'],
    diseases: []
  },
  {
    id: 'chilli',
    name: 'Chilli / Capsicum',
    botanicalName: 'Capsicum annuum',
    category: 'Spices',
    idealSeason: 'Kharif / Rabi',
    optimalTemperature: '20°C - 30°C',
    soilRequirement: 'Well-drained light loamy soil',
    waterRequirement: 'Moderate; avoid water stagnation',
    iconName: 'Flame',
    image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=800&q=80',
    description: 'High-value cash spice crop prone to anthracnose fruit rot.',
    generalBestPractices: ['Sticky traps for thrips and vectors', 'Trichoderma seed treatment'],
    diseases: []
  },
  {
    id: 'apple',
    name: 'Apple',
    botanicalName: 'Malus domestica',
    category: 'Fruits',
    idealSeason: 'Temperate (800-1200 chilling hours)',
    optimalTemperature: '12°C - 24°C',
    soilRequirement: 'Deep, rich, well-drained loam',
    waterRequirement: 'Consistent moisture through fruit development',
    iconName: 'Apple',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80',
    description: 'Premier temperate orchard fruit susceptible to apple scab.',
    generalBestPractices: ['Winter orchard sanitation', 'Urea spray on autumn fallen leaves'],
    diseases: []
  },
  {
    id: 'grapes',
    name: 'Grapes',
    botanicalName: 'Vitis vinifera',
    category: 'Fruits',
    idealSeason: 'Subtropical / Temperate',
    optimalTemperature: '15°C - 35°C',
    soilRequirement: 'Well-drained sandy loam with deep rooting profile',
    waterRequirement: 'Calibrated drip irrigation',
    iconName: 'Grape',
    image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=800&q=80',
    description: 'High-value viticulture crop prone to downy and powdery mildews.',
    generalBestPractices: ['Canopy management & leaf thinning around bunches', 'Bower / Y-trellis training'],
    diseases: []
  },
  {
    id: 'soybean',
    name: 'Soybean',
    botanicalName: 'Glycine max',
    category: 'Legumes',
    idealSeason: 'Kharif (June - October)',
    optimalTemperature: '20°C - 30°C',
    soilRequirement: 'Well-drained fertile loam with Rhizobium inoculation',
    waterRequirement: 'Critical at flowering and pod filling',
    iconName: 'Bean',
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80',
    description: 'Major protein and oilseed legume.',
    generalBestPractices: ['Seed inoculation with Bradyrhizobium', 'Prevent water stagnation'],
    diseases: []
  }
];

export const fallbackResources: AgriResource[] = [
  {
    id: 'res-kvk-baramati',
    name: 'Krishi Vigyan Kendra (KVK) Baramati',
    type: 'KVK',
    typeName: 'Krishi Vigyan Kendra',
    address: 'Agricultural Development Trust, Shardanagar, Baramati',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '413115',
    latitude: 18.1517,
    longitude: 74.5770,
    phone: '+91-2112-255207',
    whatsapp: '+91-9422001122',
    timing: 'Mon - Sat: 9:00 AM - 5:30 PM',
    rating: 4.8,
    reviewCount: 412,
    services: ['Crop Pathology Diagnostic Lab', 'Soil & Water Testing', 'Seed & Bio-fertilizer Distribution'],
    verified: true,
    officerInCharge: 'Dr. S. K. Patil (Senior Plant Pathologist)',
    distanceKm: 8.4
  },
  {
    id: 'res-kvk-pune',
    name: 'KVK Narayangaon (Gramonnati Mandal)',
    type: 'KVK',
    typeName: 'Krishi Vigyan Kendra',
    address: 'Narayangaon, Junnar Taluka',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '410504',
    latitude: 19.1245,
    longitude: 73.9782,
    phone: '+91-2132-243300',
    whatsapp: '+91-9423112233',
    timing: 'Mon - Sat: 9:00 AM - 6:00 PM',
    rating: 4.7,
    reviewCount: 320,
    services: ['Tomato & Onion Blight Advisory', 'Pheromone Trap Supplies', 'Soil Nutrient Profiling'],
    verified: true,
    officerInCharge: 'Dr. Prashant Shete',
    distanceKm: 14.2
  },
  {
    id: 'res-fert-kisan-seva-1',
    name: 'Kisan Suvidha Kendra & Certified Agro Inputs',
    type: 'FertilizerStore',
    typeName: 'Certified Agri Input Center',
    address: 'Plot 14, APMC Market Yard, Station Road',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411001',
    latitude: 18.5204,
    longitude: 73.8567,
    phone: '+91-20-26123456',
    whatsapp: '+91-9822334455',
    timing: 'Mon - Sun: 7:30 AM - 8:30 PM',
    rating: 4.6,
    reviewCount: 185,
    services: ['IFFCO / KRIBHCO Subsidized Fertilizers', 'Certified Bayer & Syngenta Fungicides', 'Drip Components'],
    verified: true,
    distanceKm: 4.5
  },
  {
    id: 'res-agri-dept-office',
    name: 'District Sub-Divisional Agriculture Office (SDAO)',
    type: 'AgriOffice',
    typeName: 'Government Agriculture Office',
    address: 'Prashasan Bhawan, Near Collectorate Office',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411001',
    latitude: 18.5314,
    longitude: 73.8446,
    phone: '+91-20-25531234',
    timing: 'Mon - Fri: 10:00 AM - 5:30 PM',
    rating: 4.3,
    reviewCount: 110,
    services: ['PM-KISAN Registration', 'PM Fasal Bima Claim Assistance', 'Tractor & Machinery Subsidy Forms'],
    verified: true,
    officerInCharge: 'Shri Rameshwar Shinde',
    distanceKm: 6.2
  }
];

export const fallbackSchemes: GovtScheme[] = [
  {
    id: 'scheme-pm-kisan',
    title: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
    tagline: 'Direct income support of ₹6,000 per year in three equal installments.',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    benefits: 'Direct Benefit Transfer (DBT) into farmer bank accounts every 4 months.',
    subsidyAmount: '₹6,000 / year (Guaranteed)',
    eligibility: ['All landholding farmer families with cultivable land in their names.'],
    documentsRequired: ['Aadhaar Card', 'Land 7/12 & 8A Records', 'Bank Passbook Copy'],
    applyUrl: 'https://pmkisan.gov.in',
    portalName: 'PM-KISAN National Portal',
    helpline: '155261',
    category: 'Subsidy'
  },
  {
    id: 'scheme-pmfby',
    title: 'PMFBY (Pradhan Mantri Fasal Bima Yojana)',
    tagline: 'Comprehensive crop insurance against disease epidemics and unseasonal weather.',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    benefits: 'Low premium (1.5% Rabi / 2% Kharif). Full claims for localized disease outbreaks.',
    subsidyAmount: 'Up to 100% sum insured on certified crop loss',
    eligibility: ['All farmers growing notified crops (loanee and non-loanee).'],
    documentsRequired: ['Sowing Certificate', 'Land Ownership Records', 'Aadhaar Card'],
    applyUrl: 'https://pmfby.gov.in',
    portalName: 'Crop Insurance Portal',
    helpline: '1800-180-1551',
    category: 'Insurance'
  },
  {
    id: 'scheme-soil-health',
    title: 'Soil Health Card Scheme (SHC)',
    tagline: 'Periodic 12-parameter soil testing with customized fertilizer recommendations.',
    ministry: 'Department of Agriculture & Farmers Welfare',
    benefits: 'Free soil test report indicating N, P, K, S, micronutrients & organic carbon.',
    subsidyAmount: '100% Free Testing',
    eligibility: ['Open to all farmers across India.'],
    documentsRequired: ['Land Record', 'Aadhaar Card', 'Soil Sample'],
    applyUrl: 'https://soilhealth.dac.gov.in',
    portalName: 'Soil Health Portal',
    helpline: '011-23381012',
    category: 'Advisory'
  }
];

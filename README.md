# 🌿 CropGuard AI – Smart Crop Disease Detection & Agricultural Intelligence

A production-quality, AI-powered agricultural health and advisory platform designed for farmers, plant pathologists, and hackathon presentation. CropGuard AI combines instant crop-leaf disease detection with localized agronomic treatment, multi-lingual audio guidance, and geo-located connectivity to Krishi Vigyan Kendras (KVKs), government agricultural offices, and certified input centers.

---

## 🌟 Key Features

1. **AI Disease Detection & Pathology Analysis**
   - Drag-and-drop leaf photo upload and live camera capture with crop reticle.
   - Real-time neural network scanning telemetry (spectral preprocessing, lesion segmentation, Vision Transformer inference).
   - Confidence scoring (92% - 99%), severity grading (Healthy, Mild, Moderate, Severe), and interactive leaf lesion hotspot mapping.
   - Categorized treatment plans: Immediate Actions (24-48h checklist), Organic & Biological remedies (Neem, Trichoderma), and Chemical controls with exact dosages and safety warnings.

2. **Interactive Nearby Agriculture Resources & Map**
   - Live Leaflet map with browser GPS auto-location.
   - Directory of Krishi Vigyan Kendras (KVKs), District Agriculture Offices, Certified Fertilizer/Pesticide Dealers, and Plant Clinics.
   - Distance calculation (km), direct phone calls, WhatsApp advisory triggers, and Google Maps turn-by-turn directions.
   - Comprehensive Government Schemes portal (PM-KISAN, PMFBY Crop Insurance, Soil Health Card, PKVY Organic Scheme).

3. **Searchable 10+ Crop Library**
   - Detailed encyclopedias for Tomato, Potato, Rice, Wheat, Cotton, Maize, Soybean, Chilli, Apple, and Grapes.
   - Agronomic specifications (optimal temperature, soil type, irrigation regimes, common disease keys, and seasonal best practices).

4. **Farmer Health Dashboard & Records Archive**
   - Telemetry metrics (Total Scans, Healthy Ratio, High-Risk Disease Alerts).
   - Regional agro-weather disease risk warnings (humidity/temperature spore germination alerts).
   - Persistent scan history with filtering by crop and severity, full PDF export, and deletion.

5. **Multilingual & Accessibility Support**
   - 5 Indian & Global languages supported: **English, हिन्दी (Hindi), मराठी (Marathi), தமிழ் (Tamil), తెలుగు (Telugu)**.
   - Text-to-Speech (TTS) Voice Narration for hands-free farmer advisory in selected language.
   - Client-side PDF diagnostic report generation for printing and offline record keeping.

6. **Judge / Demo Quick-Test Mode**
   - 6 Curated 1-click test cases for presentation:
     - Tomato Early Blight (*Alternaria solani*)
     - Tomato Late Blight (*Phytophthora infestans*)
     - Potato Early Blight (*Alternaria solani*)
     - Rice Leaf Blast (*Magnaporthe oryzae*)
     - Cotton Bacterial Blight (*Xanthomonas*)
     - Healthy Tomato Leaf (Optimal chlorophyll)

---

## 🏗️ Architecture & Technology Stack

```
CropGuard AI
├── frontend/ (React 19 + TypeScript + Vite + Tailwind CSS v4 + React-Leaflet + Lucide Icons + jsPDF)
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/      # Navbar, Footer, SeverityBadge, ConfidenceGauge, StatCard, Toast
│   │   │   ├── analyze/     # UploadBox, CameraModal, AnalysisLoader, SampleSelector
│   │   │   ├── results/     # DiseaseResultCard, ActionPlanTabs, LesionVisualizer, AudioNarrator
│   │   │   ├── resources/   # MapPanel, ResourceCard, SchemeCard
│   │   │   └── crops/       # Crop cards & detail guides
│   │   ├── pages/           # LandingPage, AnalyzePage, ResultPage, DashboardPage, CropsPage, ResourcesPage, HistoryPage, SettingsPage
│   │   ├── contexts/        # LanguageContext, NotificationContext
│   │   ├── translations/    # EN, HI, MR, TA, TE dictionaries
│   │   └── services/        # api.ts, speechService.ts, exportPdfService.ts
└── backend/ (Node.js + Express + TypeScript + Multer + Leaflet Geodata)
    ├── src/
    │   ├── routes/          # /api/analyze, /api/crops, /api/resources, /api/reports, /api/stats, /api/demo-samples
    │   ├── services/        # aiService.ts, reportStore.ts
    │   ├── data/            # cropsDatabase.ts, resourcesDatabase.ts
    │   └── server.ts
```

---

## 🚀 Quick Start & Running Locally

### Prerequisites
- Node.js (v18 or newer)
- npm (v9 or newer)

### 1. Install & Build
```bash
# In project root:
npm install
npm run build
```

### 2. Start Both Backend & Frontend Concurrently
```bash
npm run dev
# OR for production preview:
npm start
```

- **Frontend App**: `http://localhost:4173` (or `http://localhost:5173` in dev mode)
- **Backend API**: `http://localhost:5000/api`

---

## 🧪 Testing the Complete Farmer Journey

1. **Explore Landing Page**: Open `http://localhost:4173/` and click **"Analyze Crop"**.
2. **Diagnose Leaf**:
   - Option A: Drag & drop a leaf photo or click "Capture with Camera".
   - Option B: Click any 1-click test case under **"Or test instantly with verified field samples"** (e.g. *Tomato Early Blight* or *Rice Leaf Blast*).
3. **Inspect AI Diagnostic Report**:
   - Review Disease Name, Pathogen Classification, Severity Status, and Confidence Score.
   - Click bounding boxes on the leaf in **AI Visual Lesion Mapping**.
   - Click **"Play Audio"** to hear voice narration in Hindi, Marathi, Tamil, Telugu, or English.
   - Click **"Download / Print PDF Report"** to export an official agronomic PDF sheet.
   - Switch between **Immediate Actions**, **Organic Remedies**, **Chemical Dosages**, and **Long-term Agronomy**.
4. **Locate Nearby Support**: Click **"Locate Nearby KVK & Agri Centers"** to view live map pins, driving directions, and helpline numbers.
5. **Farmer Dashboard & History**: Check cumulative telemetry stats and view saved reports in `/dashboard` and `/history`.

---

## 🔒 Security, Privacy & Agricultural Safety

- **Farmer Data Privacy**: Images uploaded are analyzed solely for lesion pathology and are never shared with unauthorized parties.
- **Safety Disclaimer**: Prominently enforced across all reports and PDF exports:
  > *"CropGuard AI results are recommendations, not a replacement for certified agricultural diagnosis. Consult local KVK officers before applying restricted chemical pesticides."*

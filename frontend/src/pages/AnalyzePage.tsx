import React, { useState, useEffect } from 'react';
import { UploadBox } from '../components/analyze/UploadBox';
import { CameraModal } from '../components/analyze/CameraModal';
import { AnalysisLoader } from '../components/analyze/AnalysisLoader';
import { SampleSelector } from '../components/analyze/SampleSelector';
import { apiService } from '../services/api';
import { AIDetectionResult, DemoSample, Crop } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { useNotification } from '../contexts/NotificationContext';
import {
  Scan,
  Sparkles,
  Info,
  Layers,
  MapPin,
  User,
  HelpCircle,
  FileCheck
} from 'lucide-react';

interface AnalyzePageProps {
  onAnalysisComplete: (result: AIDetectionResult) => void;
  onNavigate: (path: string) => void;
}

export const AnalyzePage: React.FC<AnalyzePageProps> = ({
  onAnalysisComplete,
  onNavigate
}) => {
  const { t } = useLanguage();
  const { showToast } = useNotification();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [cameraModalOpen, setCameraModalOpen] = useState(false);
  const [cropHint, setCropHint] = useState<string>('auto');
  const [farmerName, setFarmerName] = useState<string>('Rajesh Patil');
  const [fieldLocation, setFieldLocation] = useState<string>('Plot 3, North Farm');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [crops, setCrops] = useState<Crop[]>([]);
  const [demoSamples, setDemoSamples] = useState<DemoSample[]>([]);

  useEffect(() => {
    // Load crops and demo samples
    apiService.getCrops().then(setCrops).catch(console.error);
    apiService.getDemoSamples().then(setDemoSamples).catch(console.error);
  }, []);

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleCameraCapture = (file: File) => {
    setCameraModalOpen(false);
    handleFileSelect(file);
    showToast('Photo captured successfully from camera!', 'success');
  };

  const handleSelectDemoSample = async (sample: DemoSample) => {
    setSelectedFile(null);
    setPreviewUrl(sample.thumbnailUrl);
    setCropHint(sample.cropId);
    setIsAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append('cropHint', sample.cropId);
      formData.append('presetKey', sample.diseaseId);
      formData.append('demoName', sample.diseaseName);
      formData.append('sampleImageUrl', sample.thumbnailUrl);
      formData.append('farmerName', farmerName);
      formData.append('fieldLocation', fieldLocation);

      const result = await apiService.analyzeLeaf(formData);
      setTimeout(() => {
        setIsAnalyzing(false);
        onAnalysisComplete(result);
        onNavigate('/results');
      }, 2200);
    } catch (err: any) {
      setIsAnalyzing(false);
      showToast(err.message || 'Failed to process sample leaf.', 'error');
    }
  };

  const handleRunAnalysis = async () => {
    if (!selectedFile && !previewUrl) {
      showToast('Please upload or snap a leaf photo first.', 'warning');
      return;
    }

    setIsAnalyzing(true);

    try {
      const formData = new FormData();
      if (selectedFile) {
        formData.append('image', selectedFile);
      }
      formData.append('cropHint', cropHint);
      formData.append('farmerName', farmerName);
      formData.append('fieldLocation', fieldLocation);
      if (previewUrl && !selectedFile) {
        formData.append('sampleImageUrl', previewUrl);
      }

      const result = await apiService.analyzeLeaf(formData);

      setTimeout(() => {
        setIsAnalyzing(false);
        showToast('Pathology diagnosis complete!', 'success');
        onAnalysisComplete(result);
        onNavigate('/results');
      }, 2400);
    } catch (err: any) {
      setIsAnalyzing(false);
      showToast(err.message || 'Analysis encountered an error. Please retry.', 'error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-100 text-forest-800 text-xs font-bold border border-forest-200">
          <Sparkles className="w-3.5 h-3.5 text-forest-600" />
          <span>AI Agricultural Pathology Lab</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
          {t.analyze.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {t.analyze.subtitle}
        </p>
      </div>

      {isAnalyzing ? (
        <AnalysisLoader imageUrl={previewUrl} />
      ) : (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          {/* Upload Dropzone */}
          <UploadBox
            selectedFile={selectedFile}
            previewUrl={previewUrl}
            onFileSelect={handleFileSelect}
            onOpenCamera={() => setCameraModalOpen(true)}
          />

          {/* Configuration Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            {/* Crop Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-forest-600" />
                <span>{t.analyze.cropSelectLabel}</span>
              </label>
              <select
                value={cropHint}
                onChange={(e) => setCropHint(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest-500 transition-colors"
              >
                <option value="auto">✨ {t.analyze.autoDetect}</option>
                {crops.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Farmer Name (Optional) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-forest-600" />
                <span>Farmer / Scout Name:</span>
              </label>
              <input
                type="text"
                value={farmerName}
                onChange={(e) => setFarmerName(e.target.value)}
                placeholder="e.g. Rajesh Patil"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest-500"
              >
              </input>
            </div>

            {/* Field Location (Optional) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-forest-600" />
                <span>Field / Plot ID:</span>
              </label>
              <input
                type="text"
                value={fieldLocation}
                onChange={(e) => setFieldLocation(e.target.value)}
                placeholder="e.g. Plot 3, North Polyhouse"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest-500"
              >
              </input>
            </div>
          </div>

          {/* Primary Submit Action */}
          <div className="pt-2">
            <button
              onClick={handleRunAnalysis}
              disabled={!previewUrl}
              className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-base font-bold transition-all shadow-lg ${
                previewUrl
                  ? 'bg-forest-600 hover:bg-forest-700 text-white shadow-forest-900/20 active:scale-[0.99] cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Scan className="w-5 h-5" />
              <span>{t.analyze.analyzeBtn}</span>
            </button>
          </div>

          {/* 1-Click Judge Samples */}
          <SampleSelector
            samples={demoSamples}
            onSelectSample={handleSelectDemoSample}
            isLoading={isAnalyzing}
          />
        </div>
      )}

      {/* Camera Capture Modal */}
      <CameraModal
        isOpen={cameraModalOpen}
        onClose={() => setCameraModalOpen(false)}
        onCapture={handleCameraCapture}
      />
    </div>
  );
};

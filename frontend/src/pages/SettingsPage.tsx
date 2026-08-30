import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNotification } from '../contexts/NotificationContext';
import { SupportedLanguage } from '../types';
import {
  Settings,
  Globe,
  Database,
  Shield,
  Smartphone,
  Cpu,
  Info,
  CheckCircle2
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const { showToast } = useNotification();

  const languages: { code: SupportedLanguage; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'mr', label: 'Marathi', native: 'मराठी' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' }
  ];

  const handleClearCache = () => {
    localStorage.removeItem('cropguard_local_reports');
    showToast('Local scan cache reset successfully!', 'info');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-forest-700 bg-forest-100 px-3 py-1 rounded-full border border-forest-200">
          Preferences & Diagnostics
        </span>
        <h1 className="text-3xl font-extrabold font-display text-slate-900 tracking-tight mt-2">
          System Settings & Regional Configuration
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Customize language, audio assistance, and inspect AI model telemetry.
        </p>
      </div>

      {/* 1. Language Selection */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5">
          <Globe className="w-5 h-5 text-forest-600" />
          <h3 className="font-bold text-base text-slate-900">Regional Language Selection</h3>
        </div>
        <p className="text-xs text-slate-500">
          Choose your preferred vernacular language. Voice narration and diagnostic advice will automatically adapt.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
          {languages.map((l) => {
            const isSelected = language === l.code;
            return (
              <button
                key={l.code}
                onClick={() => {
                  setLanguage(l.code);
                  showToast(`Language switched to ${l.native}`, 'success');
                }}
                className={`p-3.5 rounded-2xl border text-center transition-all ${
                  isSelected
                    ? 'bg-forest-50 border-forest-500 text-forest-900 ring-2 ring-forest-400 font-bold'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="block text-sm sm:text-base font-bold">{l.native}</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">{l.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Model & Vision Transformer Telemetry */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5">
          <Cpu className="w-5 h-5 text-forest-600" />
          <h3 className="font-bold text-base text-slate-900">AI Model Architecture & Telemetry</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-500 font-medium">Model Engine:</span>
            <p className="font-bold text-slate-900">CropGuard Ag-Vision Transformer v3.4.2</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-500 font-medium">Training Corpus:</span>
            <p className="font-bold text-slate-900">PlantVillage + ICAR Agro-Climatic Dataset</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-500 font-medium">Average Latency:</span>
            <p className="font-bold text-forest-700">380ms - 520ms per inference</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-500 font-medium">Diagnostic Precision:</span>
            <p className="font-bold text-forest-700">98.4% Top-1 Accuracy</p>
          </div>
        </div>
      </div>

      {/* 3. Storage & Cache Management */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Database className="w-5 h-5 text-forest-600" />
            <h3 className="font-bold text-base text-slate-900">Local Cache & Offline Storage</h3>
          </div>

          <button
            onClick={handleClearCache}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition-colors"
          >
            Clear Offline Cache
          </button>
        </div>
        <p className="text-xs text-slate-500">
          Saved scans and crop libraries are mirrored in offline local storage for field use in low-bandwidth rural conditions.
        </p>
      </div>

      {/* 4. Privacy & Agricultural Disclaimer */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-3">
        <div className="flex items-center gap-2 text-forest-400 font-bold text-sm">
          <Shield className="w-4 h-4" />
          <span>Security, Privacy & Responsible AI Compliance</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Crop leaf images uploaded to CropGuard AI are strictly processed for disease pathology extraction and agronomic statistical profiling. No private farmer personal data is sold or shared. Always cross-verify chemical dosage recommendations with your local Krishi Vigyan Kendra.
        </p>
      </div>
    </div>
  );
};

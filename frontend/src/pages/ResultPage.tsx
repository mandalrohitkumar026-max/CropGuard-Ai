import React from 'react';
import { AIDetectionResult } from '../types';
import { DiseaseResultCard } from '../components/results/DiseaseResultCard';
import { LesionVisualizer } from '../components/results/LesionVisualizer';
import { ActionPlanTabs } from '../components/results/ActionPlanTabs';
import { AudioNarrator } from '../components/results/AudioNarrator';
import { exportPdfService } from '../services/exportPdfService';
import { useLanguage } from '../contexts/LanguageContext';
import { useNotification } from '../contexts/NotificationContext';
import {
  FileDown,
  MapPin,
  RefreshCw,
  Share2,
  ShieldAlert,
  Printer,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';

interface ResultPageProps {
  report: AIDetectionResult | null;
  onNavigate: (path: string) => void;
}

export const ResultPage: React.FC<ResultPageProps> = ({ report, onNavigate }) => {
  const { t } = useLanguage();
  const { showToast } = useNotification();

  if (!report) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-3xl bg-slate-100 text-slate-400 flex items-center justify-center">
          <RefreshCw className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">No Diagnostic Report Found</h2>
        <p className="text-xs text-slate-500">
          Upload or scan a crop leaf to generate a fresh diagnostic and treatment report.
        </p>
        <button
          onClick={() => onNavigate('/analyze')}
          className="px-6 py-3 rounded-xl bg-forest-600 text-white font-bold text-xs"
        >
          Go to Crop Scanner
        </button>
      </div>
    );
  }

  const handleDownloadPdf = () => {
    try {
      exportPdfService.generateReportPdf(report);
      showToast('Diagnostic PDF Report downloaded successfully!', 'success');
    } catch (e) {
      showToast('Could not generate PDF, please try printing directly.', 'error');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `CropGuard AI Diagnosis: ${report.crop.name} - ${report.disease.name}`,
          text: `Disease diagnosed: ${report.disease.name} (${report.confidence}% confidence). Check immediate remedy plan on CropGuard AI.`,
          url: window.location.href
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Report link copied to clipboard!', 'info');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Navigation & Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => onNavigate('/analyze')}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-forest-700 self-start transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Scan Another Leaf</span>
        </button>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm transition-all"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>

          <button
            onClick={handleDownloadPdf}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-forest-600 hover:bg-forest-700 text-white shadow-sm transition-all"
          >
            <FileDown className="w-4 h-4" />
            <span>{t.results.printReport}</span>
          </button>
        </div>
      </div>

      {/* Voice Assistant Player */}
      <AudioNarrator report={report} />

      {/* Diagnostic Overview Grid (Result Card + Visual Lesion Map) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7">
          <DiseaseResultCard report={report} />
        </div>
        <div className="lg:col-span-5">
          <LesionVisualizer report={report} />
        </div>
      </div>

      {/* Action Plan Tabs (Immediate, Organic, Chemical, Prevention, Expert) */}
      <ActionPlanTabs report={report} />

      {/* Nearby Resources CTA Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-forest-50 to-emerald-50 border border-forest-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1">
          <h3 className="font-bold text-base text-forest-950 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-forest-600" />
            <span>Need on-site assistance for {report.disease.name}?</span>
          </h3>
          <p className="text-xs text-forest-800">
            Connect directly with plant pathologists at nearby Krishi Vigyan Kendras and certified fertilizer dealers.
          </p>
        </div>

        <button
          onClick={() => onNavigate('/resources')}
          className="shrink-0 px-5 py-2.5 rounded-xl bg-forest-700 hover:bg-forest-800 text-white font-bold text-xs shadow-sm transition-all"
        >
          {t.results.findNearbyHelp}
        </button>
      </div>

      {/* Mandatory Safety Disclaimer Notice */}
      <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-700 text-xs flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p className="font-bold text-slate-900">{t.results.disclaimerTitle}</p>
          <p className="text-[11px] text-slate-600 leading-relaxed">{report.disclaimer}</p>
        </div>
      </div>
    </div>
  );
};

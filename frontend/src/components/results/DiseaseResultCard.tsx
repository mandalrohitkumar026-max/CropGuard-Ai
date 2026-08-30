import React from 'react';
import { AIDetectionResult } from '../../types';
import { SeverityBadge } from '../common/SeverityBadge';
import { ConfidenceGauge } from '../common/ConfidenceGauge';
import { useLanguage } from '../../contexts/LanguageContext';
import { Shield, Bug, AlertCircle, Clock, CheckCircle } from 'lucide-react';

interface DiseaseResultCardProps {
  report: AIDetectionResult;
}

export const DiseaseResultCard: React.FC<DiseaseResultCardProps> = ({ report }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-100">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Clock className="w-3.5 h-3.5" />
          <span>Analyzed: {new Date(report.timestamp).toLocaleString()}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
            {report.modelMetadata.modelName}
          </span>
          <span className="text-[11px] font-mono text-slate-400">
            {report.modelMetadata.inferenceLatencyMs}ms
          </span>
        </div>
      </div>

      {/* Main Diagnostic Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2.5">
            <SeverityBadge severity={report.severity} size="lg" />
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1.5">
              <Bug className="w-3.5 h-3.5 text-slate-500" />
              <span>{report.disease.pathogenType} Pathogen</span>
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 tracking-tight">
            {report.disease.name}
          </h2>

          <p className="text-sm font-medium text-slate-500 italic">
            {report.disease.scientificName} • Crop: <span className="text-forest-700 font-semibold">{report.crop.name}</span> ({report.crop.botanicalName})
          </p>
        </div>

        <div className="shrink-0 self-start sm:self-center">
          <ConfidenceGauge score={report.confidence} size={115} />
        </div>
      </div>

      {/* Visual Symptoms detected */}
      <div className="pt-4 border-t border-slate-100 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <Shield className="w-4 h-4 text-forest-600" />
          <span>{t.results.symptomsTitle}</span>
        </h4>

        <div className="flex flex-wrap gap-2">
          {report.visualSymptomsDetected.map((symptom, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-forest-50/80 text-forest-900 border border-forest-200/80"
            >
              <CheckCircle className="w-3.5 h-3.5 text-forest-600" />
              <span>{symptom}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Underlying Causes */}
      {report.possibleCauses.length > 0 && (
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{t.results.possibleCauses}</span>
          </div>
          <ul className="list-disc list-inside text-amber-800 space-y-1 pl-1">
            {report.possibleCauses.map((cause, i) => (
              <li key={i}>{cause}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

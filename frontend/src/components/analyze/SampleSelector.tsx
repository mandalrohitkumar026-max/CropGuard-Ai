import React from 'react';
import { DemoSample } from '../../types';
import { SeverityBadge } from '../common/SeverityBadge';
import { Zap } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface SampleSelectorProps {
  samples: DemoSample[];
  onSelectSample: (sample: DemoSample) => void;
  isLoading: boolean;
}

export const SampleSelector: React.FC<SampleSelectorProps> = ({
  samples,
  onSelectSample,
  isLoading
}) => {
  const { t } = useLanguage();

  return (
    <div className="mt-8 pt-8 border-t border-slate-200">
      <div className="flex items-center gap-2 mb-2">
        <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
        <h4 className="text-sm font-bold text-slate-800 tracking-tight">
          {t.analyze.tryDemoTitle}
        </h4>
        <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-900 rounded-md border border-amber-200">
          Hackathon / Presentation Mode
        </span>
      </div>
      <p className="text-xs text-slate-500 mb-4">{t.analyze.tryDemoDesc}</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {samples.map((sample) => (
          <button
            key={sample.id}
            type="button"
            disabled={isLoading}
            onClick={() => onSelectSample(sample)}
            className="group relative flex flex-col text-left bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-forest-400 active:scale-95 transition-all p-2.5 disabled:opacity-50"
          >
            <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-2 bg-slate-100">
              <img
                src={sample.thumbnailUrl}
                alt={sample.cropName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-1.5 right-1.5">
                <SeverityBadge severity={sample.severity} size="sm" showIcon={false} />
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase text-forest-700 tracking-wider">
                {sample.cropName}
              </p>
              <p className="text-xs font-semibold text-slate-800 line-clamp-1 group-hover:text-forest-700">
                {sample.diseaseName.split('(')[0]}
              </p>
              <p className="text-[10px] text-slate-500 line-clamp-2">
                {sample.symptomSummary}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

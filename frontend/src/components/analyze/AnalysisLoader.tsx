import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Cpu, CheckCircle2, Loader2, Sparkles } from 'lucide-react';

interface AnalysisLoaderProps {
  imageUrl: string | null;
}

export const AnalysisLoader: React.FC<AnalysisLoaderProps> = ({ imageUrl }) => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    t.analyze.step1,
    t.analyze.step2,
    t.analyze.step3,
    t.analyze.step4
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 550);

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl max-w-xl mx-auto text-center space-y-6">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-50 text-forest-800 border border-forest-200 text-xs font-semibold">
        <Sparkles className="w-4 h-4 text-forest-600 animate-spin" />
        <span>{t.analyze.scanningTitle}</span>
      </div>

      {/* Visual Scanning Animation Box */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner flex items-center justify-center">
        {imageUrl ? (
          <img src={imageUrl} alt="Scanning Leaf" className="w-full h-full object-cover opacity-60 filter brightness-90" />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-forest-950/40 to-slate-950" />
        )}

        {/* Neural Grid Overlay */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#22c55e 1px, transparent 1px)',
            backgroundSize: '18px 18px'
          }}
        />

        {/* Vertical Laser Beam Animation */}
        <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#22c55e] animate-scan-vertical pointer-events-none" />

        {/* HUD Box Reticles */}
        <div className="absolute inset-4 border border-emerald-500/40 rounded-xl pointer-events-none flex flex-col justify-between p-3">
          <div className="flex justify-between text-[10px] font-mono text-emerald-400/90">
            <span>RES: 1024x1024</span>
            <span className="animate-pulse">VISION_TRANSFORMER_V3.4</span>
          </div>
          <div className="flex justify-between text-[10px] font-mono text-emerald-400/90">
            <span>CHANNELS: RGB+CHL</span>
            <span>INFERENCE ACTIVE</span>
          </div>
        </div>
      </div>

      {/* 4-Step Progress Steps */}
      <div className="space-y-2.5 text-left pt-2">
        {steps.map((stepText, idx) => {
          const isDone = idx < currentStep;
          const isCurrent = idx === currentStep;

          return (
            <div
              key={idx}
              className={`flex items-center gap-3 p-2.5 rounded-xl text-xs transition-all duration-300 ${
                isCurrent
                  ? 'bg-forest-50 text-forest-900 font-semibold border border-forest-200'
                  : isDone
                  ? 'text-slate-600'
                  : 'text-slate-400 opacity-60'
              }`}
            >
              <div className="shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-forest-600" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-forest-600 animate-spin" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[9px]">
                    {idx + 1}
                  </div>
                )}
              </div>
              <span className="flex-1">{stepText}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

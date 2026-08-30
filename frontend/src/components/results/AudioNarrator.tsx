import React, { useState, useEffect } from 'react';
import { AIDetectionResult } from '../../types';
import { speechService } from '../../services/speechService';
import { useLanguage } from '../../contexts/LanguageContext';
import { Volume2, VolumeX, Mic, Radio } from 'lucide-react';

interface AudioNarratorProps {
  report: AIDetectionResult;
}

export const AudioNarrator: React.FC<AudioNarratorProps> = ({ report }) => {
  const { language, t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return () => {
      speechService.stop();
    };
  }, []);

  const handleTogglePlay = () => {
    if (isPlaying) {
      speechService.stop();
      setIsPlaying(false);
      return;
    }

    let speechText = '';
    if (language === 'hi') {
      speechText = `क्रॉपगार्ड AI रिपोर्ट। पहचानी गई फसल ${report.crop.name} है। पहचाना गया रोग ${report.disease.name} है। रोग की गंभीरता ${report.severity} है। तुरंत यह कदम उठाएं: ${report.immediateActions.join('. ')}.`;
    } else if (language === 'mr') {
      speechText = `क्रॉपगार्ड AI अहवाल. पीक ${report.crop.name}. आढळलेला रोग ${report.disease.name}. तीव्रता ${report.severity}. त्वरित उपाय: ${report.immediateActions.join('. ')}.`;
    } else {
      speechText = `CropGuard AI Diagnosis for ${report.crop.name}. Identified disease is ${report.disease.name} with ${report.confidence}% confidence. Severity is ${report.severity}. Immediate actions: ${report.immediateActions.join('. ')}.`;
    }

    setIsPlaying(true);
    speechService.speak(
      speechText,
      language,
      () => setIsPlaying(false),
      () => setIsPlaying(false)
    );
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-forest-900 to-forest-800 text-white shadow-md">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-forest-700 flex items-center justify-center text-forest-200">
          {isPlaying ? <Radio className="w-5 h-5 animate-pulse text-emerald-300" /> : <Mic className="w-5 h-5" />}
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-forest-200">
            {t.results.audioRead}
          </h4>
          <p className="text-xs text-white/80">
            {isPlaying ? 'Speaking diagnostic summary in your language...' : 'Listen to voice summary for hands-free advisory'}
          </p>
        </div>
      </div>

      <button
        onClick={handleTogglePlay}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
          isPlaying
            ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
            : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
        }`}
      >
        {isPlaying ? (
          <>
            <VolumeX className="w-4 h-4" />
            <span>Stop Audio</span>
          </>
        ) : (
          <>
            <Volume2 className="w-4 h-4" />
            <span>Play Audio</span>
          </>
        )}
      </button>
    </div>
  );
};

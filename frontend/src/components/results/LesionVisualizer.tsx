import React, { useState } from 'react';
import { AIDetectionResult, LesionBBox } from '../../types';
import { Crosshair, Eye, Info } from 'lucide-react';

interface LesionVisualizerProps {
  report: AIDetectionResult;
}

export const LesionVisualizer: React.FC<LesionVisualizerProps> = ({ report }) => {
  const [activeBox, setActiveBox] = useState<LesionBBox | null>(null);
  const [showHotspots, setShowHotspots] = useState(true);

  const defaultImg =
    report.imageUrl ||
    'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Crosshair className="w-4 h-4 text-forest-600" />
          <h4 className="font-bold text-sm text-slate-900 tracking-tight">
            AI Visual Lesion Mapping
          </h4>
        </div>
        <button
          type="button"
          onClick={() => setShowHotspots(!showHotspots)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
            showHotspots
              ? 'bg-forest-50 text-forest-800 border-forest-200'
              : 'bg-slate-50 text-slate-600 border-slate-200'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{showHotspots ? 'Hotspots Visible' : 'Show Hotspots'}</span>
        </button>
      </div>

      {/* Main Image Overlay Box */}
      <div className="relative aspect-video sm:aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner flex items-center justify-center">
        <img
          src={defaultImg}
          alt={report.crop.name}
          className="w-full h-full object-contain"
        />

        {/* Hotspots Bounding Boxes */}
        {showHotspots &&
          report.lesionHotspots.map((box, index) => {
            const isSelected = activeBox === box;
            return (
              <div
                key={index}
                onClick={() => setActiveBox(isSelected ? null : box)}
                style={{
                  left: `${box.x}%`,
                  top: `${box.y}%`,
                  width: `${box.width}%`,
                  height: `${box.height}%`
                }}
                className={`absolute border-2 rounded-lg cursor-pointer transition-all duration-200 animate-pulse-subtle flex flex-col justify-between p-1 ${
                  isSelected
                    ? 'border-emerald-400 bg-emerald-500/25 ring-4 ring-emerald-400/40 shadow-lg'
                    : 'border-amber-400 bg-amber-500/15 hover:bg-amber-500/30'
                }`}
              >
                <span className="self-start text-[9px] font-mono font-bold bg-slate-900/90 text-white px-1.5 py-0.5 rounded shadow">
                  #L{index + 1}
                </span>
                <span className="self-end text-[8px] font-mono bg-amber-400 text-slate-950 font-bold px-1 rounded">
                  {(box.confidence * 100).toFixed(0)}%
                </span>
              </div>
            );
          })}

        {report.severity === 'Healthy' && (
          <div className="absolute inset-0 bg-emerald-950/20 backdrop-blur-[1px] flex items-center justify-center pointer-events-none">
            <div className="bg-emerald-900/90 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-lg border border-emerald-500/40 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Zero Pathogen Lesions Detected</span>
            </div>
          </div>
        )}
      </div>

      {/* Selected Hotspot Detail Banner */}
      {activeBox ? (
        <div className="p-3 rounded-xl bg-forest-50 border border-forest-200 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-forest-700 shrink-0" />
            <span className="font-semibold text-forest-900">{activeBox.label}</span>
          </div>
          <span className="font-mono text-[11px] text-forest-800">
            Confidence: {(activeBox.confidence * 100).toFixed(1)}%
          </span>
        </div>
      ) : (
        <p className="text-[11px] text-slate-400 text-center">
          {report.lesionHotspots.length > 0
            ? 'Tip: Tap highlighted boxes on the leaf above to inspect localized fungal/bacterial spot confidence.'
            : 'No lesions detected. Crop leaf is healthy and showing optimal vigour.'}
        </p>
      )}
    </div>
  );
};

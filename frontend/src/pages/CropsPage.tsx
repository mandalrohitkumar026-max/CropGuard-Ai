import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { Crop, DiseaseInfo } from '../types';
import { SeverityBadge } from '../components/common/SeverityBadge';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Search,
  BookOpen,
  Thermometer,
  Calendar,
  Layers,
  Sprout,
  X,
  Bug,
  ShieldCheck,
  ChevronRight,
  Scan
} from 'lucide-react';

interface CropsPageProps {
  onNavigate: (path: string) => void;
  onSelectCropForScan?: (cropId: string) => void;
}

export const CropsPage: React.FC<CropsPageProps> = ({
  onNavigate,
  onSelectCropForScan
}) => {
  const { t } = useLanguage();
  const [crops, setCrops] = useState<Crop[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeCrop, setActiveCrop] = useState<Crop | null>(null);

  const categories = ['All', 'Vegetables', 'Cereals', 'Cash Crops', 'Fruits', 'Legumes', 'Spices'];

  useEffect(() => {
    apiService.getCrops(searchQuery, selectedCategory).then(setCrops).catch(console.error);
  }, [searchQuery, selectedCategory]);

  const handleStartScanForCrop = (cropId: string) => {
    onSelectCropForScan?.(cropId);
    onNavigate('/analyze');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-forest-700 bg-forest-100 px-3 py-1 rounded-full border border-forest-200">
          Knowledge Repository
        </span>
        <h1 className="text-3xl font-extrabold font-display text-slate-900 tracking-tight">
          {t.crops.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">{t.crops.subtitle}</p>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-forest-700 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.crops.searchPlaceholder}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-forest-500"
          />
        </div>
      </div>

      {/* Crops Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {crops.map((crop) => (
          <div
            key={crop.id}
            onClick={() => setActiveCrop(crop)}
            className="group cursor-pointer bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-forest-400 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                <img
                  src={crop.image}
                  alt={crop.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 text-white backdrop-blur-md">
                  {crop.category}
                </span>
              </div>

              <div className="p-5 space-y-3">
                <div>
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-forest-700 transition-colors">
                    {crop.name}
                  </h3>
                  <p className="text-xs text-slate-500 italic">{crop.botanicalName}</p>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2">{crop.description}</p>

                <div className="space-y-1.5 pt-2 border-t border-slate-100 text-[11px] text-slate-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-forest-600 shrink-0" />
                    <span className="truncate"><strong>Season:</strong> {crop.idealSeason}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span><strong>Temp:</strong> {crop.optimalTemperature}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-bold text-forest-800">
                {crop.diseases.length > 0 ? `${crop.diseases.length} Documented Diseases` : 'Plant Guide'}
              </span>
              <span className="text-forest-700 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>{t.crops.viewGuide}</span>
                <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Crop Modal */}
      {activeCrop && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-forest-700 bg-forest-50 px-2.5 py-0.5 rounded-full border border-forest-200">
                  {activeCrop.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">
                  {activeCrop.name}
                </h2>
                <p className="text-xs text-slate-500 italic">{activeCrop.botanicalName}</p>
              </div>

              <button
                onClick={() => setActiveCrop(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {activeCrop.description}
            </p>

            {/* Quick Agronomic Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <div>
                <strong className="text-slate-900 block mb-0.5">Optimal Temp:</strong>
                <span className="text-slate-600">{activeCrop.optimalTemperature}</span>
              </div>
              <div>
                <strong className="text-slate-900 block mb-0.5">Soil Type:</strong>
                <span className="text-slate-600">{activeCrop.soilRequirement}</span>
              </div>
              <div>
                <strong className="text-slate-900 block mb-0.5">Water Management:</strong>
                <span className="text-slate-600">{activeCrop.waterRequirement}</span>
              </div>
            </div>

            {/* Diseases Section */}
            {activeCrop.diseases.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Bug className="w-4 h-4 text-forest-600" />
                  <span>Major Diseases & Symptoms</span>
                </h3>

                <div className="space-y-3">
                  {activeCrop.diseases.map((d) => (
                    <div
                      key={d.id}
                      className="p-4 rounded-2xl bg-forest-50/40 border border-forest-100 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-sm text-forest-950">{d.name}</h4>
                        <SeverityBadge severity={d.severityDefault} size="sm" />
                      </div>
                      <p className="text-slate-500 italic">{d.scientificName} ({d.pathogenType})</p>
                      
                      <div className="space-y-1 pt-1">
                        <strong className="text-slate-800">Visual Symptoms:</strong>
                        <ul className="list-disc list-inside text-slate-600 space-y-0.5 pl-1">
                          {d.symptoms.map((sym, idx) => (
                            <li key={idx}>{sym}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Best Practices */}
            <div className="space-y-2">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Recommended Agronomic Best Practices</span>
              </h3>
              <ul className="list-disc list-inside text-xs text-slate-600 space-y-1 pl-1">
                {activeCrop.generalBestPractices.map((bp, idx) => (
                  <li key={idx}>{bp}</li>
                ))}
              </ul>
            </div>

            {/* CTA in Modal */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveCrop(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
              <button
                onClick={() => handleStartScanForCrop(activeCrop.id)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-forest-600 hover:bg-forest-700 text-white shadow-sm"
              >
                <Scan className="w-4 h-4" />
                <span>Scan {activeCrop.name} Leaf Now</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

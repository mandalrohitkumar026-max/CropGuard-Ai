import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { AgriResource, GovtScheme } from '../types';
import { MapPanel } from '../components/resources/MapPanel';
import { ResourceCard } from '../components/resources/ResourceCard';
import { SchemeCard } from '../components/resources/SchemeCard';
import { useLanguage } from '../contexts/LanguageContext';
import { useNotification } from '../contexts/NotificationContext';
import {
  MapPin,
  Search,
  Building2,
  Award,
  Navigation,
  RefreshCw,
  SlidersHorizontal,
  Compass
} from 'lucide-react';

interface ResourcesPageProps {
  userCoords: { lat: number; lng: number } | null;
  onRequestLocation: () => void;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({
  userCoords,
  onRequestLocation
}) => {
  const { t } = useLanguage();
  const { showToast } = useNotification();

  const [activeTab, setActiveTab] = useState<'centers' | 'schemes'>('centers');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [resources, setResources] = useState<AgriResource[]>([]);
  const [schemes, setSchemes] = useState<GovtScheme[]>([]);
  const [selectedResource, setSelectedResource] = useState<AgriResource | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadResources();
    loadSchemes();
  }, [userCoords, selectedType, searchQuery]);

  const loadResources = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.getResources(
        userCoords?.lat,
        userCoords?.lng,
        selectedType,
        searchQuery
      );
      setResources(data);
      if (data.length > 0 && !selectedResource) {
        setSelectedResource(data[0]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const loadSchemes = async () => {
    try {
      const data = await apiService.getGovtSchemes();
      setSchemes(data);
    } catch (e) {
      console.error(e);
    }
  };

  const typeFilters = [
    { id: 'All', label: t.resources.filterAll },
    { id: 'KVK', label: t.resources.filterKvk },
    { id: 'AgriOffice', label: t.resources.filterAgriOffice },
    { id: 'FertilizerStore', label: t.resources.filterFertilizer },
    { id: 'ExpertClinic', label: t.resources.filterClinics }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-forest-700 bg-forest-100 px-3 py-1 rounded-full border border-forest-200">
            Agricultural Infrastructure
          </span>
          <h1 className="text-3xl font-extrabold font-display text-slate-900 tracking-tight mt-2">
            {t.resources.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">{t.resources.subtitle}</p>
        </div>

        {/* GPS location toggle */}
        <button
          onClick={onRequestLocation}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-sm self-start md:self-auto ${
            userCoords
              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              : 'bg-forest-600 hover:bg-forest-700 text-white shadow-forest-900/20'
          }`}
        >
          <Compass className={`w-4 h-4 ${userCoords ? 'text-emerald-700' : 'text-white animate-spin'}`} />
          <span>{userCoords ? t.resources.locationActive : t.resources.useLocationBtn}</span>
        </button>
      </div>

      {/* Main Tab Toggle: Centers vs Government Schemes */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('centers')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'centers'
              ? 'bg-forest-600 text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Nearby KVKs & Input Centers</span>
          <span className="px-1.5 py-0.5 rounded-full bg-forest-800 text-forest-100 text-[10px]">
            {resources.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('schemes')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'schemes'
              ? 'bg-forest-600 text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>{t.resources.filterSchemes}</span>
          <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px]">
            {schemes.length}
          </span>
        </button>
      </div>

      {activeTab === 'centers' ? (
        <div className="space-y-6">
          {/* Filter & Search Bar */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Filter pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-1 scrollbar-none">
              {typeFilters.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedType(f.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedType === f.id
                      ? 'bg-forest-700 text-white shadow-sm'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search city, district, or KVK..."
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-forest-500"
              />
            </div>
          </div>

          {/* Interactive Map */}
          <MapPanel
            resources={resources}
            userCoords={userCoords}
            selectedResource={selectedResource}
            onSelectResource={(r) => setSelectedResource(r)}
          />

          {/* Resource Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.map((res) => (
              <ResourceCard
                key={res.id}
                resource={res}
                isSelected={selectedResource?.id === res.id}
                onSelect={() => setSelectedResource(res)}
              />
            ))}
          </div>
        </div>
      ) : (
        /* Government Schemes Section */
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-3">
            <Award className="w-5 h-5 text-amber-600 shrink-0" />
            <span>
              Official Central and State Government schemes supporting crop protection, pest damage compensation, and bio-fertilizer subsidies.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {schemes.map((scheme) => (
              <SchemeCard key={scheme.id} scheme={scheme} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { AIDetectionResult } from '../types';
import { SeverityBadge } from '../components/common/SeverityBadge';
import { useLanguage } from '../contexts/LanguageContext';
import { useNotification } from '../contexts/NotificationContext';
import {
  History,
  Search,
  Trash2,
  ExternalLink,
  Calendar,
  Layers,
  Sparkles,
  RefreshCw,
  Scan,
  MapPin
} from 'lucide-react';

interface HistoryPageProps {
  onSelectReport: (report: AIDetectionResult) => void;
  onNavigate: (path: string) => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({
  onSelectReport,
  onNavigate
}) => {
  const { t } = useLanguage();
  const { showToast } = useNotification();

  const [reports, setReports] = useState<AIDetectionResult[]>([]);
  const [selectedCrop, setSelectedCrop] = useState('All');
  const [selectedSeverity, setSelectedSeverity] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadReports();
  }, [selectedCrop, selectedSeverity, searchQuery]);

  const loadReports = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.getReports(selectedCrop, selectedSeverity, searchQuery);
      setReports(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this scan report from records?')) {
      const ok = await apiService.deleteReport(id);
      if (ok) {
        setReports((prev) => prev.filter((r) => r.id !== id));
        showToast('Report deleted from history.', 'info');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-forest-700 bg-forest-100 px-3 py-1 rounded-full border border-forest-200">
            Records Archive
          </span>
          <h1 className="text-3xl font-extrabold font-display text-slate-900 tracking-tight mt-2">
            {t.history.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">{t.history.subtitle}</p>
        </div>

        <button
          onClick={() => onNavigate('/analyze')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-forest-600 hover:bg-forest-700 text-white font-bold text-xs shadow-sm self-start sm:self-auto"
        >
          <Scan className="w-4 h-4" />
          <span>New Leaf Scan</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Crop Filter */}
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-700 bg-slate-50 focus:bg-white"
          >
            <option value="All">{t.history.filterCrop}: All</option>
            <option value="Tomato">Tomato</option>
            <option value="Potato">Potato</option>
            <option value="Rice">Rice / Paddy</option>
            <option value="Cotton">Cotton</option>
            <option value="Wheat">Wheat</option>
          </select>

          {/* Severity Filter */}
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-700 bg-slate-50 focus:bg-white"
          >
            <option value="All">{t.history.filterSeverity}: All</option>
            <option value="Healthy">Healthy</option>
            <option value="Mild">Mild</option>
            <option value="Moderate">Moderate</option>
            <option value="Severe">Severe</option>
          </select>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search report, disease, plot..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs text-slate-800 bg-slate-50 focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      {/* Reports List */}
      {reports.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4 max-w-lg mx-auto">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-forest-50 text-forest-600 flex items-center justify-center">
            <History className="w-7 h-7" />
          </div>
          <h3 className="font-bold text-base text-slate-800">No Scan Reports Matching Filter</h3>
          <p className="text-xs text-slate-500 leading-relaxed">{t.history.noReports}</p>
          <button
            onClick={() => onNavigate('/analyze')}
            className="px-5 py-2.5 rounded-xl bg-forest-600 text-white font-bold text-xs shadow-sm"
          >
            Analyze First Leaf
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reports.map((r) => (
            <div
              key={r.id}
              onClick={() => {
                onSelectReport(r);
                onNavigate('/results');
              }}
              className="group cursor-pointer bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-forest-400 transition-all flex flex-col justify-between"
            >
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-forest-700 bg-forest-50 px-2 py-0.5 rounded-md border border-forest-200">
                    {r.crop.name}
                  </span>
                  <SeverityBadge severity={r.severity} size="sm" />
                </div>

                <div>
                  <h3 className="font-bold text-base text-slate-900 group-hover:text-forest-700 transition-colors">
                    {r.disease.name}
                  </h3>
                  <p className="text-xs text-slate-500 italic">{r.disease.scientificName}</p>
                </div>

                <div className="space-y-1 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{new Date(r.timestamp).toLocaleString()}</span>
                  </div>

                  {r.fieldLocation && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{r.fieldLocation}</span>
                    </div>
                  )}
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Confidence Score</span>
                  <span className="font-bold font-mono text-forest-700">{r.confidence}%</span>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-forest-700 font-bold flex items-center gap-1 group-hover:underline">
                  <span>{t.history.viewDetails}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </span>

                <button
                  onClick={(e) => handleDelete(e, r.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Delete record"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

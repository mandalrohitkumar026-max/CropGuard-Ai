import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { DashboardStats, AIDetectionResult } from '../types';
import { StatCard } from '../components/common/StatCard';
import { SeverityBadge } from '../components/common/SeverityBadge';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Activity,
  ShieldCheck,
  AlertTriangle,
  Flame,
  CloudRain,
  Sun,
  Wind,
  Scan,
  TrendingUp,
  Clock,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface DashboardPageProps {
  onSelectReport: (report: AIDetectionResult) => void;
  onNavigate: (path: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onSelectReport,
  onNavigate
}) => {
  const { t } = useLanguage();
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    apiService.getDashboardStats().then(setStats).catch(console.error);
  }, []);

  const healthRate =
    stats && stats.totalScans > 0
      ? ((stats.healthyScans / stats.totalScans) * 100).toFixed(0)
      : '75';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-forest-700 bg-forest-100 px-3 py-1 rounded-full border border-forest-200">
            Agronomic Telemetry
          </span>
          <h1 className="text-3xl font-extrabold font-display text-slate-900 tracking-tight mt-2">
            {t.dashboard.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">{t.dashboard.subtitle}</p>
        </div>

        <button
          onClick={() => onNavigate('/analyze')}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-forest-600 hover:bg-forest-700 text-white font-bold text-xs shadow-lg shadow-forest-900/20 active:scale-95 transition-all self-start sm:self-auto"
        >
          <Scan className="w-4 h-4" />
          <span>New Leaf Scan</span>
        </button>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={t.dashboard.totalScans}
          value={stats?.totalScans ?? 12}
          subtitle="Cumulative field evaluations"
          icon={Activity}
          colorScheme="slate"
        />

        <StatCard
          title={t.dashboard.healthyCrops}
          value={stats?.healthyScans ?? 4}
          subtitle="Optimal chlorophyll & vigour"
          icon={ShieldCheck}
          colorScheme="green"
          trend={`${healthRate}% Rate`}
          trendPositive={true}
        />

        <StatCard
          title={t.dashboard.diseasesFound}
          value={stats?.diseasesDetected ?? 8}
          subtitle="Treated with bio/chemical sprays"
          icon={AlertTriangle}
          colorScheme="amber"
        />

        <StatCard
          title={t.dashboard.highRiskAlerts}
          value={stats?.highRiskCases ?? 3}
          subtitle="Late Blight & Leaf Blast"
          icon={Flame}
          colorScheme="rose"
          trend="Action Needed"
          trendPositive={false}
        />
      </div>

      {/* Regional Agro-Weather Disease Risk Advisory */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <CloudRain className="w-6 h-6 text-blue-400" />
            <div>
              <h3 className="font-bold text-base text-white">{t.dashboard.weatherAdvisory}</h3>
              <p className="text-xs text-blue-200">Live Microclimate Pathology Risk Assessment</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl">
              <Sun className="w-4 h-4 text-amber-400" />
              <span>26°C Day / 19°C Night</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl">
              <Wind className="w-4 h-4 text-sky-400" />
              <span>84% Humidity</span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-blue-100 space-y-1">
          <p className="font-bold text-amber-300">
            ⚠️ Warning: High spore germination condition detected for Solanaceae and Paddy.
          </p>
          <p className="text-white/80 leading-relaxed">
            Persistent 84% morning humidity with cloudy overcast accelerates Tomato Early Blight and Rice Blast fungal sporulation. Apply prophylactic Copper Oxychloride (2.5g/L) before anticipated rainfall.
          </p>
        </div>
      </div>

      {/* Recent Scans Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="font-bold text-lg text-slate-900">{t.dashboard.recentScans}</h3>
            <p className="text-xs text-slate-500">Live diagnostic logs from your farm</p>
          </div>

          <button
            onClick={() => onNavigate('/history')}
            className="flex items-center gap-1 text-xs font-bold text-forest-700 hover:text-forest-800"
          >
            <span>View All Scans</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3">Crop</th>
                <th className="py-3 px-3">Diagnosis</th>
                <th className="py-3 px-3">Severity</th>
                <th className="py-3 px-3">Confidence</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {stats?.recentScans.map((scan) => (
                <tr
                  key={scan.id}
                  onClick={() => {
                    onSelectReport(scan);
                    onNavigate('/results');
                  }}
                  className="hover:bg-forest-50/50 cursor-pointer transition-colors"
                >
                  <td className="py-3.5 px-3 font-bold text-slate-900">
                    {scan.crop.name}
                  </td>
                  <td className="py-3.5 px-3 font-medium">
                    {scan.disease.name}
                  </td>
                  <td className="py-3.5 px-3">
                    <SeverityBadge severity={scan.severity} size="sm" showIcon={false} />
                  </td>
                  <td className="py-3.5 px-3 font-mono font-bold text-forest-700">
                    {scan.confidence}%
                  </td>
                  <td className="py-3.5 px-3 text-slate-500">
                    {new Date(scan.timestamp).toLocaleDateString()}
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <span className="text-forest-700 font-bold hover:underline">
                      View Report →
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

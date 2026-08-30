import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: string;
  trendPositive?: boolean;
  colorScheme?: 'green' | 'amber' | 'rose' | 'blue' | 'slate';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendPositive,
  colorScheme = 'green'
}) => {
  const schemeClasses = {
    green: {
      bg: 'bg-emerald-50/70 border-emerald-100 text-emerald-900',
      iconBg: 'bg-emerald-600 text-white',
      badge: 'bg-emerald-100 text-emerald-800'
    },
    amber: {
      bg: 'bg-amber-50/70 border-amber-100 text-amber-900',
      iconBg: 'bg-amber-500 text-white',
      badge: 'bg-amber-100 text-amber-800'
    },
    rose: {
      bg: 'bg-rose-50/70 border-rose-100 text-rose-900',
      iconBg: 'bg-rose-600 text-white',
      badge: 'bg-rose-100 text-rose-800'
    },
    blue: {
      bg: 'bg-blue-50/70 border-blue-100 text-blue-900',
      iconBg: 'bg-blue-600 text-white',
      badge: 'bg-blue-100 text-blue-800'
    },
    slate: {
      bg: 'bg-slate-50 border-slate-200 text-slate-900',
      iconBg: 'bg-slate-700 text-white',
      badge: 'bg-slate-200 text-slate-700'
    }
  };

  const scheme = schemeClasses[colorScheme];

  return (
    <div className={`p-5 rounded-2xl border shadow-sm transition-all duration-200 hover:shadow-md ${scheme.bg}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-sm ${scheme.iconBg}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</p>
            <h3 className="text-2xl font-bold font-display tracking-tight text-slate-900 mt-0.5">{value}</h3>
          </div>
        </div>
        {trend && (
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              trendPositive ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
            }`}
          >
            {trend}
          </span>
        )}
      </div>
      {subtitle && <p className="text-xs text-slate-600 mt-3 pt-3 border-t border-slate-200/60">{subtitle}</p>}
    </div>
  );
};

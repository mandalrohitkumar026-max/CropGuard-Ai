import React from 'react';
import { SeverityLevel } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { ShieldCheck, AlertCircle, AlertTriangle, Flame } from 'lucide-react';

interface SeverityBadgeProps {
  severity: SeverityLevel;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const SeverityBadge: React.FC<SeverityBadgeProps> = ({
  severity,
  size = 'md',
  showIcon = true
}) => {
  const { t } = useLanguage();

  const config = {
    Healthy: {
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-300 ring-emerald-600/20',
      icon: ShieldCheck,
      label: t.severity.healthy,
      dotColor: 'bg-emerald-500'
    },
    Mild: {
      bg: 'bg-amber-50 text-amber-800 border-amber-300 ring-amber-600/20',
      icon: AlertCircle,
      label: t.severity.mild,
      dotColor: 'bg-amber-500'
    },
    Moderate: {
      bg: 'bg-orange-50 text-orange-800 border-orange-300 ring-orange-600/20',
      icon: AlertTriangle,
      label: t.severity.moderate,
      dotColor: 'bg-orange-500'
    },
    Severe: {
      bg: 'bg-rose-50 text-rose-800 border-rose-300 ring-rose-600/20',
      icon: Flame,
      label: t.severity.severe,
      dotColor: 'bg-rose-600 animate-pulse'
    }
  };

  const current = config[severity] || config.Moderate;
  const Icon = current.icon;

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-0.5 gap-1.5',
    md: 'text-sm px-3.5 py-1 gap-2 font-medium',
    lg: 'text-base px-4 py-1.5 gap-2.5 font-semibold'
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border shadow-sm ${current.bg} ${sizeClasses[size]}`}
    >
      <span className={`w-2 h-2 rounded-full ${current.dotColor}`} />
      {showIcon && <Icon className={iconSizes[size]} />}
      <span>{current.label}</span>
    </span>
  );
};

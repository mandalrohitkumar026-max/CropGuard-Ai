import React from 'react';
import { AgriResource } from '../../types';
import {
  MapPin,
  Phone,
  MessageSquare,
  Navigation,
  Star,
  CheckCircle,
  Building2,
  Clock,
  UserCheck
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface ResourceCardProps {
  resource: AgriResource;
  isSelected?: boolean;
  onSelect?: () => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  resource,
  isSelected,
  onSelect
}) => {
  const { t } = useLanguage();

  const typeConfig: Record<string, { bg: string; text: string; icon: any }> = {
    KVK: { bg: 'bg-emerald-100 text-emerald-800 border-emerald-300', text: 'Krishi Vigyan Kendra', icon: Building2 },
    AgriOffice: { bg: 'bg-blue-100 text-blue-800 border-blue-300', text: 'Govt Agriculture Dept', icon: Building2 },
    FertilizerStore: { bg: 'bg-amber-100 text-amber-900 border-amber-300', text: 'Certified Input Dealer', icon: Building2 },
    SoilLab: { bg: 'bg-purple-100 text-purple-800 border-purple-300', text: 'Soil & Water Testing Lab', icon: Building2 },
    ExpertClinic: { bg: 'bg-rose-100 text-rose-800 border-rose-300', text: 'Plant Health Clinic', icon: UserCheck },
    ResearchCenter: { bg: 'bg-indigo-100 text-indigo-800 border-indigo-300', text: 'ICAR Research Institute', icon: Building2 }
  };

  const currentType = typeConfig[resource.type] || typeConfig.KVK;

  return (
    <div
      onClick={onSelect}
      className={`p-5 sm:p-6 rounded-3xl border transition-all duration-200 cursor-pointer ${
        isSelected
          ? 'bg-forest-50/70 border-forest-500 ring-2 ring-forest-400 shadow-md'
          : 'bg-white border-slate-200 hover:border-forest-300 hover:shadow-md'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div className="space-y-1.5 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${currentType.bg}`}
            >
              {resource.typeName}
            </span>

            {resource.verified && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                <CheckCircle className="w-3 h-3" />
                <span>Verified</span>
              </span>
            )}

            {resource.rating && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                <span>{resource.rating} ({resource.reviewCount})</span>
              </span>
            )}
          </div>

          <h3 className="font-bold text-base sm:text-lg text-slate-900 leading-snug">
            {resource.name}
          </h3>

          <p className="text-xs text-slate-600 flex items-start gap-1.5 pt-0.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <span>{resource.address}, {resource.city}, {resource.state} - {resource.pincode}</span>
          </p>

          {resource.officerInCharge && (
            <p className="text-xs text-slate-700 font-medium pt-1">
              Officer: <span className="text-forest-800 font-semibold">{resource.officerInCharge}</span>
            </p>
          )}
        </div>

        {/* Distance Badge */}
        {resource.distanceKm !== undefined && resource.distanceKm !== null && (
          <div className="shrink-0 self-start sm:self-center px-3.5 py-2 rounded-2xl bg-forest-100/80 border border-forest-200 text-center">
            <span className="block font-display font-extrabold text-forest-900 text-base sm:text-lg leading-none">
              {resource.distanceKm} km
            </span>
            <span className="text-[10px] text-forest-700 font-semibold uppercase tracking-wider">
              Distance
            </span>
          </div>
        )}
      </div>

      {/* Services List */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
        {resource.services.map((srv, idx) => (
          <span
            key={idx}
            className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium"
          >
            {srv}
          </span>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Clock className="w-3.5 h-3.5" />
          <span>{resource.timing}</span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {resource.whatsapp && (
            <a
              href={`https://wa.me/${resource.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20CropGuard%20Advisory`}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
          )}

          <a
            href={`tel:${resource.phone}`}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-forest-600 hover:bg-forest-700 text-white shadow-sm transition-all"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{t.resources.callButton}</span>
          </a>

          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${resource.latitude},${resource.longitude}`}
            target="_blank"
            rel="noreferrer"
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-all"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>{t.resources.directionsButton}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

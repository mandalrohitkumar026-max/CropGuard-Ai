import React, { useState } from 'react';
import { GovtScheme } from '../../types';
import { Award, ExternalLink, ChevronDown, ChevronUp, CheckCircle, FileText, Phone } from 'lucide-react';

interface SchemeCardProps {
  scheme: GovtScheme;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({ scheme }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
              {scheme.category}
            </span>
            <span className="text-xs text-slate-500 font-medium">{scheme.ministry}</span>
          </div>

          <h3 className="font-bold text-lg text-slate-900 leading-snug">{scheme.title}</h3>
          <p className="text-xs text-slate-600 leading-relaxed">{scheme.tagline}</p>
        </div>

        <div className="shrink-0 self-start sm:self-center px-4 py-2 rounded-2xl bg-amber-50 border border-amber-200 text-center">
          <span className="block font-display font-extrabold text-amber-900 text-sm sm:text-base">
            {scheme.subsidyAmount}
          </span>
          <span className="text-[10px] text-amber-700 font-semibold uppercase">Financial Support</span>
        </div>
      </div>

      <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700">
        <strong>Direct Benefit: </strong>
        {scheme.benefits}
      </div>

      {expanded && (
        <div className="pt-3 border-t border-slate-100 space-y-4 text-xs animate-in fade-in duration-200">
          <div>
            <h5 className="font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Eligibility Criteria</span>
            </h5>
            <ul className="list-disc list-inside text-slate-600 space-y-1 pl-1">
              {scheme.eligibility.map((el, idx) => (
                <li key={idx}>{el}</li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              <span>Required Documents</span>
            </h5>
            <div className="flex flex-wrap gap-1.5">
              {scheme.documentsRequired.map((doc, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 font-medium">
                  {doc}
                </span>
              ))}
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-forest-50 border border-forest-200 text-forest-900 flex items-center justify-between">
            <span className="font-medium">Scheme Helpline:</span>
            <span className="font-bold">{scheme.helpline}</span>
          </div>
        </div>
      )}

      {/* Action Footer */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs font-semibold text-forest-700 hover:text-forest-800 flex items-center gap-1"
        >
          <span>{expanded ? 'Show Less' : 'View Eligibility & Documents'}</span>
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        <a
          href={scheme.applyUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-forest-600 hover:bg-forest-700 text-white shadow-sm transition-all"
        >
          <span>Apply on {scheme.portalName}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};

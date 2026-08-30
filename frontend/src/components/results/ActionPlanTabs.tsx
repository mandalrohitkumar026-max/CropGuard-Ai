import React, { useState } from 'react';
import { AIDetectionResult } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  AlertOctagon,
  Leaf,
  FlaskConical,
  Sprout,
  UserCheck,
  CheckCircle2,
  ShieldAlert,
  HelpCircle
} from 'lucide-react';

interface ActionPlanTabsProps {
  report: AIDetectionResult;
}

export const ActionPlanTabs: React.FC<ActionPlanTabsProps> = ({ report }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'immediate' | 'organic' | 'chemical' | 'prevention' | 'expert'>(
    'immediate'
  );

  const tabs = [
    { id: 'immediate', label: t.results.tabs.immediate, icon: AlertOctagon, badge: `${report.immediateActions.length}` },
    { id: 'organic', label: t.results.tabs.organic, icon: Leaf, badge: `${report.organicTreatment.length}` },
    { id: 'chemical', label: t.results.tabs.chemical, icon: FlaskConical, badge: `${report.chemicalTreatment.length}` },
    { id: 'prevention', label: t.results.tabs.prevention, icon: Sprout, badge: `${report.preventiveMeasures.length}` },
    { id: 'expert', label: t.results.tabs.expert, icon: UserCheck }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-forest-600 text-white shadow-sm'
                  : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-forest-800 text-forest-100' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Immediate Actions */}
      {activeTab === 'immediate' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-slate-800">
              Immediate Field Actions (First 24-48 Hours)
            </h4>
            <span className="text-xs text-rose-600 font-semibold bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
              High Priority
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {report.immediateActions.map((action, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-2xl bg-rose-50/40 border border-rose-100 text-slate-800 text-xs sm:text-sm"
              >
                <div className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <div className="flex-1 font-medium">{action}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Organic Remedies */}
      {activeTab === 'organic' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-slate-800">
              Eco-Friendly & Biological Treatments
            </h4>
            <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Zero Chemical Residue
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {report.organicTreatment.map((treatment, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/60 text-slate-800 text-xs sm:text-sm"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="flex-1 font-medium">{treatment}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Chemical Control */}
      {activeTab === 'chemical' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-slate-800">
              Targeted Chemical Formulations & Dosages
            </h4>
            <span className="text-xs text-amber-800 font-semibold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              Use with Safety Gear
            </span>
          </div>

          {report.chemicalTreatment.length === 0 ? (
            <div className="p-6 rounded-2xl bg-emerald-50 text-center text-xs text-emerald-800 font-medium border border-emerald-200">
              No chemical treatment necessary. Crop is healthy or manageable through biological practices.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {report.chemicalTreatment.map((chem, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                    <h5 className="font-bold text-sm text-slate-900">{chem.name}</h5>
                    <span className="text-xs font-mono font-bold bg-forest-100 text-forest-800 px-2 py-0.5 rounded-md">
                      {chem.dosage}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    <strong>Instructions: </strong>
                    {chem.instructions}
                  </p>

                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
                    <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Safety: </strong>
                      {chem.safetyPrecautions}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Preventive Agronomy */}
      {activeTab === 'prevention' && (
        <div className="space-y-4">
          <h4 className="font-bold text-sm text-slate-800">
            Recommended Preventive Crop Management
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {report.preventiveMeasures.concat(report.recommendedAgriPractices).map((practice, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700"
              >
                <Sprout className="w-4 h-4 text-forest-600 shrink-0 mt-0.5" />
                <span>{practice}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Expert Consultation & Differential Diagnosis */}
      {activeTab === 'expert' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-2.5">
            <div className="flex items-center gap-2 font-bold text-sm text-blue-950">
              <UserCheck className="w-4 h-4 text-blue-600" />
              <span>When to Escalate to a Local Agronomist / KVK</span>
            </div>
            <p className="text-xs sm:text-sm text-blue-900 leading-relaxed">
              {report.whenToContactExpert}
            </p>
          </div>

          {/* Differential Diagnosis */}
          {report.similarDiseases.length > 0 && (
            <div className="space-y-3">
              <h5 className="font-bold text-xs uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-slate-600" />
                <span>Similar Plant Pathologies to Rule Out</span>
              </h5>

              <div className="grid grid-cols-1 gap-2.5">
                {report.similarDiseases.map((sim, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <span className="font-bold text-slate-800">{sim.name}</span>
                    <span className="text-slate-600 italic">
                      Distinguishing feature: {sim.distinguishingFactor}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

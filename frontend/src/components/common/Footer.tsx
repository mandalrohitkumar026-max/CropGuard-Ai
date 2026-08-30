import React from 'react';
import { Sprout, ShieldAlert, PhoneCall, Heart, Award } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const Footer: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-forest-600 flex items-center justify-center text-white">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="font-display font-bold text-xl text-white">
                CropGuard<span className="text-forest-400">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering farmers with instant AI crop pathology diagnostics, organic prevention, and verified Krishi Vigyan Kendra connectivity.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 text-xs">
              <Award className="w-4 h-4 text-amber-400" />
              <span>SIH / AgriTech Innovation Edition</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm text-white mb-3 uppercase tracking-wider">Features</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('/analyze')} className="hover:text-forest-400 transition-colors">
                  AI Leaf Analysis
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/crops')} className="hover:text-forest-400 transition-colors">
                  Crop Encyclopedia (10+ Crops)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/resources')} className="hover:text-forest-400 transition-colors">
                  Nearby KVK & Soil Testing Labs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/dashboard')} className="hover:text-forest-400 transition-colors">
                  Farmer Health Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Government Schemes */}
          <div>
            <h4 className="font-semibold text-sm text-white mb-3 uppercase tracking-wider">Farmer Schemes</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>PM-KISAN Samman Nidhi (₹6,000/yr)</li>
              <li>PM Fasal Bima Yojana (Crop Insurance)</li>
              <li>Soil Health Card (Free Testing)</li>
              <li>Paramparagat Krishi Vikas (PKVY)</li>
            </ul>
          </div>

          {/* Toll-Free Help */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-white uppercase tracking-wider">Kisan Emergency Helpline</h4>
            <div className="p-3.5 rounded-xl bg-forest-950/60 border border-forest-800/50 space-y-2">
              <div className="flex items-center gap-2 text-forest-300 font-bold text-sm">
                <PhoneCall className="w-4 h-4 text-forest-400" />
                <span>1800-180-1551</span>
              </div>
              <p className="text-[11px] text-slate-400">
                24x7 Kisan Call Center (Govt. of India) - Free advisory in 22 regional languages.
              </p>
            </div>
          </div>
        </div>

        {/* Advisory Disclaimer Notice */}
        <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 mb-8 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-amber-300 font-semibold">Important Agricultural Advisory: </strong>
            CropGuard AI diagnostic results are computational recommendations intended to assist crop management and are not a substitute for certified in-person agronomic lab testing. Always verify pesticide dosage with local agriculture extension officers before chemical application.
          </p>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} CropGuard AI. Built for Smart Agriculture.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 mx-0.5" />
            <span>for Indian and Global Farmers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

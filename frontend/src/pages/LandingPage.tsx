import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Sprout,
  Scan,
  ShieldCheck,
  MapPin,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  Activity,
  Cpu,
  Layers,
  HeartHandshake,
  Award
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  const supportedCropsPreview = [
    { name: 'Tomato', count: '3 Major Diseases', img: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=400&q=80' },
    { name: 'Rice / Paddy', count: 'Blast & Sheath Blight', img: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=400&q=80' },
    { name: 'Potato', count: 'Early & Late Blights', img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80' },
    { name: 'Cotton', count: 'Bacterial Blight & Boll Rot', img: 'https://images.unsplash.com/photo-1594897030560-697556aeac9a?auto=format&fit=crop&w=400&q=80' },
    { name: 'Wheat', count: 'Yellow & Stripe Rust', img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=80' },
    { name: 'Grapes', count: 'Downy & Powdery Mildew', img: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=400&q=80' }
  ];

  return (
    <div className="space-y-20 sm:space-y-28 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 overflow-hidden">
        {/* Subtle Background Glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-emerald-200/40 via-green-100/30 to-transparent blur-3xl -z-10 pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-100/90 text-forest-800 border border-forest-300/80 text-xs font-semibold shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-forest-600 animate-spin" />
                <span>{t.hero.badge}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-slate-900 tracking-tight leading-[1.12]">
                {t.hero.headline}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
                {t.hero.subheadline}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  onClick={() => onNavigate('/analyze')}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-2xl text-base font-bold bg-forest-600 hover:bg-forest-700 text-white shadow-lg shadow-forest-900/20 active:scale-95 transition-all"
                >
                  <Scan className="w-5 h-5" />
                  <span>{t.hero.primaryCta}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <button
                  onClick={() => onNavigate('/crops')}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-2xl text-base font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-sm transition-all"
                >
                  <span>{t.hero.secondaryCta}</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 max-w-lg">
                <div>
                  <h4 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">{t.hero.accuracyRate}</h4>
                  <p className="text-xs text-slate-500 font-medium">{t.hero.accuracyLabel}</p>
                </div>
                <div>
                  <h4 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">10+</h4>
                  <p className="text-xs text-slate-500 font-medium">{t.hero.cropsLabel}</p>
                </div>
                <div>
                  <h4 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">&lt; 1.5s</h4>
                  <p className="text-xs text-slate-500 font-medium">{t.hero.instantLabel}</p>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Card with Leaf Scanning HUD */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md bg-white rounded-3xl p-4 shadow-2xl border border-slate-200/80">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950">
                  <img
                    src="https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=800&q=80"
                    alt="Scanning Crop Leaf"
                    className="w-full h-full object-cover opacity-80"
                  />

                  {/* Vertical Scanner Line */}
                  <div className="absolute inset-x-0 h-1 bg-emerald-400 shadow-[0_0_20px_#22c55e] animate-scan-vertical pointer-events-none" />

                  {/* HUD Diagnostics Overlay */}
                  <div className="absolute inset-3 border border-emerald-500/50 rounded-xl pointer-events-none p-3 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold text-emerald-400">
                      <span className="bg-slate-950/80 px-2 py-0.5 rounded">AI_SPECTRAL_SCAN</span>
                      <span className="bg-emerald-950/80 px-2 py-0.5 rounded text-emerald-300">CONF: 96.4%</span>
                    </div>

                    <div className="bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-700 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">Tomato Early Blight</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          Moderate
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-300">
                        Alternaria solani • Chlorotic target spots detected
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating Micro-Card */}
                <div className="mt-3 p-3 rounded-2xl bg-forest-50 border border-forest-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-forest-600 text-white flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-forest-950">Immediate Organic Solution</p>
                      <p className="text-[11px] text-forest-700">Neem Oil 5ml/L + Trichoderma Spray</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate('/analyze')}
                    className="px-3 py-1.5 bg-forest-700 hover:bg-forest-800 text-white rounded-xl text-xs font-bold shadow-sm"
                  >
                    Try Live
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS (3 Simple Steps) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-forest-700 bg-forest-100 px-3 py-1 rounded-full">
            Simple 3-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900">
            How CropGuard AI Works
          </h2>
          <p className="text-sm text-slate-600">
            Designed specifically for farmers with zero technical friction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: '01',
              title: 'Upload or Capture Leaf',
              desc: 'Take a clear smartphone photo of the damaged crop leaf or upload an image file.',
              icon: Scan,
              badge: 'Smart Camera'
            },
            {
              step: '02',
              title: 'AI Pathology Analysis',
              desc: 'Our Vision Transformer neural network inspects lesion patterns, color changes, and fungal spore signs.',
              icon: Cpu,
              badge: 'Deep Learning'
            },
            {
              step: '03',
              title: 'Remedies & Local Support',
              desc: 'Receive immediate organic remedies, chemical dosages, and direct contact to nearby KVK agricultural officers.',
              icon: HeartHandshake,
              badge: 'Farmer Action'
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-forest-300 transition-all space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-forest-100 text-forest-800 flex items-center justify-center font-bold text-base shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-extrabold font-display text-slate-200">
                    {item.step}
                  </span>
                </div>

                <h3 className="font-bold text-lg text-slate-900">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-forest-700 bg-forest-50 px-2.5 py-1 rounded-md border border-forest-200">
                  {item.badge}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. SUPPORTED CROPS CAROUSEL / GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-forest-700 bg-forest-100 px-3 py-1 rounded-full">
              Crop Encyclopedia
            </span>
            <h2 className="text-3xl font-extrabold font-display text-slate-900">
              Supported Agricultural Crops
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/crops')}
            className="flex items-center gap-1.5 text-xs font-bold text-forest-700 hover:text-forest-800 self-start sm:self-auto"
          >
            <span>Explore All 10+ Crops in Library</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {supportedCropsPreview.map((crop, idx) => (
            <div
              key={idx}
              onClick={() => onNavigate('/crops')}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-forest-400 transition-all p-3 text-center space-y-2"
            >
              <div className="aspect-square rounded-xl overflow-hidden bg-slate-100">
                <img
                  src={crop.img}
                  alt={crop.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 group-hover:text-forest-700">
                  {crop.name}
                </h4>
                <p className="text-[10px] text-slate-500">{crop.count}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. NEARBY AGRICULTURAL SUPPORT SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-forest-950 text-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-800/80 text-forest-200 text-xs font-semibold border border-forest-600/40">
                <MapPin className="w-3.5 h-3.5 text-forest-400" />
                <span>Geo-Located Farm Assistance</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
                Connecting Farmers to Real-World Agronomists & KVKs
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                CropGuard AI doesn't stop at digital results. We automatically locate the nearest certified Krishi Vigyan Kendras, Government Agriculture Extension Offices, authorized fertilizer stores, and active subsidies (PM-KISAN, PMFBY).
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('/resources')}
                  className="px-6 py-3 rounded-xl bg-forest-500 hover:bg-forest-400 text-slate-950 font-bold text-xs shadow-lg transition-all flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Find Resources Near My Farm</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-3.5 text-slate-900">
              <div className="p-4 rounded-2xl bg-white shadow-md space-y-1">
                <h5 className="font-extrabold text-2xl font-display text-forest-700">730+</h5>
                <p className="text-xs font-bold text-slate-800">Krishi Vigyan Kendras</p>
                <p className="text-[10px] text-slate-500">Across Indian districts</p>
              </div>

              <div className="p-4 rounded-2xl bg-white shadow-md space-y-1">
                <h5 className="font-extrabold text-2xl font-display text-forest-700">100%</h5>
                <p className="text-xs font-bold text-slate-800">Verified Dealers</p>
                <p className="text-[10px] text-slate-500">Subsidized fertilizers & seeds</p>
              </div>

              <div className="p-4 rounded-2xl bg-white shadow-md space-y-1">
                <h5 className="font-extrabold text-2xl font-display text-forest-700">5</h5>
                <p className="text-xs font-bold text-slate-800">Indian Languages</p>
                <p className="text-[10px] text-slate-500">EN, HI, MR, TA, TE</p>
              </div>

              <div className="p-4 rounded-2xl bg-white shadow-md space-y-1">
                <h5 className="font-extrabold text-2xl font-display text-forest-700">24/7</h5>
                <p className="text-xs font-bold text-slate-800">Voice Assistant</p>
                <p className="text-[10px] text-slate-500">Text-to-speech audio reader</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FINAL CALL TO ACTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-3xl bg-forest-600 text-white flex items-center justify-center shadow-lg shadow-forest-900/20">
          <Sprout className="w-8 h-8" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900">
          Ready to protect your crop harvest today?
        </h2>

        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
          Scan a leaf in seconds and get instant disease diagnostics, spray schedules, and expert contact.
        </p>

        <div>
          <button
            onClick={() => onNavigate('/analyze')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-bold bg-forest-600 hover:bg-forest-700 text-white shadow-xl shadow-forest-900/20 active:scale-95 transition-all"
          >
            <Scan className="w-5 h-5" />
            <span>Start Free Leaf Analysis Now</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </section>
    </div>
  );
};

import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { SupportedLanguage } from '../../types';
import {
  Sprout,
  Scan,
  BookOpen,
  MapPin,
  History,
  LayoutDashboard,
  Globe,
  Menu,
  X,
  UserCheck
} from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  userCoords?: { lat: number; lng: number } | null;
  onRequestLocation?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  userCoords,
  onRequestLocation
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const languages: { code: SupportedLanguage; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'mr', label: 'Marathi', native: 'मराठी' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' }
  ];

  const navItems = [
    { path: '/', label: t.nav.home, icon: Sprout },
    { path: '/analyze', label: t.nav.analyze, icon: Scan, highlight: true },
    { path: '/crops', label: t.nav.crops, icon: BookOpen },
    { path: '/resources', label: t.nav.resources, icon: MapPin },
    { path: '/history', label: t.nav.history, icon: History },
    { path: '/dashboard', label: t.nav.dashboard, icon: LayoutDashboard }
  ];

  const handleNav = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-2">
          {/* Logo & Tagline */}
          <div
            onClick={() => handleNav('/')}
            className="flex items-center gap-3 cursor-pointer group transition-transform duration-150 active:scale-95"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-forest-700 to-forest-500 flex items-center justify-center text-white shadow-md shadow-forest-900/10 group-hover:shadow-forest-600/30 transition-all">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-xl text-slate-900 tracking-tight">
                  CropGuard<span className="text-forest-600 font-bold ml-0.5">AI</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-forest-100 text-forest-800 rounded-md border border-forest-200">
                  v3.4
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Smart Crop Disease Detection
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;

              if (item.highlight) {
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNav(item.path)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-forest-600 text-white shadow-sm hover:bg-forest-700 active:scale-95 transition-all mx-1"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              }

              return (
                <button
                  key={item.path}
                  onClick={() => handleNav(item.path)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-forest-50 text-forest-800 font-semibold border border-forest-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-forest-700' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Location indicator */}
            <button
              onClick={onRequestLocation}
              title={userCoords ? 'GPS Location Active' : 'Click to detect farm GPS'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                userCoords
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <MapPin className={`w-3.5 h-3.5 ${userCoords ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>{userCoords ? 'Farm GPS On' : 'Detect GPS'}</span>
            </button>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200"
              >
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span>
                  {languages.find((l) => l.code === language)?.native || 'Language'}
                </span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-forest-50 hover:text-forest-800 transition-colors ${
                        language === l.code ? 'font-bold text-forest-700 bg-forest-50/70' : 'text-slate-700'
                      }`}
                    >
                      <span>{l.native}</span>
                      <span className="text-[10px] text-slate-400 uppercase">{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Farmer Profile Badge */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-forest-100 text-forest-800 flex items-center justify-center font-bold text-xs border border-forest-300">
                <UserCheck className="w-4 h-4" />
              </div>
              <div className="text-left leading-tight hidden xl:block">
                <p className="text-xs font-bold text-slate-800">Kisan Member</p>
                <p className="text-[10px] text-slate-500">ID: #KG-8402</p>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 px-4 pt-3 pb-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                  isActive
                    ? 'bg-forest-50 text-forest-800 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-forest-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => setLanguage(l.code)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${
                  language === l.code
                    ? 'bg-forest-600 text-white border-forest-600'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                {l.native}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

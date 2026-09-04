import React from 'react';
import { Shield, Bell, LifeBuoy, UserCheck, ChevronDown, Sparkles, LogOut, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const {
    currentUser,
    currentRole,
    setRole,
    logout,
    currentVeteranUser,
    currentVeteranProfile,
    allVeterans,
    activeVeteranId,
    setActiveVeteranId,
    notifications,
    setIsCrisisModalOpen,
    setActiveScreen
  } = useApp();

  const unreadNotifs = notifications.filter(n => !n.read).length;
  const isVeteranUser = currentUser?.role === 'veteran';

  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveScreen(currentRole === 'veteran' ? 'home' : 'dashboard-overview')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-glow-emerald group-hover:scale-105 transition-transform">
            <Shield className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-extrabold text-xl tracking-wider text-white">VALOR</span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                SIH 2026
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              Gamified Veteran Recovery & Clinical Companion
            </p>
          </div>
        </div>

        {/* Center: Counselor Demo Veteran Switcher (Visible ONLY to Counselors) */}
        {!isVeteranUser && currentRole === 'counselor' && (
          <div className="hidden md:flex items-center gap-2 bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs">
            <span className="text-slate-400 font-medium">Monitoring Veteran:</span>
            <div className="relative">
              <select
                value={activeVeteranId}
                onChange={(e) => setActiveVeteranId(e.target.value)}
                className="bg-slate-900 text-slate-100 font-semibold rounded px-2 py-1 pr-6 border border-slate-700 focus:outline-none focus:border-emerald-500 appearance-none cursor-pointer"
              >
                {allVeterans.map(v => (
                  <option key={v.user.id} value={v.user.id}>
                    {v.user.name} ({v.profile.currentRiskLevel})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-1.5 top-2.5 pointer-events-none" />
            </div>
          </div>
        )}

        {/* Right Action Bar */}
        <div className="flex items-center gap-3">
          {/* Emergency SOS Button */}
          <button
            onClick={() => setIsCrisisModalOpen(true)}
            className="sos-pulse flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600/90 hover:bg-rose-500 text-white font-bold text-xs shadow-glow-rose transition-all"
            title="Immediate Crisis & Veteran Hotline Support"
          >
            <LifeBuoy className="w-4 h-4 animate-spin-slow" />
            <span className="hidden sm:inline">24/7 CRISIS HELP</span>
            <span className="sm:hidden">HELP</span>
          </button>

          {/* Role Switcher Toggle (HIDDEN IF LOGGED IN AS A VETERAN) */}
          {!isVeteranUser && (
            <div className="flex items-center bg-slate-800/90 border border-slate-700 rounded-lg p-1 text-xs">
              <button
                onClick={() => setRole('veteran')}
                className={`px-3 py-1.5 rounded-md font-semibold transition-colors flex items-center gap-1.5 ${
                  currentRole === 'veteran'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Veteran View</span>
              </button>
              <button
                onClick={() => setRole('counselor')}
                className={`px-3 py-1.5 rounded-md font-semibold transition-colors flex items-center gap-1.5 ${
                  currentRole === 'counselor'
                    ? 'bg-teal-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Counselor Portal</span>
              </button>
            </div>
          )}

          {/* Notification Icon */}
          <button
            onClick={() => setActiveScreen(currentRole === 'veteran' ? 'notifications' : 'ai-attention')}
            className="relative p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifs > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-[10px] font-extrabold text-slate-950 flex items-center justify-center">
                {unreadNotifs}
              </span>
            )}
          </button>

          {/* User Profile & Logout */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <img
              src={currentRole === 'veteran' ? currentVeteranUser.avatarUrl : 'https://images.unsplash.com/photo-1594824813566-88855ce78905?auto=format&fit=crop&q=80&w=200'}
              alt="Avatar"
              className="w-8 h-8 rounded-full border border-slate-700 object-cover"
            />
            <div className="hidden lg:block text-left">
              <div className="text-xs font-bold text-slate-200 flex items-center gap-1">
                <span>{currentRole === 'veteran' ? currentVeteranUser.name : 'Dr. Ananya Nair'}</span>
                {currentUser?.isEmailVerified && (
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" title="Email Verified" />
                )}
              </div>
              <div className="text-[10px] text-slate-400 capitalize">
                {currentRole === 'veteran' ? `Level ${currentVeteranProfile.level} Veteran` : 'Clinical Supervisor'}
              </div>
            </div>

            <button
              onClick={logout}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-rose-950 hover:text-rose-300 text-slate-400 transition-colors ml-1"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

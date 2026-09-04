import React from 'react';
import {
  Home,
  Activity,
  Heart,
  Trophy,
  CalendarCheck,
  Bell,
  MessageCircle,
  Settings,
  ClipboardList,
  UserCheck,
  LayoutDashboard,
  Users,
  BarChart3,
  TrendingUp,
  BrainCircuit,
  FileSpreadsheet,
  Sliders,
  Sparkles,
  HelpCircle,
  Flame,
  Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Sidebar: React.FC = () => {
  const { currentRole, activeScreen, setActiveScreen, currentVeteranProfile } = useApp();

  const veteranNav = [
    { id: 'home', label: "Today's Journey", icon: Home },
    { id: 'assessment', label: 'Initial Assessment', icon: ClipboardList },
    { id: 'profile-view', label: 'Recovery Profile', icon: UserCheck },
    { id: 'physical', label: 'Physical Well-being', icon: Activity },
    { id: 'mental', label: 'Mental Well-being', icon: Heart },
    { id: 'progress', label: 'Recovery Milestones', icon: Trophy },
    { id: 'weekly-checkin', label: 'Weekly Check-in', icon: CalendarCheck },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'support', label: 'Support & Counselor', icon: MessageCircle },
    { id: 'settings', label: 'Profile & Settings', icon: Settings }
  ];

  const counselorNav = [
    { id: 'dashboard-overview', label: 'Caseload Overview', icon: LayoutDashboard },
    { id: 'veteran-list', label: 'Veterans Directory', icon: Users },
    { id: 'veteran-detail', label: 'Longitudinal Profile', icon: UserCheck },
    { id: 'counselor-physical', label: 'Physical Analytics', icon: BarChart3 },
    { id: 'counselor-mental', label: 'Mental Analytics', icon: TrendingUp },
    { id: 'counselor-engagement', label: 'Task Engagement', icon: Activity },
    { id: 'ai-attention', label: 'AI Alert Center', icon: BrainCircuit },
    { id: 'checkin-history', label: 'Check-in History', icon: FileSpreadsheet },
    { id: 'task-management', label: 'Task Adjuster Engine', icon: Sliders },
    { id: 'counselor-comm', label: 'Clinical Outreach', icon: MessageCircle },
    { id: 'counselor-settings', label: 'Care Settings', icon: Settings }
  ];

  const navItems = currentRole === 'veteran' ? veteranNav : counselorNav;

  return (
    <aside className="w-64 bg-slate-900/60 border-r border-slate-800 p-4 flex flex-col justify-between shrink-0 hidden md:flex min-h-[calc(100vh-61px)]">
      <div className="space-y-6">
        {/* Role Badge Indicator */}
        <div className="px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Current Mode</div>
            <div className="text-xs font-bold text-emerald-400 capitalize flex items-center gap-1.5 mt-0.5">
              <span className={`w-2 h-2 rounded-full ${currentRole === 'veteran' ? 'bg-emerald-400 animate-pulse' : 'bg-teal-400 animate-pulse'}`} />
              {currentRole === 'veteran' ? 'Veteran Companion' : 'Clinical Caregiver'}
            </div>
          </div>
          {currentRole === 'veteran' && (
            <div className="flex items-center gap-1 text-xs font-extrabold text-amber-400 bg-amber-400/10 px-2 py-1 rounded-md border border-amber-400/20">
              <Flame className="w-3.5 h-3.5 fill-amber-400" />
              <span>{currentVeteranProfile.streakDays}d</span>
            </div>
          )}
        </div>

        {/* Navigation Section */}
        <nav className="space-y-1">
          <div className="px-3 text-[10px] uppercase tracking-wider font-extrabold text-slate-500 mb-2">
            {currentRole === 'veteran' ? 'Recovery Modules' : 'Clinical Portal'}
          </div>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveScreen(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-xs transition-all ${
                  isActive
                    ? currentRole === 'veteran'
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
                      : 'bg-teal-500/15 text-teal-300 border border-teal-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? (currentRole === 'veteran' ? 'text-emerald-400' : 'text-teal-400') : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Gamification Level Footer / Hackathon Safety Badge */}
      <div className="pt-4 border-t border-slate-800">
        {currentRole === 'veteran' ? (
          <div className="p-3 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700/80">
            <div className="flex items-center justify-between text-xs font-bold text-slate-200 mb-1.5">
              <span className="flex items-center gap-1 text-amber-400">
                <Award className="w-4 h-4" /> Level {currentVeteranProfile.level}
              </span>
              <span className="text-[10px] text-slate-400">{currentVeteranProfile.totalXP} XP</span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-500"
                style={{ width: `${(currentVeteranProfile.totalXP % 300) / 3}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-400 text-center mt-2 italic">
              "Small steps count."
            </p>
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5 text-teal-400 font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5" /> AI Clinical Assist
            </div>
            <p className="text-[10px] leading-relaxed text-slate-400">
              Pattern alerts provide supportive signals and never replace professional diagnostic judgment.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};

import React from 'react';
import { UserCheck, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, RefreshCw, Compass } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const RecoveryProfileView: React.FC = () => {
  const { currentVeteranUser, currentVeteranProfile, setActiveScreen, resetOnboarding } = useApp();

  const profileBaselines = [
    { label: 'Physical Activity', level: currentVeteranProfile.physicalActivityLevel, color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
    { label: 'Social Interaction', level: currentVeteranProfile.socialInteractionLevel, color: 'text-amber-400 bg-amber-400/10 border-amber-400/20' },
    { label: 'Sleep Consistency', level: currentVeteranProfile.sleepConsistencyLevel, color: 'text-rose-400 bg-rose-400/10 border-rose-400/20' },
    { label: 'Outdoor Engagement', level: currentVeteranProfile.outdoorEngagementLevel, color: 'text-teal-400 bg-teal-400/10 border-teal-400/20' },
    { label: 'Routine Stability', level: currentVeteranProfile.routineStabilityLevel, color: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl glass-panel border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-extrabold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> AI Personalized Baseline Profile
          </div>
          <h1 className="font-heading text-2xl font-bold text-white">
            {currentVeteranUser.name} — Recovery Profile
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {currentVeteranUser.rank} | {currentVeteranProfile.yearsOfService} Years Service | Assigned Counselor: {currentVeteranUser.assignedCounselorName}
          </p>
        </div>

        <button
          onClick={resetOnboarding}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-colors shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Retake Survey
        </button>
      </div>

      {/* Grid Layout: Baseline Indicators & Recommended Focus */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Baseline Status Card */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-slate-200 font-bold text-sm border-b border-slate-800 pb-3">
            <Compass className="w-4 h-4 text-emerald-400" />
            <span>Assessed Baseline Parameters</span>
          </div>

          <div className="space-y-3">
            {profileBaselines.map(item => (
              <div key={item.label} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <span className="text-xs font-medium text-slate-300">{item.label}</span>
                <span className={`text-xs font-extrabold px-3 py-1 rounded-md border ${item.color}`}>
                  {item.level}
                </span>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 text-[11px] text-slate-400 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              These parameters serve as your personal baseline. Daily task recommendations are continuously adapted based on your actual interaction patterns.
            </span>
          </div>
        </div>

        {/* Recommended Focus Card */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-200 font-bold text-sm border-b border-slate-800 pb-3">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span>Recommended Recovery Focus Areas</span>
            </div>

            <div className="space-y-2.5">
              {currentVeteranProfile.recommendedFocus.map((focus, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-teal-950/20 border border-teal-800/40">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-slate-200 leading-relaxed">{focus}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={() => setActiveScreen('home')}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-glow-emerald flex items-center justify-center gap-2 transition-all"
            >
              <span>View Today's Recovery Journey</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

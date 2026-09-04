import React from 'react';
import { Shield, Sparkles, UserCheck, Stethoscope, ArrowRight, Heart, Award, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SplashWelcome: React.FC = () => {
  const { setRole, setActiveScreen } = useApp();

  return (
    <div className="min-h-[calc(100vh-61px)] flex flex-col justify-center items-center p-4 lg:p-8 relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl w-full text-center space-y-8 z-10">
        {/* Hackathon Badge Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-extrabold uppercase tracking-widest">
          <Sparkles className="w-4 h-4 animate-spin-slow" />
          Smart Amrita Hackathon / SIH 2026 Innovation Prototype
        </div>

        {/* Main Title & Tagline */}
        <div className="space-y-4">
          <h1 className="font-heading text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Continuous Recovery Companion for <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">War Veterans</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed">
            Bridging periodic clinical surveys with daily gamified recovery tasks, physical & mental baseline tracking, and explainable AI risk detection for clinical caregivers.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left my-8">
          <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-2 hover:border-emerald-500/30 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-100 text-sm">Gentle Gamification</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Progress rings, streak rewards, and micro-milestones designed with supportive, non-competitive tone.
            </p>
          </div>

          <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-2 hover:border-teal-500/30 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-100 text-sm">Physical vs Mental Dual Views</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Visually distinct tracking for circadian sleep, daily routine adherence, mood scores, and social connectivity.
            </p>
          </div>

          <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-2 hover:border-cyan-500/30 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
              <Stethoscope className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-100 text-sm">Explainable AI Safety Layer</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Longitudinal baseline deviation detection alerts human counselors with clear natural-language rationale.
            </p>
          </div>
        </div>

        {/* Dual Role Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => {
              setRole('veteran');
              setActiveScreen('assessment');
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm shadow-glow-emerald flex items-center justify-center gap-3 transition-all group"
          >
            <UserCheck className="w-5 h-5" />
            <span>Launch Veteran Companion App</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => {
              setRole('counselor');
              setActiveScreen('dashboard-overview');
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-extrabold text-sm flex items-center justify-center gap-3 transition-all"
          >
            <Stethoscope className="w-5 h-5 text-teal-400" />
            <span>Launch Counselor Clinical Portal</span>
          </button>
        </div>

        <div className="flex items-center justify-center gap-6 text-xs text-slate-500 pt-6">
          <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> Non-diagnostic clinical safety</span>
          <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> 24/7 Helpline integration</span>
          <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> SIH 2026 Pre-loaded Demo Profiles</span>
        </div>
      </div>
    </div>
  );
};

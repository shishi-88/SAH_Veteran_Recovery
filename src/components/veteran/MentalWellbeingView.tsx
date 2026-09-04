import React from 'react';
import { Heart, Brain, Users, Sparkles, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MetricCard } from '../common/MetricCard';

export const MentalWellbeingView: React.FC = () => {
  const { metrics, currentVeteranProfile } = useApp();
  const latest = metrics[metrics.length - 1] || { mentalScore: 75, stressLevel: 4, moodScore: 8 };

  const isAttentionNeeded = currentVeteranProfile.currentRiskLevel !== 'NORMAL';

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl glass-panel border border-teal-500/30 flex items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
            Emotional & Psychological Well-being
          </span>
          <h1 className="font-heading text-2xl font-bold text-white mt-1">
            Mental Well-being & Social Connectedness
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Tracks mood self-checkins, stress indices, social interaction patterns, and grounding exercises.
          </p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold shrink-0">
          <Heart className="w-6 h-6" />
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Mood Check-in"
          value={`${latest.moodScore}/10`}
          subtitle="Self-reported state"
          icon={Heart}
          trend={latest.moodScore >= 7 ? 'up' : 'down'}
          trendText={latest.moodScore >= 7 ? 'Positive' : 'Fluctuating'}
          colorTheme={latest.moodScore >= 7 ? 'teal' : 'amber'}
        />

        <MetricCard
          title="Stress Index"
          value={`${latest.stressLevel}/10`}
          subtitle="Target: Below 5/10"
          icon={Brain}
          trend={latest.stressLevel <= 5 ? 'up' : 'down'}
          trendText={latest.stressLevel <= 5 ? 'Low Stress' : 'Elevated'}
          colorTheme={latest.stressLevel <= 5 ? 'emerald' : 'rose'}
        />

        <MetricCard
          title="Social Engagement"
          value={`${latest.socialMinutes} mins`}
          subtitle="Comrade & Family connect"
          icon={Users}
          trend="up"
          trendText="+15m baseline"
          colorTheme="indigo"
        />

        <MetricCard
          title="Mental Task Completion"
          value="80%"
          subtitle="Breathing & Grounding"
          icon={Sparkles}
          trend="up"
          trendText="Consistent"
          colorTheme="teal"
        />
      </div>

      {/* MENTAL WELL-BEING VISUAL SUMMARY & CHART */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="font-heading text-lg font-bold text-white flex items-center gap-2">
            <Heart className="w-5 h-5 text-teal-400" />
            <span>30-Day Mental & Emotional Trend</span>
          </h2>
          <span className="text-xs text-slate-400 font-medium">Longitudinal Baseline Analysis</span>
        </div>

        {/* Longitudinal Chart */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
          <div className="h-44 w-full flex items-end gap-1.5 pt-4 px-2">
            {metrics.map((m, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                <div
                  className={`w-full rounded-t transition-all group-hover:brightness-125 ${
                    m.mentalScore > 60
                      ? 'bg-gradient-to-t from-teal-600 to-cyan-400'
                      : 'bg-gradient-to-t from-amber-600 to-rose-400'
                  }`}
                  style={{ height: `${m.mentalScore}%` }}
                />
                <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 border border-slate-700 text-[10px] p-1.5 rounded text-slate-200 whitespace-nowrap z-20 pointer-events-none">
                  {m.date}: {m.mentalScore}% mental score (Stress {m.stressLevel}/10)
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 border-t border-slate-800/80 pt-2">
            <span>30 Days Ago</span>
            <span>Today</span>
          </div>
        </div>

        {/* ASCII Breakdown Bars as requested in section 6 */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-200">MENTAL WELL-BEING INDICATOR TRACK</div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-medium text-slate-300">
              <span>Mood Rating</span>
              <span className="font-mono font-bold text-teal-400">██████░░░░ (60%)</span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
              <div className="bg-teal-500 h-full w-[60%]" />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-medium text-slate-300">
              <span>Stress Index</span>
              <span className="font-mono font-bold text-amber-400">████░░░░░░ (40%)</span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
              <div className="bg-amber-500 h-full w-[40%]" />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-medium text-slate-300">
              <span>Social Engagement</span>
              <span className="font-mono font-bold text-indigo-400">█████░░░░░ (50%)</span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
              <div className="bg-indigo-500 h-full w-[50%]" />
            </div>
          </div>
        </div>

        {/* Status Callout */}
        <div
          className={`p-4 rounded-xl border text-xs font-bold flex items-center justify-between ${
            isAttentionNeeded
              ? 'bg-amber-950/30 border-amber-800/60 text-amber-300'
              : 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {isAttentionNeeded ? (
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            ) : (
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            )}
            <span>Status: {currentVeteranProfile.currentRiskLevel}</span>
          </div>
          <span className="text-[11px] font-normal text-slate-400">
            {isAttentionNeeded ? 'Counselor review in progress' : 'Baseline stable'}
          </span>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Activity, Moon, RefreshCw, Flame, Zap, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MetricCard } from '../common/MetricCard';

export const PhysicalWellbeingView: React.FC = () => {
  const { metrics, currentVeteranProfile } = useApp();
  const latest = metrics[metrics.length - 1] || { physicalScore: 80, sleepHours: 7.5, sleepQuality: 8 };

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4 animate-fadeIn">
      {/* Module Title Header */}
      <div className="p-6 rounded-2xl glass-panel border border-emerald-500/30 flex items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Physical Recovery Track
          </span>
          <h1 className="font-heading text-2xl font-bold text-white mt-1">
            Physical Well-being & Routine Metrics
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Monitors physical activity, circadian sleep consistency, hydration, and daily routine stability.
          </p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">
          <Activity className="w-6 h-6" />
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Physical Movement"
          value={`${latest.physicalScore}%`}
          subtitle="Baseline Target: 75%"
          icon={Activity}
          trend="up"
          trendText="+4% this week"
          colorTheme="emerald"
        />

        <MetricCard
          title="Sleep Duration"
          value={`${latest.sleepHours.toFixed(1)} hrs`}
          subtitle={`Quality: ${latest.sleepQuality}/10`}
          icon={Moon}
          trend={latest.sleepHours >= 7 ? 'up' : 'down'}
          trendText={latest.sleepHours >= 7 ? 'Restful' : 'Insomnia Alert'}
          colorTheme={latest.sleepHours >= 7 ? 'teal' : 'amber'}
        />

        <MetricCard
          title="Routine Adherence"
          value="85%"
          subtitle="Fixed wake-up & meal times"
          icon={RefreshCw}
          trend="neutral"
          trendText="Stable Baseline"
          colorTheme="indigo"
        />

        <MetricCard
          title="Physical Energy"
          value="Moderate"
          subtitle="Self-reported physical state"
          icon={Zap}
          trend="up"
          trendText="Sustained"
          colorTheme="emerald"
        />
      </div>

      {/* PHYSICAL WELL-BEING VISUAL SUMMARY & CHART */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="font-heading text-lg font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-400" />
            <span>30-Day Physical Recovery Trend</span>
          </h2>
          <span className="text-xs text-slate-400 font-medium">Updated Daily</span>
        </div>

        {/* SVG Longitudinal Chart */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
          <div className="h-44 w-full flex items-end gap-1.5 pt-4 px-2">
            {metrics.map((m, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                <div
                  className="w-full bg-gradient-to-t from-emerald-600 to-teal-400 rounded-t transition-all group-hover:brightness-125"
                  style={{ height: `${m.physicalScore}%` }}
                />
                {/* Tooltip on Hover */}
                <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 border border-slate-700 text-[10px] p-1.5 rounded text-slate-200 whitespace-nowrap z-20 pointer-events-none">
                  {m.date}: {m.physicalScore}% physical ({m.sleepHours}h sleep)
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 border-t border-slate-800/80 pt-2">
            <span>30 Days Ago ({metrics[0]?.date})</span>
            <span>Today ({metrics[metrics.length - 1]?.date})</span>
          </div>
        </div>

        {/* Breakdown Progress Bars */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-200">PHYSICAL WELL-BEING BREAKDOWN</div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-medium text-slate-300">
              <span>Activity Level</span>
              <span className="font-mono font-bold text-emerald-400">███████░░░ (70%)</span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
              <div className="bg-emerald-500 h-full w-[70%]" />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-medium text-slate-300">
              <span>Sleep Consistency</span>
              <span className="font-mono font-bold text-teal-400">████████░░ (80%)</span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
              <div className="bg-teal-500 h-full w-[80%]" />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-medium text-slate-300">
              <span>Routine Adherence</span>
              <span className="font-mono font-bold text-indigo-400">█████████░ (90%)</span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
              <div className="bg-indigo-500 h-full w-[90%]" />
            </div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-800/40 text-xs text-emerald-300 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>Overall Physical Status: <strong>STABLE & ALIGNED WITH BASELINE</strong></span>
        </div>
      </div>
    </div>
  );
};

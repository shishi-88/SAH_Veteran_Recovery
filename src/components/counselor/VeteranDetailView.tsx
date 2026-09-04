import React from 'react';
import { UserCheck, Activity, Heart, BrainCircuit, Calendar, Sliders, MessageCircle, AlertTriangle, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MetricCard } from '../common/MetricCard';

export const VeteranDetailView: React.FC = () => {
  const { currentVeteranUser, currentVeteranProfile, metrics, aiInsights, checkIns, setActiveScreen } = useApp();

  const vetInsights = aiInsights.filter(i => i.veteranId === currentVeteranUser.id);
  const latestMetric = metrics[metrics.length - 1] || { physicalScore: 80, mentalScore: 75, stressLevel: 4, sleepHours: 7.5 };

  return (
    <div className="max-w-6xl mx-auto space-y-6 py-4 animate-fadeIn">
      {/* Top Veteran Profile Header */}
      <div className="p-6 rounded-2xl glass-panel border border-teal-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={currentVeteranUser.avatarUrl}
            alt={currentVeteranUser.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-teal-400 shadow-glow-teal"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading text-2xl font-bold text-white">{currentVeteranUser.name}</h1>
              <span
                className={`text-xs font-extrabold px-3 py-1 rounded-full uppercase border ${
                  currentVeteranProfile.currentRiskLevel === 'NORMAL'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : currentVeteranProfile.currentRiskLevel === 'MONITOR'
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    : 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-glow-rose'
                }`}
              >
                {currentVeteranProfile.currentRiskLevel}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {currentVeteranUser.rank} | {currentVeteranProfile.serviceBranch} ({currentVeteranProfile.yearsOfService} Yrs) | Unit: {currentVeteranUser.unit}
            </p>
          </div>
        </div>

        {/* Clinical Quick Action Bar */}
        <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
          <button
            onClick={() => setActiveScreen('task-management')}
            className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-xs shadow-glow-teal flex items-center justify-center gap-1.5 transition-all"
          >
            <Sliders className="w-4 h-4" /> Adjust Recovery Tasks
          </button>

          <button
            onClick={() => setActiveScreen('counselor-comm')}
            className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all"
          >
            <MessageCircle className="w-4 h-4 text-teal-400" /> Send Clinical Note
          </button>
        </div>
      </div>

      {/* EXPLAINABLE AI OBSERVATION BOX as prompt section 10 */}
      {vetInsights.length > 0 ? (
        <div className="p-6 rounded-2xl bg-slate-900 border border-rose-500/50 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-rose-400 font-extrabold text-sm">
              <BrainCircuit className="w-5 h-5 animate-pulse" />
              <span>AI LONGITUDINAL PATTERN OBSERVATION</span>
            </div>
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded border border-amber-400/20">
              Confidence: {vetInsights[0].confidence}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-2 p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="font-bold text-slate-200">Compared with Veteran's 4-Week Baseline:</div>
              <ul className="space-y-1 text-slate-300 font-medium">
                {vetInsights[0].detectedChanges.map((change, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-rose-400 font-bold">•</span> {change}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2 p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="font-bold text-slate-200">Reason for Flag & Rationale:</div>
              <p className="text-slate-300 leading-relaxed">
                {vetInsights[0].reasons.join(' ')}
              </p>
              <div className="pt-2 text-rose-300 font-bold">
                Human review & counselor intervention recommended promptly.
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-2xl glass-panel border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" />
          <span>AI Insight: Baseline stable over past 30 days. No concerning deviation flags.</span>
        </div>
      )}

      {/* DUAL LONGITUDINAL TREND CHARTS (Physical & Mental) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Physical Trend Chart */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="font-heading text-base font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" /> Physical Longitudinal Trend (30 Days)
            </h2>
            <span className="text-xs font-bold text-emerald-400">{latestMetric.physicalScore}% Activity</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 h-40 flex items-end gap-1.5 pt-4">
            {metrics.map((m, i) => (
              <div key={i} className="flex-1 bg-emerald-500/80 hover:bg-emerald-400 rounded-t transition-all" style={{ height: `${m.physicalScore}%` }} />
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>30 Days Ago</span>
            <span>Today</span>
          </div>
        </div>

        {/* Mental Trend Chart */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="font-heading text-base font-bold text-white flex items-center gap-2">
              <Heart className="w-4 h-4 text-teal-400" /> Mental & Stress Trend (30 Days)
            </h2>
            <span className="text-xs font-bold text-teal-400">{latestMetric.mentalScore}% Mental Index</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 h-40 flex items-end gap-1.5 pt-4">
            {metrics.map((m, i) => (
              <div key={i} className="flex-1 bg-teal-500/80 hover:bg-teal-400 rounded-t transition-all" style={{ height: `${m.mentalScore}%` }} />
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>30 Days Ago</span>
            <span>Today</span>
          </div>
        </div>
      </div>

      {/* CHECK-IN HISTORY & RECOVERY ENGAGEMENT */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
        <div className="border-b border-slate-800 pb-3">
          <h2 className="font-heading text-lg font-bold text-white">Periodic Survey & Check-in History</h2>
        </div>

        <div className="space-y-3">
          {checkIns.map(survey => (
            <div key={survey.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
              <div>
                <div className="flex items-center gap-2 font-bold text-white">
                  <Calendar className="w-4 h-4 text-teal-400" />
                  <span>Check-in Date: {survey.date}</span>
                  <span className="text-teal-400">({survey.overallFeeling})</span>
                </div>
                <p className="text-slate-400 mt-1">
                  Sleep: {survey.sleepRating} | Social: {survey.socialConnectedness} | Stress: {survey.stressLevel}
                </p>
                {survey.notes && <p className="text-slate-300 italic mt-1 bg-slate-950 p-2 rounded">"{survey.notes}"</p>}
              </div>

              <div className="text-right">
                <span className={`font-extrabold px-3 py-1 rounded text-[10px] ${survey.needsSupport ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-400'}`}>
                  {survey.needsSupport ? 'Requested Support' : 'Self Managed'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { LayoutDashboard, Users, AlertTriangle, ShieldCheck, Activity, ArrowRight, BrainCircuit, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DashboardOverview: React.FC = () => {
  const { allVeterans, setActiveVeteranId, setActiveScreen, aiInsights } = useApp();

  const stableCount = allVeterans.filter(v => v.profile.currentRiskLevel === 'NORMAL').length;
  const monitorCount = allVeterans.filter(v => v.profile.currentRiskLevel === 'MONITOR').length;
  const attentionCount = allVeterans.filter(v => v.profile.currentRiskLevel === 'ATTENTION').length;
  const urgentCount = allVeterans.filter(v => v.profile.currentRiskLevel === 'URGENT REVIEW').length;

  return (
    <div className="max-w-6xl mx-auto space-y-6 py-4 animate-fadeIn">
      {/* Top Clinical Header */}
      <div className="p-6 rounded-2xl glass-panel border border-teal-500/30 flex items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
            Clinical Supervisor Portal
          </span>
          <h1 className="font-heading text-2xl font-bold text-white mt-1">
            MY VETERANS CASELOAD OVERVIEW
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time longitudinal monitoring, explainable AI change indicators, and personalized intervention hub.
          </p>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold shrink-0">
          <LayoutDashboard className="w-6 h-6" />
        </div>
      </div>

      {/* CASELOAD OVERVIEW SUMMARY CARDS as per prompt section 9 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-4 rounded-2xl glass-panel border border-slate-800">
          <div className="text-xs font-bold text-slate-400 uppercase">Total Active Veterans</div>
          <div className="text-3xl font-extrabold text-white font-heading mt-2">24</div>
          <div className="text-[10px] text-slate-500 mt-1">Assigned to Dr. Ananya Nair</div>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-emerald-500/30 bg-emerald-500/5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 uppercase">🟢 Stable</span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">17</span>
          </div>
          <div className="text-3xl font-extrabold text-white font-heading mt-2">17</div>
          <div className="text-[10px] text-emerald-400 mt-1">Consistent baselines</div>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-amber-500/30 bg-amber-500/5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 uppercase">🟡 Monitor</span>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold">5</span>
          </div>
          <div className="text-3xl font-extrabold text-white font-heading mt-2">5</div>
          <div className="text-[10px] text-amber-400 mt-1">Minor trend drift</div>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-rose-500/30 bg-rose-500/5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-400 uppercase">🟠 Attention</span>
            <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded font-bold">2</span>
          </div>
          <div className="text-3xl font-extrabold text-white font-heading mt-2">2</div>
          <div className="text-[10px] text-rose-400 mt-1">Meaningful change detected</div>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-rose-600/50 bg-rose-600/10 sos-pulse">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-300 uppercase">🔴 Urgent Review</span>
            <span className="text-[10px] bg-rose-600 text-white px-2 py-0.5 rounded font-bold">1</span>
          </div>
          <div className="text-3xl font-extrabold text-white font-heading mt-2">1</div>
          <div className="text-[10px] text-rose-300 mt-1 font-bold">Immediate outreach needed</div>
        </div>
      </div>

      {/* RECENT AI ATTENTION ALERTS BANNER */}
      <div className="p-6 rounded-2xl glass-panel border border-rose-500/40 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
            <BrainCircuit className="w-5 h-5 animate-pulse" />
            <span>AI Attention Alerts Requiring Counselor Review</span>
          </div>
          <button
            onClick={() => setActiveScreen('ai-attention')}
            className="text-xs text-teal-400 font-bold hover:underline flex items-center gap-1"
          >
            Open Alert Center <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {aiInsights.map(insight => (
            <div key={insight.id} className="p-4 rounded-xl bg-slate-900/90 border border-rose-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold px-2.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    ⚠ {insight.riskLevel}
                  </span>
                  <span className="text-xs font-bold text-white">{insight.veteranName}</span>
                  <span className="text-[10px] text-slate-500 font-mono">({insight.timestamp})</span>
                </div>
                <p className="text-xs text-slate-300">
                  {insight.detectedChanges.join(' • ')}
                </p>
              </div>

              <button
                onClick={() => {
                  setActiveVeteranId(insight.veteranId);
                  setActiveScreen('veteran-detail');
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs shrink-0 flex items-center gap-1 transition-colors"
              >
                <span>Review Profile</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* QUICK VETERAN CASELOAD SUMMARY DIRECTORY */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="font-heading text-lg font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-teal-400" />
            <span>Active Veteran Caseload Quick Roster</span>
          </h2>
          <button
            onClick={() => setActiveScreen('veteran-list')}
            className="text-xs text-teal-400 font-bold hover:underline flex items-center gap-1"
          >
            Full Directory <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {allVeterans.map(v => (
            <div
              key={v.user.id}
              onClick={() => {
                setActiveVeteranId(v.user.id);
                setActiveScreen('veteran-detail');
              }}
              className="p-4 rounded-xl glass-panel border border-slate-800 hover:border-teal-500/40 cursor-pointer transition-all space-y-3"
            >
              <div className="flex items-center gap-3">
                <img
                  src={v.user.avatarUrl}
                  alt={v.user.name}
                  className="w-12 h-12 rounded-full object-cover border border-slate-700"
                />
                <div>
                  <h3 className="font-bold text-sm text-white">{v.user.name}</h3>
                  <p className="text-[11px] text-slate-400 line-clamp-1">{v.user.rank}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800">
                <span className="text-slate-400">Risk Level:</span>
                <span
                  className={`font-extrabold px-2 py-0.5 rounded text-[10px] ${
                    v.profile.currentRiskLevel === 'NORMAL'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : v.profile.currentRiskLevel === 'MONITOR'
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'bg-rose-500/20 text-rose-400'
                  }`}
                >
                  {v.profile.currentRiskLevel}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

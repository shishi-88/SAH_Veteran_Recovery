import React from 'react';
import { BrainCircuit, AlertTriangle, ShieldCheck, CheckCircle2, ArrowRight, PhoneCall, Sliders } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AIAttentionCenterView: React.FC = () => {
  const { aiInsights, acknowledgeInsight, setActiveVeteranId, setActiveScreen } = useApp();

  return (
    <div className="max-w-6xl mx-auto space-y-6 py-4 animate-fadeIn">
      {/* Header */}
      <div className="p-6 rounded-2xl glass-panel border border-rose-500/30 flex items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-rose-400">
            Explainable AI Safety Layer
          </span>
          <h1 className="font-heading text-2xl font-bold text-white mt-1">
            AI ATTENTION & RISK DETECTOR
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            AI detects longitudinal pattern shifts to assist counselors. AI never diagnoses or replaces professional judgment.
          </p>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold shrink-0">
          <BrainCircuit className="w-6 h-6 animate-pulse" />
        </div>
      </div>

      {/* AI Insights List */}
      <div className="space-y-4">
        {aiInsights.map(insight => (
          <div
            key={insight.id}
            className={`p-6 rounded-2xl glass-panel border transition-all ${
              insight.riskLevel === 'URGENT REVIEW'
                ? 'border-rose-500/60 bg-rose-950/10'
                : 'border-amber-500/40 bg-amber-950/10'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`font-extrabold px-3 py-1 rounded-md text-xs uppercase border ${
                      insight.riskLevel === 'URGENT REVIEW'
                        ? 'bg-rose-600 text-white border-rose-500 shadow-glow-rose'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    }`}
                  >
                    ⚠ ATTENTION LEVEL: {insight.riskLevel}
                  </span>
                  <span className="text-xs font-bold text-slate-400 font-mono">Confidence: {insight.confidence}</span>
                </div>
                <h2 className="font-heading text-lg font-bold text-white mt-1">
                  {insight.veteranName}
                </h2>
                <p className="text-[11px] text-slate-400 font-mono">Timestamp Flagged: {insight.timestamp}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {!insight.acknowledgedByCounselor ? (
                  <button
                    onClick={() => acknowledgeInsight(insight.id)}
                    className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-xs shadow-glow-teal flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Acknowledge Alert
                  </button>
                ) : (
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                    <CheckCircle2 className="w-4 h-4" /> Acknowledged
                  </span>
                )}

                <button
                  onClick={() => {
                    setActiveVeteranId(insight.veteranId);
                    setActiveScreen('veteran-detail');
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-1"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* DETECTED CHANGES & EXPLANATION as per section 8 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-xs">
              <div className="space-y-2 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <div className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
                  Detected Longitudinal Changes:
                </div>
                <ul className="space-y-1.5 text-slate-300">
                  {insight.detectedChanges.map((change, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold">•</span>
                      <span>{change}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <div className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
                  Recommended Counselor Actions:
                </div>
                <ul className="space-y-1.5 text-slate-300">
                  {insight.recommendedActions.map((action, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-teal-400 font-bold">→</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

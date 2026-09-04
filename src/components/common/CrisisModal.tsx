import React, { useState } from 'react';
import { X, PhoneCall, ShieldAlert, HeartHandshake, Wind, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CrisisModal: React.FC = () => {
  const { isCrisisModalOpen, setIsCrisisModalOpen, currentVeteranUser } = useApp();
  const [requestedCallback, setRequestedCallback] = useState(false);
  const [activeGrounding, setActiveGrounding] = useState(false);

  if (!isCrisisModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-rose-500/40 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative text-slate-100 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-bold text-white flex items-center gap-2">
                24/7 Veteran Crisis & Support Network
              </h2>
              <p className="text-xs text-rose-300 font-medium">
                You are not alone. Immediate confidential support is available 24 hours a day.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCrisisModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Immediate Emergency Callouts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href="tel:14416"
            className="flex items-center gap-3 p-4 rounded-xl bg-rose-950/50 border border-rose-800/80 hover:border-rose-500 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-rose-600 text-white flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-rose-200">Tele-MANAS (India Veteran Helpline)</div>
              <div className="text-lg font-extrabold text-white font-mono">14416</div>
              <div className="text-[10px] text-rose-400">Toll-free 24/7 Confidential</div>
            </div>
          </a>

          <a
            href="tel:988"
            className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-emerald-500 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-200">Veterans Crisis Line</div>
              <div className="text-lg font-extrabold text-white font-mono">Dial 988 (Press 1)</div>
              <div className="text-[10px] text-slate-400">Free, confidential support</div>
            </div>
          </a>
        </div>

        {/* Rapid Actions */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Immediate Supportive Actions
          </div>

          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-bold text-slate-200">Request Emergency Callback from Assigned Counselor</span>
              </div>
              {requestedCallback ? (
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Priority Alert Sent
                </span>
              ) : (
                <button
                  onClick={() => setRequestedCallback(true)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
                >
                  Notify {currentVeteranUser.assignedCounselorName || 'Counselor'}
                </button>
              )}
            </div>
            {requestedCallback && (
              <p className="text-[11px] text-emerald-300 bg-emerald-950/40 p-2 rounded border border-emerald-800">
                Dr. Ananya Nair has been alerted with top priority to call your registered phone number.
              </p>
            )}
          </div>

          {/* Quick Grounding Exercise */}
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wind className="w-5 h-5 text-teal-400 animate-pulse" />
                <div>
                  <div className="text-xs font-bold text-slate-200">60-Second De-escalation Grounding</div>
                  <div className="text-[10px] text-slate-400">Box Breathing (4-4-4-4 technique)</div>
                </div>
              </div>
              <button
                onClick={() => setActiveGrounding(!activeGrounding)}
                className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold transition-colors"
              >
                {activeGrounding ? 'Pause Exercise' : 'Start Grounding'}
              </button>
            </div>

            {activeGrounding && (
              <div className="p-4 rounded-xl bg-teal-950/50 border border-teal-800 text-center space-y-2 animate-fadeIn">
                <div className="w-16 h-16 rounded-full border-4 border-teal-400 border-t-transparent mx-auto animate-spin" />
                <div className="text-xs font-bold text-teal-200">Inhale deeply through nose (4s) ... Hold (4s) ... Exhale slowly (4s)</div>
                <div className="text-[10px] text-slate-400">Feel your feet firmly on the ground. You are safe in this moment.</div>
              </div>
            )}
          </div>
        </div>

        {/* Safety Disclaimer */}
        <div className="text-[10px] text-slate-400 leading-relaxed border-t border-slate-800 pt-3">
          <strong className="text-slate-300">Safety Notice:</strong> VALOR is a supportive monitoring tool and does not provide automated diagnostic or emergency dispatch services. If you or someone you know is in immediate life-threatening danger, please contact local emergency emergency services (112 / 911) immediately.
        </div>
      </div>
    </div>
  );
};

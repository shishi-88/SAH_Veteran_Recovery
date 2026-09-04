import React from 'react';
import { X, Clock, Award, Play, Shield, Wind, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TaskDetailsModal: React.FC = () => {
  const { activeTaskDetail, setActiveTaskDetail, setTaskToComplete, setIsCompletionModalOpen } = useApp();

  if (!activeTaskDetail) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-slate-100 space-y-6">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {activeTaskDetail.category} Activity
            </span>
            <h2 className="font-heading text-xl font-bold text-white mt-1">{activeTaskDetail.title}</h2>
          </div>
          <button
            onClick={() => setActiveTaskDetail(null)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Task Info Specs */}
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-300 bg-slate-800/60 p-3 rounded-xl border border-slate-700/80">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>Duration: {activeTaskDetail.durationMinutes} mins</span>
          </div>
          <div className="w-px h-4 bg-slate-700" />
          <div className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Reward: +{activeTaskDetail.xpReward} Recovery XP</span>
          </div>
        </div>

        {/* Description & Clinical Intent */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-200">Activity Instructions</div>
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            {activeTaskDetail.description}
          </p>

          <div className="p-4 rounded-xl bg-teal-950/30 border border-teal-800/50 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-teal-300">
              <Wind className="w-4 h-4 text-teal-400" />
              <span>Grounding & Mindfulness Tip</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Focus entirely on your immediate sensory surroundings (textures, sounds, breathing rhythm). If your mind wanders to stressful memories, gently anchor your attention back to your breath without self-judgment.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={() => setActiveTaskDetail(null)}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
          >
            Close
          </button>

          {activeTaskDetail.status !== 'completed' && (
            <button
              onClick={() => {
                const target = activeTaskDetail;
                setActiveTaskDetail(null);
                setTaskToComplete(target);
                setIsCompletionModalOpen(true);
              }}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-glow-emerald transition-all"
            >
              <Play className="w-4 h-4 fill-current" /> Mark as Completed
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

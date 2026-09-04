import React, { useState } from 'react';
import { X, CheckCircle2, Sparkles, Smile, Flame, Award } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TaskCompletionModal: React.FC = () => {
  const {
    isCompletionModalOpen,
    setIsCompletionModalOpen,
    taskToComplete,
    setTaskToComplete,
    completeTask
  } = useApp();

  const [effortRating, setEffortRating] = useState<number>(3);
  const [moodImpact, setMoodImpact] = useState<string>('Calmer');
  const [notes, setNotes] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isCompletionModalOpen || !taskToComplete) return null;

  const moodOptions = ['Calmer', 'Energized', 'Neutral', 'Challenging'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    setTimeout(() => {
      completeTask(taskToComplete.id, effortRating, moodImpact, notes);
      setSubmitted(false);
      setIsCompletionModalOpen(false);
      setTaskToComplete(null);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-slate-100 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-3">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">
              Log Activity Completion
            </span>
            <h2 className="font-heading text-lg font-bold text-white mt-0.5">{taskToComplete.title}</h2>
          </div>
          <button
            onClick={() => setIsCompletionModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-4 animate-scaleUp">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-glow-emerald">
              <Sparkles className="w-8 h-8 animate-spin-slow" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-white font-heading">Small Steps Count!</h3>
              <p className="text-xs text-emerald-400 font-bold">
                +{taskToComplete.xpReward} Recovery XP Added to Profile
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Effort Rating 1-5 */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-200 block">
                How much effort did this activity take today? (1 = Light, 5 = Very High)
              </label>
              <div className="flex items-center justify-between gap-2">
                {[1, 2, 3, 4, 5].map(num => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setEffortRating(num)}
                    className={`flex-1 py-2 rounded-xl text-xs font-extrabold border transition-all ${
                      effortRating === num
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-glow-emerald'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Mood Impact */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-200 block">
                How do you feel after completing this?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {moodOptions.map(mood => (
                  <button
                    key={mood}
                    type="button"
                    onClick={() => setMoodImpact(mood)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                      moodImpact === mood
                        ? 'bg-teal-500/20 border-teal-400 text-teal-300 shadow-sm'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </div>

            {/* Reflection / Notes */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-200 block">
                Personal Reflection / Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="e.g., Felt calmer during walking. Sunlight was helpful."
                rows={2}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsCompletionModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-glow-emerald flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" /> Save & Log +{taskToComplete.xpReward} XP
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

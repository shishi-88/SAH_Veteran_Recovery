import React, { useState } from 'react';
import { Sliders, Plus, CheckCircle2, RefreshCw, Shield, Sparkles, HeartHandshake } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TaskCategory } from '../../types';

export const TaskManagementView: React.FC = () => {
  const { currentVeteranUser, tasks, assignCustomTask, activeVeteranId } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<TaskCategory>('Mental');
  const [description, setDescription] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(10);
  const [xpReward, setXpReward] = useState(25);
  const [recommendedTime, setRecommendedTime] = useState('Afternoon');
  const [addedSuccess, setAddedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    assignCustomTask(activeVeteranId, {
      title,
      category,
      description,
      durationMinutes,
      xpReward,
      recommendedTime
    });

    setAddedSuccess(true);
    setTitle('');
    setDescription('');
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4 animate-fadeIn">
      {/* Header */}
      <div className="p-6 rounded-2xl glass-panel border border-teal-500/30 flex items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-teal-400">Personalization Engine</span>
          <h1 className="font-heading text-2xl font-bold text-white mt-1">PERSONALIZED TASK ADJUSTMENT TOOL</h1>
          <p className="text-xs text-slate-400 mt-1">
            Adapting task difficulty for {currentVeteranUser.name}. System adjusts load without creating undue pressure.
          </p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold shrink-0">
          <Sliders className="w-6 h-6" />
        </div>
      </div>

      {/* Task Adaptation Guidance Banner */}
      <div className="p-4 rounded-xl bg-teal-950/30 border border-teal-800/50 text-xs text-slate-300 space-y-1">
        <div className="font-bold text-teal-300 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-teal-400" /> AI Adaptation Advice:
        </div>
        <p className="leading-relaxed">
          If a veteran repeatedly skips high-intensity tasks, consider assigning smaller 2-to-5 minute micro-grounding activities (e.g. "Sit near window" instead of "30-min walk").
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form to Assign New Custom Task */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="font-heading text-lg font-bold text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-emerald-400" /> Assign Custom Micro-Intervention
            </h2>
          </div>

          {addedSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Activity successfully pushed to veteran's daily journey!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-200">Activity Title</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. 5-Min Quiet Garden Reflection"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-teal-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200">Category</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as TaskCategory)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-teal-500"
                >
                  <option value="Physical">Physical</option>
                  <option value="Mental">Mental</option>
                  <option value="Social">Social</option>
                  <option value="Nature">Nature</option>
                  <option value="Routine">Routine</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200">Time of Day</label>
                <select
                  value={recommendedTime}
                  onChange={e => setRecommendedTime(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-teal-500"
                >
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-200">Instructions & Clinical Intent</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Clear, non-pressuring instructions..."
                rows={3}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-teal-500"
                required
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-extrabold text-xs shadow-glow-teal flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Push Task to Veteran
              </button>
            </div>
          </form>
        </div>

        {/* Current Active Tasks List for Veteran */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="font-heading text-lg font-bold text-white">Current Daily Tasks for {currentVeteranUser.name}</h2>
          </div>

          <div className="space-y-2.5">
            {tasks.map(t => (
              <div key={t.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs flex items-center justify-between">
                <div>
                  <div className="font-bold text-white flex items-center gap-2">
                    <span>{t.title}</span>
                    <span className="text-[9px] uppercase font-bold text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                      {t.category}
                    </span>
                  </div>
                  <div className="text-slate-400 text-[11px] mt-0.5">{t.durationMinutes} mins | +{t.xpReward} XP</div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded capitalize ${t.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                  {t.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Sparkles, CheckCircle2, Circle, Flame, Award, Calendar, ArrowRight, Play, Info, Heart, Shield, RefreshCw } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HomeTodayJourney: React.FC = () => {
  const {
    currentVeteranUser,
    currentVeteranProfile,
    tasks,
    setActiveTaskDetail,
    setTaskToComplete,
    setIsCompletionModalOpen,
    setActiveScreen,
    skipTask
  } = useApp();

  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const totalCount = tasks.length;
  const totalXPEarned = tasks
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.xpReward, 0);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Physical': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'Mental': return 'text-teal-400 bg-teal-400/10 border-teal-400/20';
      case 'Social': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      case 'Nature': return 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20';
      case 'Routine': return 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4 animate-fadeIn">
      {/* Top Welcome Banner */}
      <div className="p-6 rounded-2xl glass-card-accent flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> Personal Recovery Companion
          </div>
          <h1 className="font-heading text-2xl font-bold text-white">
            Welcome back, {currentVeteranUser.name}
          </h1>
          <p className="text-xs text-slate-300 italic">
            "Small steps count. Consistency builds long-term peace."
          </p>
        </div>

        {/* Level & Streak Stats */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/80 flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400 fill-amber-400 animate-pulse" />
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Recovery Streak</div>
              <div className="text-sm font-extrabold text-amber-400">{currentVeteranProfile.streakDays} Days</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/80 flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" />
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Total Points</div>
              <div className="text-sm font-extrabold text-emerald-400">{currentVeteranProfile.totalXP} XP</div>
            </div>
          </div>
        </div>
      </div>

      {/* TODAY'S RECOVERY JOURNEY PROGRESS CARD */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Today's Recovery Milestone Track
            </span>
            <h2 className="font-heading text-xl font-bold text-white mt-0.5">
              TODAY'S RECOVERY JOURNEY
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-extrabold font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
              {completedCount} / {totalCount} Completed
            </span>
            <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-lg border border-amber-400/20">
              +{totalXPEarned} XP Earned
            </span>
          </div>
        </div>

        {/* Visual Node Journey Track */}
        <div className="py-4">
          <div className="relative flex items-center justify-between max-w-md mx-auto">
            {/* Connecting Track Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-800 -translate-y-1/2 -z-0" />
            <div
              className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 -translate-y-1/2 transition-all duration-500 -z-0"
              style={{ width: `${(completedCount / Math.max(1, totalCount - 1)) * 100}%` }}
            />

            {/* Nodes */}
            {tasks.map((t, idx) => {
              const isDone = t.status === 'completed';
              return (
                <div key={t.id} className="relative z-10 flex flex-col items-center group">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                      isDone
                        ? 'bg-emerald-500 text-slate-950 ring-4 ring-emerald-500/20 shadow-glow-emerald scale-110'
                        : 'bg-slate-900 border-2 border-slate-700 text-slate-400'
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="w-5 h-5 stroke-[2.5]" /> : idx + 1}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-2 font-medium max-w-[60px] text-center truncate">
                    {t.title.split(' ')[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>Assigned Personalized Activities</span>
            <span>Recommended Time</span>
          </div>

          {tasks.map(task => {
            const isCompleted = task.status === 'completed';
            const isSkipped = task.status === 'skipped';

            return (
              <div
                key={task.id}
                className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  isCompleted
                    ? 'bg-emerald-950/20 border-emerald-800/40 opacity-90'
                    : isSkipped
                    ? 'bg-slate-900/40 border-slate-800/60 opacity-60'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Left Task Meta */}
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => {
                      if (!isCompleted) {
                        setTaskToComplete(task);
                        setIsCompletionModalOpen(true);
                      }
                    }}
                    className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isCompleted
                        ? 'text-emerald-400'
                        : 'text-slate-600 hover:text-emerald-400'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 fill-emerald-500/20" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded border uppercase ${getCategoryColor(task.category)}`}>
                        {task.category}
                      </span>
                      {task.isCustomCounselorAssigned && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                          Counselor Recommended
                        </span>
                      )}
                    </div>
                    <h3 className={`text-sm font-bold ${isCompleted ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                      {task.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-1">{task.description}</p>
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 border-slate-800 pt-2 sm:pt-0">
                  <span className="text-[11px] font-semibold text-amber-400 bg-amber-400/10 px-2 py-1 rounded border border-amber-400/20 shrink-0">
                    +{task.xpReward} XP
                  </span>

                  <button
                    onClick={() => setActiveTaskDetail(task)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 transition-colors shrink-0"
                    title="View instructions & grounding tips"
                  >
                    <Info className="w-4 h-4" />
                  </button>

                  {!isCompleted && !isSkipped && (
                    <>
                      <button
                        onClick={() => {
                          setTaskToComplete(task);
                          setIsCompletionModalOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-glow-emerald flex items-center gap-1 transition-all"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" /> Complete
                      </button>
                      <button
                        onClick={() => skipTask(task.id, 'Deferred by veteran')}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 hover:text-rose-300 text-slate-400 text-xs font-medium transition-colors"
                      >
                        Skip
                      </button>
                    </>
                  )}

                  {isCompleted && (
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-3 py-1 rounded-lg">
                      <CheckCircle2 className="w-4 h-4" /> Logged ({task.completedAt})
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weekly Check-in Prompt Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-950/60 to-slate-900 border border-teal-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Periodic Well-being Check-in Due</h3>
            <p className="text-xs text-slate-400">
              A 2-minute periodic check-in helps Dr. Ananya Nair adjust your recovery plan.
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveScreen('weekly-checkin')}
          className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-extrabold flex items-center gap-2 shrink-0 transition-colors shadow-glow-teal"
        >
          <span>Take Check-in Survey</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

import React from 'react';
import { Trophy, Flame, Award, Shield, CheckCircle2, Trees, Wind, Star, Lock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProgressJourneyView: React.FC = () => {
  const { currentVeteranProfile } = useApp();

  const allBadges = [
    { id: 'b1', title: '7-Day Anchor', description: 'Completed morning stretch 7 days in a row', icon: Flame, unlocked: true },
    { id: 'b2', title: 'Nature Connection', description: 'Logged over 2 hours of outdoor garden time', icon: Trees, unlocked: true },
    { id: 'b3', title: 'Mindful Guardian', description: 'Completed 10 breathing exercises', icon: Wind, unlocked: true },
    { id: 'b4', title: 'Comrade Connection', description: 'Reached out to a fellow service member', icon: Trophy, unlocked: false },
    { id: 'b5', title: '30-Day Master', description: 'Sustained continuous recovery logging for 1 month', icon: Award, unlocked: false }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl glass-panel border border-amber-500/30 flex items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
            Personal Growth & Milestones
          </span>
          <h1 className="font-heading text-2xl font-bold text-white mt-1">
            Recovery Journey & Achievements
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Celebrating consistent personal steps toward physical and mental resilience.
          </p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold shrink-0">
          <Trophy className="w-6 h-6" />
        </div>
      </div>

      {/* Gamification Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl glass-panel border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Flame className="w-6 h-6 fill-current" />
          </div>
          <div>
            <div className="text-xs font-medium text-slate-400">Current Streak</div>
            <div className="text-2xl font-extrabold text-white font-heading">{currentVeteranProfile.streakDays} Days</div>
            <div className="text-[10px] text-amber-400 font-semibold">Active Daily Anchor</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-medium text-slate-400">Recovery Level</div>
            <div className="text-2xl font-extrabold text-white font-heading">Level {currentVeteranProfile.level}</div>
            <div className="text-[10px] text-emerald-400 font-semibold">{currentVeteranProfile.totalXP} Total XP</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
            <Star className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-medium text-slate-400">Unlocked Badges</div>
            <div className="text-2xl font-extrabold text-white font-heading">
              {currentVeteranProfile.badges.length} / {allBadges.length}
            </div>
            <div className="text-[10px] text-teal-400 font-semibold">Milestones Achieved</div>
          </div>
        </div>
      </div>

      {/* TASK PERFORMANCE TRACKING - Category Breakdown as prompt section 5 */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
        <div className="border-b border-slate-800 pb-3">
          <h2 className="font-heading text-lg font-bold text-white">Task Engagement Baseline Performance</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Focuses on consistency relative to your own baseline (no public comparison or competition).
          </p>
        </div>

        <div className="space-y-4 font-mono text-xs">
          <div>
            <div className="flex items-center justify-between text-slate-200 mb-1 font-sans font-bold">
              <span>Walking & Physical Routine</span>
              <span className="text-emerald-400">80%</span>
            </div>
            <div className="text-emerald-400 tracking-wider">████████░░ 80%</div>
          </div>

          <div>
            <div className="flex items-center justify-between text-slate-200 mb-1 font-sans font-bold">
              <span>Breathing & Mindfulness Exercises</span>
              <span className="text-teal-400">60%</span>
            </div>
            <div className="text-teal-400 tracking-wider">██████░░░░ 60%</div>
          </div>

          <div>
            <div className="flex items-center justify-between text-slate-200 mb-1 font-sans font-bold">
              <span>Social Activities & Outreach</span>
              <span className="text-amber-400">40%</span>
            </div>
            <div className="text-amber-400 tracking-wider">████░░░░░░ 40%</div>
          </div>
        </div>
      </div>

      {/* UNLOCKED BADGES GRID */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
        <div className="border-b border-slate-800 pb-3">
          <h2 className="font-heading text-lg font-bold text-white">Personal Recovery Badges</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allBadges.map(badge => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-xl border flex items-start gap-3 transition-all ${
                  badge.unlocked
                    ? 'bg-emerald-950/20 border-emerald-500/40'
                    : 'bg-slate-950/40 border-slate-800 opacity-50'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    badge.unlocked
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-slate-800 text-slate-600'
                  }`}
                >
                  {badge.unlocked ? <Icon className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                    {badge.title}
                    {badge.unlocked && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{badge.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

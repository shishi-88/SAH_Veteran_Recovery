import React, { useState } from 'react';
import { CalendarCheck, CheckCircle2, ArrowRight, HeartHandshake, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WeeklyCheckInModal: React.FC = () => {
  const { submitCheckIn, setActiveScreen } = useApp();

  const [overallFeeling, setOverallFeeling] = useState<'Good' | 'Okay' | 'Difficult' | 'Very difficult'>('Okay');
  const [sleepRating, setSleepRating] = useState<'Restful' | 'Interrupted' | 'Insomnia / Poor'>('Restful');
  const [socialConnectedness, setSocialConnectedness] = useState<'Connected' | 'Neutral' | 'Isolated'>('Connected');
  const [stressLevel, setStressLevel] = useState<'Low' | 'Moderate' | 'High' | 'Severe'>('Low');
  const [needsSupport, setNeedsSupport] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitCheckIn({
      overallFeeling,
      sleepRating,
      socialConnectedness,
      stressLevel,
      needsSupport,
      notes
    });
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto py-4 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="p-6 rounded-2xl glass-panel border border-teal-500/30 flex items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
            Periodic Survey Module
          </span>
          <h1 className="font-heading text-2xl font-bold text-white mt-1">
            WEEKLY CHECK-IN
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Short 2-minute evaluation to keep your clinical counselor updated on your trajectory.
          </p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold shrink-0">
          <CalendarCheck className="w-6 h-6" />
        </div>
      </div>

      {submitted ? (
        <div className="p-8 rounded-2xl glass-panel border border-emerald-500/40 text-center space-y-4 animate-scaleUp">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-glow-emerald">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="font-heading text-xl font-bold text-white">Check-in Submitted</h2>
          <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
            Thank you for providing your update. Your counselor Dr. Ananya Nair has received your check-in notes.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setActiveScreen('home')}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-glow-emerald inline-flex items-center gap-2"
            >
              <span>Return to Today's Journey</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-6">
          {/* Question 1: Feeling */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-100 block">
              1. How have you been feeling overall this week?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { label: 'Good', emoji: '😊', value: 'Good' },
                { label: 'Okay', emoji: '🙂', value: 'Okay' },
                { label: 'Difficult', emoji: '😐', value: 'Difficult' },
                { label: 'Very difficult', emoji: '😟', value: 'Very difficult' }
              ].map(item => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setOverallFeeling(item.value as any)}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                    overallFeeling === item.value
                      ? 'bg-teal-500/20 border-teal-400 text-teal-300 shadow-glow-teal'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="text-xl">{item.emoji}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Question 2: Sleep */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-100 block">
              2. How has your sleep quality been?
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Restful', 'Interrupted', 'Insomnia / Poor'].map(option => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSleepRating(option as any)}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
                    sleepRating === option
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Question 3: Social */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-100 block">
              3. How connected have you felt to family or comrades?
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Connected', 'Neutral', 'Isolated'].map(option => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSocialConnectedness(option as any)}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
                    socialConnectedness === option
                      ? 'bg-indigo-500/20 border-indigo-400 text-indigo-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Question 4: Stress */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-100 block">
              4. How stressful has this week been?
            </label>
            <div className="grid grid-cols-4 gap-2">
              {['Low', 'Moderate', 'High', 'Severe'].map(option => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setStressLevel(option as any)}
                  className={`py-2.5 px-2 rounded-xl border text-xs font-semibold transition-all text-center ${
                    stressLevel === option
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Question 5: Additional Support Prompt */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <label className="text-xs font-bold text-slate-100 block">
              5. Do you feel like you need additional support from your counselor right now?
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setNeedsSupport(true)}
                className={`px-5 py-2.5 rounded-xl border text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                  needsSupport
                    ? 'bg-rose-600 text-white border-rose-500 shadow-glow-rose'
                    : 'bg-slate-800 border-slate-700 text-slate-300'
                }`}
              >
                <HeartHandshake className="w-4 h-4" /> Yes, Request Callback
              </button>

              <button
                type="button"
                onClick={() => setNeedsSupport(false)}
                className={`px-5 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                  !needsSupport
                    ? 'bg-emerald-600 text-white border-emerald-500'
                    : 'bg-slate-800 border-slate-700 text-slate-300'
                }`}
              >
                No, I am managing okay
              </button>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-glow-emerald flex items-center gap-2"
            >
              <span>Submit Weekly Check-in</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

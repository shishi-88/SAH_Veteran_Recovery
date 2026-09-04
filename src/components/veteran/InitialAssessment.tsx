import React, { useState } from 'react';
import { ClipboardList, ArrowRight, ArrowLeft, CheckCircle2, Shield, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const InitialAssessment: React.FC = () => {
  const { setActiveScreen } = useApp();
  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState({
    wellBeing: 'Moderate',
    sleepQuality: 'Interrupted',
    stressLevel: 'Moderate',
    mood: 'Okay',
    socialConnectedness: 'Low',
    routineStability: 'Low',
    physicalActivity: 'Moderate',
    outdoorComfort: 'High',
    taskAbility: 'Moderate',
    supportAreas: ['Sleep Routine', 'Stress Reduction', 'Nature Walking']
  });

  const questions = [
    {
      key: 'wellBeing',
      title: 'General Well-being',
      subtitle: 'How would you describe your overall physical and mental state over the past two weeks?',
      options: ['High / Energetic', 'Moderate / Steady', 'Low / Depleted', 'Variable']
    },
    {
      key: 'sleepQuality',
      title: 'Sleep Consistency & Quality',
      subtitle: 'How consistently are you able to fall and stay asleep at night?',
      options: ['Restful (7+ hrs)', 'Interrupted / Night Waking', 'Difficulty Falling Asleep', 'Severe Insomnia']
    },
    {
      key: 'stressLevel',
      title: 'Current Stress Index',
      subtitle: 'How frequently do you feel overwhelmed or tense during daily tasks?',
      options: ['Low / Manageable', 'Moderate / Intermittent', 'High / Frequent', 'Severe / Overwhelming']
    },
    {
      key: 'mood',
      title: 'Emotional Baseline',
      subtitle: 'Which option best reflects your predominant emotional state recently?',
      options: ['Positive & Calm', 'Okay / Neutral', 'Somewhat Low or Anxious', 'Very Difficult']
    },
    {
      key: 'socialConnectedness',
      title: 'Social Interaction Comfort',
      subtitle: 'How connected do you feel to family, friends, or fellow service members?',
      options: ['Very Connected', 'Moderately Connected', 'Low / Prefer Solitude', 'Feeling Isolated']
    },
    {
      key: 'routineStability',
      title: 'Daily Routine Structure',
      subtitle: 'Do you maintain fixed meal, wake-up, and daily activity times?',
      options: ['Very Structured', 'Moderately Consistent', 'Low / Irregular Times', 'Unstructured']
    },
    {
      key: 'physicalActivity',
      title: 'Physical Movement Level',
      subtitle: 'What level of physical stretching, walking, or exercise feels comfortable right now?',
      options: ['Light Stretching Only', 'Moderate Walking (15-30 mins)', 'Vigorous Exercise', 'Minimal Movement']
    },
    {
      key: 'outdoorComfort',
      title: 'Comfort with Nature & Outdoor Spaces',
      subtitle: 'How comfortable do you feel spending quiet time in outdoor gardens or parks?',
      options: ['High / Very Restorative', 'Moderate / Safe Quiet Places', 'Low / Prefer Indoors', 'Unsure']
    },
    {
      key: 'taskAbility',
      title: 'Daily Task Execution',
      subtitle: 'How achievable do routine daily responsibilities feel right now?',
      options: ['Easily Achievable', 'Achievable with Pacing', 'Challenging', 'Overwhelming']
    }
  ];

  const handleOptionSelect = (key: string, val: string) => {
    setFormData(prev => ({ ...prev, [key]: val }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Complete Onboarding Assessment -> Navigate to Personalized Profile
      setActiveScreen('profile-view');
    }
  };

  const currentQ = questions[currentStep];

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-4 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl glass-panel border border-emerald-500/30 flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-xs uppercase tracking-wider mb-1">
            <ClipboardList className="w-4 h-4" /> Structured Baseline Onboarding
          </div>
          <h1 className="font-heading text-2xl font-bold text-white">Initial Assessment & Personalization</h1>
          <p className="text-xs text-slate-400 mt-1">
            This survey creates your baseline recovery profile. Answers are strictly private and shared only with your assigned caregiver.
          </p>
        </div>
        <div className="text-right hidden sm:block">
          <div className="text-2xl font-extrabold font-mono text-emerald-400">
            {currentStep + 1} <span className="text-slate-500 text-sm">/ {questions.length}</span>
          </div>
          <div className="text-[10px] text-slate-400 uppercase font-bold">Progress</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
        <div
          className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-300"
          style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="p-8 rounded-2xl glass-panel border border-slate-800 space-y-6">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
            Step {currentStep + 1} of {questions.length}
          </span>
          <h2 className="font-heading text-xl font-bold text-white mt-1">{currentQ.title}</h2>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">{currentQ.subtitle}</p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {currentQ.options.map(option => {
            const isSelected = (formData as any)[currentQ.key] === option;
            return (
              <button
                key={option}
                onClick={() => handleOptionSelect(currentQ.key, option)}
                className={`p-4 rounded-xl text-left border text-xs font-semibold transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-glow-emerald'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800'
                }`}
              >
                <span>{option}</span>
                {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
          <button
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors ${
              currentStep === 0
                ? 'text-slate-600 cursor-not-allowed'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <ArrowLeft className="w-4 h-4" /> Previous
          </button>

          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-glow-emerald flex items-center gap-2 transition-all"
          >
            <span>{currentStep === questions.length - 1 ? 'Generate Recovery Profile' : 'Next Question'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Settings, User, Shield, Bell, Calendar, Lock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProfileSettingsView: React.FC = () => {
  const { currentVeteranUser, currentVeteranProfile } = useApp();

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-4 animate-fadeIn">
      <div className="p-6 rounded-2xl glass-panel border border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">User Configuration</span>
          <h1 className="font-heading text-2xl font-bold text-white mt-1">Profile & Settings</h1>
          <p className="text-xs text-slate-400 mt-1">Manage check-in frequencies, notification reminders, and privacy preferences.</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
          <Settings className="w-5 h-5" />
        </div>
      </div>

      <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-6">
        <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
          <img
            src={currentVeteranUser.avatarUrl}
            alt="Avatar"
            className="w-16 h-16 rounded-full border-2 border-emerald-500 object-cover"
          />
          <div>
            <h2 className="font-heading text-lg font-bold text-white">{currentVeteranUser.name}</h2>
            <p className="text-xs text-slate-400">{currentVeteranUser.rank} | {currentVeteranProfile.serviceBranch}</p>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 mt-1 inline-block">
              {currentVeteranUser.email}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <span className="font-bold text-slate-200">Periodic Check-in Frequency</span>
            <span className="font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded">Every {currentVeteranProfile.checkInFrequencyDays} Days</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <span className="font-bold text-slate-200">Daily Activity Push Reminders</span>
            <span className="font-bold text-emerald-400">Enabled (08:00 AM)</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <span className="font-bold text-slate-200">Data Access & Counselor Scope</span>
            <span className="text-slate-400">Dr. Ananya Nair (Read/Write)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

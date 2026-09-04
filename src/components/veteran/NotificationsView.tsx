import React from 'react';
import { Bell, CheckCircle2, MessageCircle, CalendarCheck, Shield } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NotificationsView: React.FC = () => {
  const { notifications } = useApp();

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-4 animate-fadeIn">
      <div className="p-6 rounded-2xl glass-panel border border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Activity Center</span>
          <h1 className="font-heading text-2xl font-bold text-white mt-1">Notifications & Counselor Messages</h1>
          <p className="text-xs text-slate-400 mt-1">Timely task anchors and care team communications.</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
          <Bell className="w-5 h-5" />
        </div>
      </div>

      <div className="space-y-3">
        {notifications.map(notif => (
          <div key={notif.id} className="p-4 rounded-xl glass-panel border border-slate-800 flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-slate-800 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
              {notif.type === 'counselor' ? <MessageCircle className="w-4 h-4 text-teal-400" /> : <Bell className="w-4 h-4" />}
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-100">{notif.title}</span>
                <span className="text-[10px] text-slate-500">{notif.timestamp}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{notif.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

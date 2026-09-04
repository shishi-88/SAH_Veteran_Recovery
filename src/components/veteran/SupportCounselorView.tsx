import React, { useState } from 'react';
import { MessageCircle, PhoneCall, HeartHandshake, Send, ShieldAlert, CheckCircle2, UserCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SupportCounselorView: React.FC = () => {
  const { currentVeteranUser, setIsCrisisModalOpen } = useApp();
  const [messages, setMessages] = useState<{ sender: string; text: string; time: string }[]>([
    {
      sender: 'Dr. Ananya Nair',
      text: 'Good morning Col. Sharma. I reviewed your 14-day streak on morning walks. Outstanding progress! How is your sleep holding up?',
      time: 'Yesterday 09:15 AM'
    }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setMessages(prev => [
      ...prev,
      { sender: 'You', text: inputText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    setInputText('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4 animate-fadeIn">
      {/* Header */}
      <div className="p-6 rounded-2xl glass-panel border border-teal-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-teal-400">Clinical Support Hub</span>
          <h1 className="font-heading text-2xl font-bold text-white mt-1">Counselor Contact & Outreach</h1>
          <p className="text-xs text-slate-400 mt-1">Direct confidential communication with your assigned clinical caregiver.</p>
        </div>
        <button
          onClick={() => setIsCrisisModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs shadow-glow-rose flex items-center gap-1.5 shrink-0"
        >
          <ShieldAlert className="w-4 h-4" /> 24/7 Crisis Hotline
        </button>
      </div>

      {/* Counselor Profile & Messaging Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Counselor Card */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <div className="text-center space-y-2">
            <img
              src="https://images.unsplash.com/photo-1594824813566-88855ce78905?auto=format&fit=crop&q=80&w=200"
              alt="Counselor Avatar"
              className="w-20 h-20 rounded-full border-2 border-teal-500 object-cover mx-auto shadow-glow-teal"
            />
            <div>
              <h3 className="font-heading font-bold text-base text-white">Dr. Ananya Nair, MD</h3>
              <p className="text-xs text-teal-400 font-semibold">Chief Clinical Supervisor</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Amrita Veteran Health Care</p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-2 text-xs text-slate-300">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Status:</span>
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Available
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Next Review:</span>
              <span className="font-mono text-slate-200">Sep 08, 2026</span>
            </div>
          </div>

          <button
            onClick={() => alert('Priority Callback requested! Dr. Ananya Nair has been notified.')}
            className="w-full py-2.5 rounded-xl bg-teal-600/20 border border-teal-500/40 text-teal-300 font-bold text-xs hover:bg-teal-600 hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-4 h-4" /> Request Phone Callback
          </button>
        </div>

        {/* Messaging Area */}
        <div className="lg:col-span-2 p-6 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between h-[420px]">
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-teal-400" /> Clinical Conversation Thread
            </span>
            <span className="text-[10px] text-slate-400">Encrypted & Confidential</span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex flex-col ${m.sender === 'You' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-xs space-y-1 ${
                    m.sender === 'You'
                      ? 'bg-emerald-600 text-white rounded-br-none'
                      : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                  }`}
                >
                  <p>{m.text}</p>
                  <span className="text-[9px] opacity-75 block text-right font-mono">{m.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-slate-800 pt-3">
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="Write a message to Dr. Ananya Nair..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-teal-500"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0"
            >
              <Send className="w-4 h-4" /> Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

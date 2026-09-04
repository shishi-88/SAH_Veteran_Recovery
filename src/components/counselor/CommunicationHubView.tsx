import React, { useState } from 'react';
import { MessageCircle, Send, Plus, Calendar, UserCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CommunicationHubView: React.FC = () => {
  const { currentVeteranUser, counselorNotes, addCounselorNote, activeVeteranId } = useApp();
  const [noteText, setNoteText] = useState('');

  const vetNotes = counselorNotes.filter(n => n.veteranId === activeVeteranId);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    addCounselorNote(activeVeteranId, noteText);
    setNoteText('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4 animate-fadeIn">
      <div className="p-6 rounded-2xl glass-panel border border-teal-500/30 flex items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-teal-400">Clinical Outreach</span>
          <h1 className="font-heading text-2xl font-bold text-white mt-1">COUNSELOR NOTES & OUTREACH HUB</h1>
          <p className="text-xs text-slate-400 mt-1">Record clinical observations and log direct veteran contacts for {currentVeteranUser.name}.</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold shrink-0">
          <MessageCircle className="w-6 h-6" />
        </div>
      </div>

      <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
        <h2 className="font-heading text-lg font-bold text-white">Add New Clinical Log Entry</h2>
        <form onSubmit={handleAddNote} className="space-y-3">
          <textarea
            value={noteText}
            onChange={e => setNoteText(e.target.value)}
            placeholder="Type clinical progress notes, observations, or tele-consultation summary..."
            rows={3}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-teal-500"
            required
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-xs shadow-glow-teal flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" /> Save Clinical Note
            </button>
          </div>
        </form>
      </div>

      <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
        <h2 className="font-heading text-lg font-bold text-white">Historical Clinical Notes ({vetNotes.length})</h2>
        <div className="space-y-3">
          {vetNotes.map(n => (
            <div key={n.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-xs">
              <div className="flex items-center justify-between font-bold text-teal-300">
                <span>{n.authorName}</span>
                <span className="text-[10px] text-slate-500 font-mono">{n.date}</span>
              </div>
              <p className="text-slate-300 leading-relaxed">{n.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

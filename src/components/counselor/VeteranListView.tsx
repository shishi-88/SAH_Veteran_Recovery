import React, { useState } from 'react';
import { Users, Search, Filter, ArrowRight, Activity, Heart, Calendar, BrainCircuit } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const VeteranListView: React.FC = () => {
  const { allVeterans, setActiveVeteranId, setActiveScreen } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRisk, setFilterRisk] = useState<string>('ALL');

  const filtered = allVeterans.filter(v => {
    const matchesSearch = v.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          v.user.rank?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRisk = filterRisk === 'ALL' || v.profile.currentRiskLevel === filterRisk;
    return matchesSearch && matchesRisk;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 py-4 animate-fadeIn">
      {/* Header */}
      <div className="p-6 rounded-2xl glass-panel border border-teal-500/30 flex items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-teal-400">Directory Portal</span>
          <h1 className="font-heading text-2xl font-bold text-white mt-1">VETERAN CASELOAD DIRECTORY</h1>
          <p className="text-xs text-slate-400 mt-1">Search, filter, and inspect longitudinal wellness indicators for assigned veterans.</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold shrink-0">
          <Users className="w-6 h-6" />
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 rounded-2xl glass-panel border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by veteran name, rank, or unit..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 focus:outline-none focus:border-teal-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 text-xs">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          {['ALL', 'NORMAL', 'MONITOR', 'ATTENTION', 'URGENT REVIEW'].map(risk => (
            <button
              key={risk}
              onClick={() => setFilterRisk(risk)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all shrink-0 ${
                filterRisk === risk
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {risk}
            </button>
          ))}
        </div>
      </div>

      {/* Directory Table */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="p-3">Veteran Identifier</th>
                <th className="p-3">Status Flag</th>
                <th className="p-3">Physical Trend</th>
                <th className="p-3">Mental Trend</th>
                <th className="p-3">Last Check-in</th>
                <th className="p-3">AI Indicator Rationale</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filtered.map(v => (
                <tr key={v.user.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={v.user.avatarUrl}
                        alt={v.user.name}
                        className="w-9 h-9 rounded-full object-cover border border-slate-700"
                      />
                      <div>
                        <div className="font-bold text-white text-xs">{v.user.name}</div>
                        <div className="text-[10px] text-slate-400">{v.user.rank}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <span
                      className={`font-extrabold px-2.5 py-1 rounded text-[10px] uppercase border ${
                        v.profile.currentRiskLevel === 'NORMAL'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : v.profile.currentRiskLevel === 'MONITOR'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      }`}
                    >
                      {v.profile.currentRiskLevel}
                    </span>
                  </td>
                  <td className="p-3 font-semibold text-emerald-400">
                    <div className="flex items-center gap-1">
                      <Activity className="w-3.5 h-3.5" /> Stable (82%)
                    </div>
                  </td>
                  <td className="p-3 font-semibold text-teal-400">
                    <div className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5" />
                      {v.profile.currentRiskLevel === 'URGENT REVIEW' ? 'Needs Attention' : 'Steady'}
                    </div>
                  </td>
                  <td className="p-3 text-slate-400 font-mono">
                    2 days ago
                  </td>
                  <td className="p-3 text-slate-300 text-[11px]">
                    {v.profile.currentRiskLevel === 'URGENT REVIEW' ? (
                      <span className="text-rose-300 font-medium">Sharp drop in activity & social tasks</span>
                    ) : v.profile.currentRiskLevel === 'MONITOR' ? (
                      <span className="text-amber-300 font-medium">Social interaction down 40%</span>
                    ) : (
                      <span className="text-emerald-400">No baseline anomaly</span>
                    )}
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => {
                        setActiveVeteranId(v.user.id);
                        setActiveScreen('veteran-detail');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold text-[11px] inline-flex items-center gap-1 transition-colors"
                    >
                      <span>View Profile</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

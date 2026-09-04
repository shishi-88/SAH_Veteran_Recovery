import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  trendText?: string;
  colorTheme?: 'emerald' | 'amber' | 'rose' | 'teal' | 'indigo';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendText,
  colorTheme = 'emerald'
}) => {
  const themeStyles = {
    emerald: 'border-emerald-500/25 bg-emerald-500/5 text-emerald-400',
    amber: 'border-amber-500/25 bg-amber-500/5 text-amber-400',
    rose: 'border-rose-500/25 bg-rose-500/5 text-rose-400',
    teal: 'border-teal-500/25 bg-teal-500/5 text-teal-400',
    indigo: 'border-indigo-500/25 bg-indigo-500/5 text-indigo-400'
  };

  const iconStyles = {
    emerald: 'bg-emerald-500/20 text-emerald-400',
    amber: 'bg-amber-500/20 text-amber-400',
    rose: 'bg-rose-500/20 text-rose-400',
    teal: 'bg-teal-500/20 text-teal-400',
    indigo: 'bg-indigo-500/20 text-indigo-400'
  };

  return (
    <div className={`p-4 rounded-2xl glass-panel border ${themeStyles[colorTheme]} transition-all hover:scale-[1.01]`}>
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{title}</span>
          <div className="text-2xl font-extrabold text-white mt-1 font-heading">{value}</div>
        </div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconStyles[colorTheme]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {(subtitle || trendText) && (
        <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
          {subtitle && <span className="text-slate-400 text-[11px]">{subtitle}</span>}
          {trendText && (
            <span
              className={`flex items-center gap-1 font-semibold text-[11px] ${
                trend === 'up'
                  ? 'text-emerald-400'
                  : trend === 'down'
                  ? 'text-rose-400'
                  : 'text-slate-400'
              }`}
            >
              {trend === 'up' && <TrendingUp className="w-3.5 h-3.5" />}
              {trend === 'down' && <TrendingDown className="w-3.5 h-3.5" />}
              {trend === 'neutral' && <Minus className="w-3.5 h-3.5" />}
              {trendText}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

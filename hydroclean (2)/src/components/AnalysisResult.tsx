import React from 'react';
import { motion } from 'motion/react';
import { Droplets, Trash2, Activity, Info, Shirt, Package, Beaker, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { PlasticAnalysis } from '../types';
import { cn } from '../lib/utils';

interface AnalysisResultProps {
  analysis: PlasticAnalysis;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ analysis }) => {
  const getIntensityConfig = (intensity: string) => {
    switch (intensity) {
      case 'High': return { color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20', icon: <AlertTriangle className="text-red-400" /> };
      case 'Medium': return { color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20', icon: <Activity className="text-yellow-400" /> };
      case 'Low': return { color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/20', icon: <CheckCircle2 className="text-green-400" /> };
      default: return { color: 'text-white', bg: 'bg-white/10', border: 'border-white/20', icon: <Info /> };
    }
  };

  const config = getIntensityConfig(analysis.intensity);

  const getCategoryIcon = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes('bottle')) return <Beaker size={14} />;
    if (t.includes('cloth') || t.includes('textile')) return <Shirt size={14} />;
    if (t.includes('cover') || t.includes('wrap')) return <Package size={14} />;
    return <Trash2 size={14} />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-white/30">Analysis Report</h3>
        <div className={cn("px-4 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest flex items-center gap-2", config.bg, config.border, config.color)}>
          {config.icon}
          {analysis.intensity} Intensity Detected
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Stats */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Activity size={120} />
            </div>
            
            <div className="relative z-10 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Total Objects Identified</p>
                  <h4 className="text-4xl md:text-6xl font-black tracking-tighter text-brand-cyan">{analysis.count}</h4>
                </div>
                <div className="hidden sm:block h-12 w-px bg-white/10 mb-2" />
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Pollution Grade</p>
                  <h4 className={cn("text-2xl md:text-4xl font-black tracking-tighter", config.color)}>{analysis.intensity}</h4>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Material Breakdown</p>
                <div className="flex flex-wrap gap-3">
                  {analysis.types.map((type, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3 hover:bg-white/10 transition-colors cursor-default"
                    >
                      <div className="p-2 rounded-lg bg-brand-blue/10 text-brand-blue">
                        {getCategoryIcon(type)}
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider">{type}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-8">
            <div className="flex items-center gap-3 mb-4">
              <Info size={18} className="text-brand-blue" />
              <h4 className="text-sm font-bold uppercase tracking-widest">AI Assessment Summary</h4>
            </div>
            <p className="text-white/70 leading-relaxed italic font-serif text-lg">
              "{analysis.description}"
            </p>
          </div>
        </div>

        {/* Action Sidebar */}
        <div className="space-y-6">
          <div className="glass-card p-6 border-l-4 border-brand-blue">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Recommended Action</h4>
            <div className="space-y-4">
              <div className="p-4 bg-brand-blue/5 rounded-xl border border-brand-blue/10">
                <p className="text-sm font-medium text-white/80">
                  {analysis.intensity === 'High' 
                    ? "Immediate cleanup crew deployment recommended. High risk of aquatic life impact."
                    : analysis.intensity === 'Medium'
                    ? "Schedule routine maintenance within 48 hours. Monitor for further accumulation."
                    : "Standard monitoring sufficient. No immediate intervention required."}
                </p>
              </div>
              <button className="w-full py-4 bg-brand-blue hover:bg-brand-blue/80 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all">
                Dispatch Team
              </button>
            </div>
          </div>

          <div className="glass-card p-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Data Confidence</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                <span>AI Confidence</span>
                <span className="text-brand-cyan">94%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '94%' }}
                  transition={{ duration: 1, ease: 'circOut' }}
                  className="h-full bg-brand-cyan"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

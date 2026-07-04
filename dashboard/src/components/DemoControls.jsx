import React, { useState } from 'react';
import { Flame, RotateCcw, RefreshCcw } from 'lucide-react';

export default function DemoControls({ onForceAlerts, onResetDemo, onRefresh }) {
  const [loading, setLoading] = useState({
    force: false,
    reset: false,
    refresh: false
  });

  const handleAction = async (key, callback) => {
    if (loading[key]) return;
    setLoading(prev => ({ ...prev, [key]: true }));
    try {
      await callback();
    } catch (err) {
      console.error(`Demo controls action failed:`, err);
    } finally {
      setLoading(prev => ({ ...prev, [key]: false }));
    }
  };

  return (
    <div className="glass-panel p-6 flex flex-col h-full justify-between">
      <div>
        <h2 className="text-xl font-bold text-white">Demo Control Desk</h2>
        <p className="text-xs text-slate-400 mb-6">Inject test loads or reset variables for presentations</p>
      </div>

      <div className="flex flex-col gap-3">
        {/* Force Alerts Button */}
        <button
          onClick={() => handleAction('force', onForceAlerts)}
          disabled={loading.force}
          className={`w-full py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 border transition-all duration-300 ${
            loading.force
              ? 'bg-slate-800 border-slate-700 text-slate-500'
              : 'bg-red-500/10 border-red-500/30 hover:bg-red-500/20 text-red-400 active:scale-[0.98]'
          }`}
        >
          <Flame className={`w-4.5 h-4.5 ${loading.force ? 'animate-pulse' : ''}`} />
          {loading.force ? 'INJECTING...' : 'FORCE ACTIVE ALERTS'}
        </button>

        {/* Reset Demo Button */}
        <button
          onClick={() => handleAction('reset', onResetDemo)}
          disabled={loading.reset}
          className={`w-full py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 border transition-all duration-300 ${
            loading.reset
              ? 'bg-slate-800 border-slate-700 text-slate-500'
              : 'bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/20 text-amber-400 active:scale-[0.98]'
          }`}
        >
          <RotateCcw className={`w-4.5 h-4.5 ${loading.reset ? 'animate-spin' : ''}`} />
          {loading.reset ? 'RESETTING...' : 'RESET SIMULATOR STATE'}
        </button>

        {/* Refresh Snapshot Button */}
        <button
          onClick={() => handleAction('refresh', onRefresh)}
          disabled={loading.refresh}
          className={`w-full py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 border transition-all duration-300 ${
            loading.refresh
              ? 'bg-slate-800 border-slate-700 text-slate-500'
              : 'bg-slate-800/80 border-slate-700 hover:bg-slate-700/80 text-slate-200 active:scale-[0.98]'
          }`}
        >
          <RefreshCcw className={`w-4.5 h-4.5 ${loading.refresh ? 'animate-spin' : ''}`} />
          {loading.refresh ? 'REFRESHING...' : 'REFRESH SNAPSHOT'}
        </button>
      </div>

      <div className="text-[10px] text-slate-500 text-center mt-4 italic">
        Backend URL: {import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}
      </div>
    </div>
  );
}

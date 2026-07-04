import React from 'react';
import { Zap, Activity, Power, Layers } from 'lucide-react';

export default function PowerSummary({ usage }) {
  const {
    totalPowerW = 0,
    totalKwh = 0,
    devicesOn = 0,
    totalDevices = 15
  } = usage || {};

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Live Load Card */}
      <div className="glass-panel p-5 flex items-center gap-4">
        <div className="bg-amber-500/10 p-3 rounded-xl border border-amber-500/20 text-amber-400">
          <Zap className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Live Load</p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-bold text-white">{totalPowerW}</span>
            <span className="text-xs text-slate-400 font-semibold">W</span>
          </div>
        </div>
      </div>

      {/* Cumulative Energy Card */}
      <div className="glass-panel p-5 flex items-center gap-4">
        <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20 text-emerald-400">
          <Activity className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Energy Consumed</p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-bold text-white">{totalKwh.toFixed(4)}</span>
            <span className="text-xs text-slate-400 font-semibold">kWh</span>
          </div>
        </div>
      </div>

      {/* Active Devices Card */}
      <div className="glass-panel p-5 flex items-center gap-4">
        <div className="bg-blue-500/10 p-3 rounded-xl border border-blue-500/20 text-blue-400">
          <Power className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Devices Status</p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-bold text-white">{devicesOn}</span>
            <span className="text-slate-400 text-sm">/ {totalDevices} ON</span>
          </div>
        </div>
      </div>

      {/* Total Rooms Card */}
      <div className="glass-panel p-5 flex items-center gap-4">
        <div className="bg-purple-500/10 p-3 rounded-xl border border-purple-500/20 text-purple-400">
          <Layers className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Rooms</p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-bold text-white">3</span>
            <span className="text-slate-400 text-sm">Rooms Monitored</span>
          </div>
        </div>
      </div>
    </div>
  );
}

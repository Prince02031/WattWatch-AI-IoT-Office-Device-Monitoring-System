import React, { useState, useEffect } from 'react';
import { Activity, Radio, Clock, ToggleLeft, ToggleRight } from 'lucide-react';

export default function Header({ isConnected, simulatedHour, onSetSimulatedTime }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Only run the ticker if we are NOT in simulated time mode
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const isDemoActive = simulatedHour !== null;

  // Format hour value to AM/PM string
  const formatHourOption = (hr) => {
    const ampm = hr >= 12 ? 'PM' : 'AM';
    const displayHr = hr % 12 === 0 ? 12 : hr % 12;
    return `${displayHr.toString().padStart(2, '0')}:00 ${ampm}`;
  };

  const handleDemoToggle = () => {
    if (isDemoActive) {
      // Turn off: set simulated time to null
      onSetSimulatedTime(null);
    } else {
      // Turn on: set default simulated time to 22 (10:00 PM)
      onSetSimulatedTime(22);
    }
  };

  const formatTimeDisplay = () => {
    if (isDemoActive) {
      const hr = simulatedHour;
      const ampm = hr >= 12 ? 'PM' : 'AM';
      const displayHr = hr % 12 === 0 ? 12 : hr % 12;
      return `${displayHr.toString().padStart(2, '0')}:00 ${ampm} (Demo)`;
    } else {
      return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
  };

  const formatDateDisplay = () => {
    if (isDemoActive) {
      return 'Simulated Time';
    } else {
      return time.toLocaleDateString([], { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
    }
  };

  return (
    <header className="glass-panel px-6 py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      {/* Brand Title */}
      <div className="flex items-center gap-3">
        <div className="bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20 text-emerald-400">
          <Activity className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            WattWatch
          </h1>
          <p className="text-xs text-slate-400">Smart Office Energy Monitor</p>
        </div>
      </div>

      {/* Control Badges & Clock */}
      <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
        {/* 1. Live Sync Badge */}
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-300 ${
          isConnected 
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
            : 'bg-red-500/10 border-red-500/30 text-red-400 animate-pulse'
        }`}>
          <Radio className={`w-3.5 h-3.5 ${isConnected ? 'animate-pulse' : ''}`} />
          {isConnected ? 'LIVE SYNC' : 'OFFLINE'}
        </div>

        {/* 2. Demo Mode Toggle & Time Dropdown */}
        <div className={`flex items-center gap-3 px-3 py-1 rounded-xl border transition-all duration-300 ${
          isDemoActive
            ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
            : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
        }`}>
          <button
            onClick={handleDemoToggle}
            className="flex items-center gap-1.5 text-xs font-bold focus:outline-none"
            title={isDemoActive ? 'Disable simulated hour override' : 'Enable simulated hour override'}
          >
            {isDemoActive ? (
              <>
                <ToggleRight className="w-5 h-5 text-amber-400" />
                <span>DEMO TIME ON</span>
              </>
            ) : (
              <>
                <ToggleLeft className="w-5 h-5 text-slate-500" />
                <span>DEMO TIME OFF</span>
              </>
            )}
          </button>

          {/* Time Selector Dropdown (visible when demo mode is active) */}
          {isDemoActive && (
            <select
              value={simulatedHour}
              onChange={(e) => onSetSimulatedTime(parseInt(e.target.value))}
              className="bg-slate-950/80 border border-amber-500/30 text-amber-400 text-xs rounded px-2 py-0.5 font-bold focus:outline-none focus:ring-1 focus:ring-amber-500/50 cursor-pointer"
            >
              {Array.from({ length: 24 }).map((_, idx) => (
                <option key={idx} value={idx} className="bg-slate-950 text-slate-300">
                  {formatHourOption(idx)}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* 3. Real-time / Simulated Clock Display */}
        <div className={`border px-4 py-1.5 rounded-xl text-xs font-mono flex items-center gap-2 transition-all duration-300 ${
          isDemoActive
            ? 'bg-amber-950/20 border-amber-500/30 text-amber-300'
            : 'bg-slate-950/60 border-slate-800/80 text-slate-350'
        }`}>
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-500">{formatDateDisplay()}</span>
          <span className="font-bold">{formatTimeDisplay()}</span>
        </div>
      </div>
    </header>
  );
}

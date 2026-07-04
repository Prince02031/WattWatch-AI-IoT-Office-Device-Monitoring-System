import React from 'react';
import { AlertTriangle, Fan, Lightbulb } from 'lucide-react';

export default function RoomCard({ room, isSelected, hasAlert, onClick }) {
  const { roomId, roomName, currentPower = 0, devicesOn = 0, totalDevices = 5 } = room;

  return (
    <button
      onClick={onClick}
      className={`w-full text-left glass-panel p-5 flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
        isSelected
          ? 'ring-2 ring-emerald-500 bg-slate-900/90 border-transparent shadow-emerald-500/10'
          : 'glass-panel-hover'
      } ${
        hasAlert && !isSelected
          ? 'border-red-500/50 shadow-red-500/5'
          : ''
      }`}
    >
      {/* Alert Glow Background Effect */}
      {hasAlert && (
        <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full blur-xl pointer-events-none -mr-4 -mt-4 animate-pulse" />
      )}

      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-bold text-lg text-white">{roomName}</h3>
          <p className="text-xs text-slate-400 mt-0.5">Room ID: {roomId}</p>
        </div>

        {/* Warning Indicator */}
        {hasAlert && (
          <span className="flex items-center gap-1 bg-red-500/10 border border-red-500/30 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-bounce">
            <AlertTriangle className="w-3 h-3" />
            ALERT
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div>
          <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Live Power</p>
          <p className="text-xl font-extrabold text-white mt-0.5">
            {currentPower}<span className="text-xs text-slate-400 font-semibold ml-0.5">W</span>
          </p>
        </div>

        <div>
          <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Device Status</p>
          <p className="text-xl font-extrabold text-white mt-0.5">
            {devicesOn}<span className="text-slate-400 text-sm font-normal"> / {totalDevices} ON</span>
          </p>
        </div>
      </div>

      {/* Decorative icon row */}
      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-800/40">
        <span className="text-[10px] text-slate-500 flex items-center gap-1">
          <Fan className={`w-3.5 h-3.5 ${devicesOn > 0 ? 'text-emerald-400 animate-spin-slow' : 'text-slate-600'}`} />
          2 Fans
        </span>
        <span className="text-slate-700 text-xs">•</span>
        <span className="text-[10px] text-slate-500 flex items-center gap-1">
          <Lightbulb className={`w-3.5 h-3.5 ${devicesOn > 0 ? 'text-yellow-400' : 'text-slate-600'}`} />
          3 Lights
        </span>
      </div>
    </button>
  );
}

import React from 'react';
import { Fan, Lightbulb, AlertTriangle } from 'lucide-react';

export default function OfficeLayout({ devices, alerts, selectedRoomId, onSelectRoom, onToggleDevice }) {
  const rooms = [
    { id: 'drawing', name: 'Drawing Room' },
    { id: 'work1', name: 'Work Room 1' },
    { id: 'work2', name: 'Work Room 2' }
  ];

  // Helper to check if a room has an active alert
  const getRoomAlert = (roomId) => {
    return alerts.find(a => a.roomId === roomId);
  };

  // Get devices for a specific room
  const getRoomDevices = (roomId) => {
    return devices.filter(d => d.roomId === roomId);
  };

  return (
    <div className="glass-panel p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-white">Office Blueprint Layout</h2>
          <p className="text-xs text-slate-400">Click a room to inspect details, or tap icons to toggle devices</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span> Active</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></span> Glowing Light</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-red-500 rounded-full"></span> Alerting Room</span>
        </div>
      </div>

      {/* Blueprint Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow bg-slate-950/60 border border-slate-800 p-6 rounded-xl relative">
        {rooms.map(room => {
          const roomAlert = getRoomAlert(room.id);
          const roomDevices = getRoomDevices(room.id);
          const isSelected = selectedRoomId === room.id;

          // Split devices into fans and lights for structural rendering
          const fans = roomDevices.filter(d => d.type === 'fan');
          const lights = roomDevices.filter(d => d.type === 'light');

          return (
            <div
              key={room.id}
              onClick={() => onSelectRoom(room.id)}
              className={`relative cursor-pointer min-h-[180px] p-4 rounded-xl border-2 transition-all duration-300 flex flex-col justify-between ${
                roomAlert 
                  ? 'border-red-500/80 animate-pulse-glow bg-red-950/10' 
                  : isSelected 
                    ? 'border-emerald-500/80 bg-slate-900/60' 
                    : 'border-slate-800 bg-slate-950 hover:border-slate-700'
              }`}
            >
              {/* Room Header Info */}
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-sm text-slate-200">{room.name}</h4>
                  <span className="text-[10px] text-slate-500 font-mono uppercase">Zone: {room.id}</span>
                </div>
                {roomAlert && (
                  <AlertTriangle className="w-4 h-4 text-red-500 animate-bounce" />
                )}
              </div>

              {/* Devices Grid Area (Top-view Mock Layout) */}
              <div className="flex flex-col gap-4 mt-4">
                {/* Fan Row */}
                <div className="flex justify-around items-center bg-slate-900/40 p-2 rounded-lg border border-slate-800/30">
                  {fans.map(fan => (
                    <button
                      key={fan.id}
                      title={`Toggle ${fan.name}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleDevice(fan.id, fan.status === 'on' ? 'off' : 'on');
                      }}
                      className={`p-2.5 rounded-full border transition-all duration-300 ${
                        fan.status === 'on'
                          ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                          : 'bg-slate-950 border-slate-800 text-slate-600 hover:border-slate-700'
                      }`}
                    >
                      <Fan className={`w-4 h-4 ${fan.status === 'on' ? 'fan-spin' : ''}`} />
                    </button>
                  ))}
                </div>

                {/* Light Row */}
                <div className="flex justify-around items-center bg-slate-900/40 p-2 rounded-lg border border-slate-800/30">
                  {lights.map(light => (
                    <button
                      key={light.id}
                      title={`Toggle ${light.name}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleDevice(light.id, light.status === 'on' ? 'off' : 'on');
                      }}
                      className={`p-2.5 rounded-full border transition-all duration-300 ${
                        light.status === 'on'
                          ? 'bg-yellow-500/20 border-yellow-500/40 text-yellow-300 glow-yellow'
                          : 'bg-slate-950 border-slate-800 text-slate-600 hover:border-slate-700'
                      }`}
                    >
                      <Lightbulb className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Room Footnote */}
              <div className="text-[10px] text-slate-500 text-right mt-2 font-mono">
                {roomDevices.filter(d => d.status === 'on').length} / 5 Active
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

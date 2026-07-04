import React from 'react';
import { Fan, Lightbulb, Power } from 'lucide-react';

export default function DevicePanel({ devices, selectedRoomId, onToggleDevice }) {
  const roomNameMap = {
    drawing: 'Drawing Room',
    work1: 'Work Room 1',
    work2: 'Work Room 2'
  };

  const selectedRoomName = roomNameMap[selectedRoomId] || 'Office';

  // Filter devices to show only the selected room's 5 devices
  const roomDevices = devices.filter(d => d.roomId === selectedRoomId);

  const formatTime = (isoString) => {
    if (!isoString) return 'Never';
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div className="glass-panel p-6 flex flex-col h-full">
      <div className="border-b border-slate-800 pb-3 mb-4 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-white">{selectedRoomName} Devices</h2>
          <p className="text-xs text-slate-400">Manage status and monitor real-time consumption</p>
        </div>
        <span className="bg-slate-950/60 border border-slate-800 text-xs px-3 py-1 rounded-lg text-slate-400 font-mono">
          Count: {roomDevices.length}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {roomDevices.map(device => {
          const isOn = device.status === 'on';

          return (
            <div
              key={device.id}
              className={`glass-panel p-4 flex flex-col justify-between border-slate-800/80 transition-all duration-300 relative ${
                isOn 
                  ? 'bg-slate-900/40 border-emerald-500/20' 
                  : 'glass-panel-hover'
              }`}
            >
              <div>
                {/* Device Card Header */}
                <div className="flex items-start justify-between">
                  <div className={`p-2 rounded-lg border ${
                    isOn
                      ? device.type === 'fan'
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400 glow-yellow'
                      : 'bg-slate-950 border-slate-850 text-slate-600'
                  }`}>
                    {device.type === 'fan' ? (
                      <Fan className={`w-5 h-5 ${isOn ? 'fan-spin' : ''}`} />
                    ) : (
                      <Lightbulb className="w-5 h-5" />
                    )}
                  </div>

                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    isOn
                      ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400'
                      : 'bg-slate-950 border border-slate-800 text-slate-500'
                  }`}>
                    {device.status}
                  </span>
                </div>

                {/* Device Info */}
                <h4 className="font-bold text-sm text-slate-100 mt-4 truncate" title={device.name}>
                  {device.name}
                </h4>
                <p className="text-[10px] text-slate-500 uppercase tracking-wide mt-0.5">
                  Type: {device.type}
                </p>

                {/* Wattage Details */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800/40">
                  <div>
                    <span className="text-[9px] uppercase font-semibold text-slate-500 block">Baseline</span>
                    <span className="text-xs font-bold text-slate-300">{device.wattage}W</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-semibold text-slate-500 block">Live Draw</span>
                    <span className={`text-xs font-bold ${isOn ? 'text-emerald-400' : 'text-slate-500'}`}>
                      {device.currentPower}W
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons & Timestamps */}
              <div className="mt-4">
                <p className="text-[9px] text-slate-500 font-mono truncate mb-2">
                  Changed: {formatTime(device.lastChanged)}
                </p>
                <button
                  onClick={() => onToggleDevice(device.id, isOn ? 'off' : 'on')}
                  className={`w-full py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-300 border ${
                    isOn
                      ? 'bg-red-500/10 border-red-500/30 hover:bg-red-500/20 text-red-400'
                      : 'bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-400'
                  }`}
                >
                  <Power className="w-3.5 h-3.5" />
                  {isOn ? 'TURN OFF' : 'TURN ON'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

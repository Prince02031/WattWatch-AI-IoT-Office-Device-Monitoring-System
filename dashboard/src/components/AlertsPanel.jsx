import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle, Flame } from 'lucide-react';

export default function AlertsPanel({ alerts }) {
  const formatTime = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const getSeverityStyles = (severity) => {
    switch (severity) {
      case 'critical':
        return {
          bg: 'bg-red-500/10 border-red-500/30 text-red-400',
          icon: <Flame className="w-5 h-5 text-red-400 animate-pulse" />,
          label: 'CRITICAL'
        };
      case 'warning':
        return {
          bg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
          icon: <AlertTriangle className="w-5 h-5 text-amber-400" />,
          label: 'WARNING'
        };
      default:
        return {
          bg: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
          icon: <AlertCircle className="w-5 h-5 text-blue-400" />,
          label: 'INFO'
        };
    }
  };

  return (
    <div className="glass-panel p-6 flex flex-col h-full">
      <div className="border-b border-slate-800 pb-3 mb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          Active Alerts
          {alerts.length > 0 && (
            <span className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-2.5 py-0.5 rounded-full font-bold animate-pulse">
              {alerts.length}
            </span>
          )}
        </h2>
        <p className="text-xs text-slate-400">Security warnings and threshold violations</p>
      </div>

      <div className="flex-grow overflow-y-auto max-h-[300px] pr-2 flex flex-col gap-3">
        {alerts.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-10 text-center flex-grow">
            <div className="bg-emerald-500/10 p-4 rounded-full border border-emerald-500/20 text-emerald-400 mb-3">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-white">System Status Normal</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-[200px]">
              No active warnings. Energy draw is within limits.
            </p>
          </div>
        ) : (
          /* Active Alerts List */
          alerts.map(alert => {
            const styles = getSeverityStyles(alert.severity);

            return (
              <div
                key={alert.id}
                className={`p-4 rounded-xl border flex gap-3 items-start transition-all duration-300 ${styles.bg}`}
              >
                <div className="mt-0.5">{styles.icon}</div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[9px] font-extrabold uppercase tracking-wider font-mono">
                      {styles.label}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {formatTime(alert.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-100 mt-1 leading-snug">
                    {alert.message}
                  </p>
                  {(alert.roomName || alert.deviceName) && (
                    <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-400 font-mono">
                      {alert.roomName && <span>Room: {alert.roomName}</span>}
                      {alert.roomName && alert.deviceName && <span>•</span>}
                      {alert.deviceName && <span>Device: {alert.deviceName}</span>}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

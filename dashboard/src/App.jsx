import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import PowerSummary from './components/PowerSummary';
import RoomCard from './components/RoomCard';
import OfficeLayout from './components/OfficeLayout';
import DevicePanel from './components/DevicePanel';
import AlertsPanel from './components/AlertsPanel';
import DemoControls from './components/DemoControls';
import { api } from './services/api';
import { initSocket } from './services/socket';

export default function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [simulatedHour, setSimulatedHour] = useState(null);
  const [devices, setDevices] = useState([]);
  const [usage, setUsage] = useState({
    totalPowerW: 0,
    totalKwh: 0,
    devicesOn: 0,
    totalDevices: 15,
    rooms: [
      { roomId: 'drawing', roomName: 'Drawing Room', currentPower: 0, devicesOn: 0, totalDevices: 5 },
      { roomId: 'work1', roomName: 'Work Room 1', currentPower: 0, devicesOn: 0, totalDevices: 5 },
      { roomId: 'work2', roomName: 'Work Room 2', currentPower: 0, devicesOn: 0, totalDevices: 5 }
    ]
  });
  const [alerts, setAlerts] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState('drawing');

  // Load initial snapshot data
  const loadInitialSnapshot = useCallback(async () => {
    try {
      const data = await api.getSnapshot();
      setDevices(data.devices || []);
      setUsage(data.usage || {});
      setAlerts(data.alerts || []);
      setSimulatedHour(data.simulatedHour !== undefined ? data.simulatedHour : null);
    } catch (err) {
      console.error('Failed to load initial snapshot:', err);
    }
  }, []);

  // Handle device toggling
  const handleToggleDevice = async (id, status) => {
    try {
      const updated = await api.toggleDevice(id, status);
      // Optimistically update device status locally
      setDevices(prev => prev.map(d => d.id === id ? updated : d));
    } catch (err) {
      console.error('Failed to toggle device:', err);
    }
  };

  // Handle setting simulated time
  const handleSetSimulatedTime = async (hour) => {
    try {
      const data = await api.setSimulatedTime(hour);
      setAlerts(data.activeAlerts || []);
      setSimulatedHour(data.simulatedHour !== undefined ? data.simulatedHour : null);
    } catch (err) {
      console.error('Failed to update simulated time:', err);
    }
  };

  // Handle force alerts demo injection
  const handleForceAlerts = async () => {
    try {
      const data = await api.forceAlerts();
      setAlerts(data.activeAlerts || []);
      // Refresh to pull updated device properties
      await loadInitialSnapshot();
    } catch (err) {
      console.error('Failed to force alerts:', err);
    }
  };

  // Handle simulation reset
  const handleResetDemo = async () => {
    try {
      const data = await api.resetDemo();
      setDevices(data.devices || []);
      setUsage(data.usage || {});
      setAlerts(data.activeAlerts || []);
      setSimulatedHour(data.simulatedHour !== undefined ? data.simulatedHour : null);
    } catch (err) {
      console.error('Failed to reset demo simulation:', err);
    }
  };

  useEffect(() => {
    // 1. Fetch initial snapshot on load
    loadInitialSnapshot();

    // 2. Initialize and open Socket.IO connection
    const socket = initSocket();

    socket.on('connect', () => {
      console.log('[Socket] Connected to backend');
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('[Socket] Disconnected from backend');
      setIsConnected(false);
    });

    socket.on('snapshot', (data) => {
      console.log('[Socket] Snapshot received:', data);
      if (data.devices) setDevices(data.devices);
      if (data.usage) setUsage(data.usage);
      if (data.alerts) setAlerts(data.alerts);
      if (data.simulatedHour !== undefined) setSimulatedHour(data.simulatedHour);
    });

    socket.on('devices:update', (updatedDevices) => {
      console.log('[Socket] Devices updated');
      setDevices(updatedDevices);
    });

    socket.on('usage:update', (updatedUsage) => {
      console.log('[Socket] Usage updated');
      setUsage(updatedUsage);
    });

    socket.on('alerts:update', (updatedAlerts) => {
      console.log('[Socket] Alerts updated');
      setAlerts(updatedAlerts);
    });

    socket.on('alert:new', (newAlert) => {
      console.log('[Socket] New Alert triggered:', newAlert.message);
    });

    // Cleanup listeners and close connection on unmount
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('snapshot');
      socket.off('devices:update');
      socket.off('usage:update');
      socket.off('alerts:update');
      socket.off('alert:new');
      socket.disconnect();
    };
  }, [loadInitialSnapshot]);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 flex flex-col gap-6">
      {/* 1. Header (Brand, Sync, Clock & Inline Time Controls) */}
      <Header 
        isConnected={isConnected} 
        simulatedHour={simulatedHour} 
        onSetSimulatedTime={handleSetSimulatedTime}
      />
      
      {/* 2. Power aggregate summary cards */}
      <PowerSummary usage={usage} />
      
      {/* 3. Main Dashboard grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3 width) - Room blueprints & Device managers */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <OfficeLayout 
            devices={devices} 
            alerts={alerts}
            selectedRoomId={selectedRoomId}
            onSelectRoom={setSelectedRoomId}
            onToggleDevice={handleToggleDevice}
          />
          
          <DevicePanel 
            devices={devices}
            selectedRoomId={selectedRoomId}
            onToggleDevice={handleToggleDevice}
          />
        </div>

        {/* Right Column (1/3 width) - Room summaries, Alerts log, Demo control desk */}
        <div className="flex flex-col gap-6">
          {/* Room quick view cards */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-sm text-slate-300 uppercase tracking-wider px-1">
              Room Statistics
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
              {usage.rooms?.map(room => (
                <RoomCard
                  key={room.roomId}
                  room={room}
                  isSelected={selectedRoomId === room.roomId}
                  hasAlert={alerts.some(a => a.roomId === room.roomId)}
                  onClick={() => setSelectedRoomId(room.roomId)}
                />
              ))}
            </div>
          </div>

          {/* Active Alerts console */}
          <AlertsPanel alerts={alerts} />
          
          {/* Demo injection panel */}
          <DemoControls
            onForceAlerts={handleForceAlerts}
            onResetDemo={handleResetDemo}
            onRefresh={loadInitialSnapshot}
          />
        </div>
      </div>
    </div>
  );
}

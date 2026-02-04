'use client';

import React, { useEffect, useState } from 'react';
import { Wifi, BatteryCharging, BatteryMedium, BatteryLow, Sliders } from 'lucide-react';
import { useWindowStore } from '@/store/windowStore';
import { apps } from '@/config/apps';
import ControlCenter from './ControlCenter';

interface BatteryManager extends EventTarget {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
  onchargingchange: EventListenerOrEventListenerObject | null;
  onchargingtimechange: EventListenerOrEventListenerObject | null;
  ondischargingtimechange: EventListenerOrEventListenerObject | null;
  onlevelchange: EventListenerOrEventListenerObject | null;
}

const TopBar = () => {
  const { activeWindowId } = useWindowStore();
  const activeApp = apps.find(a => a.id === activeWindowId);
  
  const [time, setTime] = useState<string>('');
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [isCharging, setIsCharging] = useState(false);
  const [showControlCenter, setShowControlCenter] = useState(false);
  
  // Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Battery
  useEffect(() => {
    // @ts-expect-error - navigator.getBattery is not in standard TS lib yet
    if (typeof navigator.getBattery === 'function') {
      // @ts-expect-error - navigator.getBattery is not in standard TS lib yet
      navigator.getBattery().then((battery: BatteryManager) => {
        setBatteryLevel(battery.level * 100);
        setIsCharging(battery.charging);

        battery.addEventListener('levelchange', () => {
             setBatteryLevel(battery.level * 100)
        });
        battery.addEventListener('chargingchange', () => setIsCharging(battery.charging));
      });
    }
  }, []);

  return (
    <>
      <div className="h-8 w-full bg-transparent/20 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 text-xs font-medium text-white select-none z-50 fixed top-0 left-0 right-0">
        
        {/* Left Side: Logo & Active App */}
        <div className="flex items-center gap-4">
          <span className="font-bold text-sm tracking-tight">SZ.OS</span>
          {activeApp && (
            <span className="font-semibold hidden sm:inline-block">
              {activeApp.title}
            </span>
          )}
          {activeApp && (
              <div className="flex gap-3 text-white/70">
                  <span className="hover:text-white cursor-pointer transition-colors">File</span>
                  <span className="hover:text-white cursor-pointer transition-colors">Edit</span>
                  <span className="hover:text-white cursor-pointer transition-colors">View</span>
              </div>
          )}
        </div>

        {/* Right Side: Stats */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
             <Wifi size={14} />
          </div>
          
          <div className="flex items-center gap-2">
              {isCharging ? (
                  <BatteryCharging size={14} />
              ) : (
                  batteryLevel !== null && batteryLevel < 20 ? <BatteryLow size={14} /> : <BatteryMedium size={14} />
              )}
              {batteryLevel !== null && <span className="hidden sm:inline">{Math.round(batteryLevel)}%</span>}
          </div>

          <div className="flex items-center gap-2 cursor-pointer hover:bg-white/10 p-1 rounded transition-colors" onClick={() => setShowControlCenter(!showControlCenter)}>
             <Sliders size={14} />
             <span>{time}</span>
          </div>
        </div>
      </div>

      <ControlCenter isOpen={showControlCenter} onClose={() => setShowControlCenter(false)} />
    </>
  );
};

export default TopBar;

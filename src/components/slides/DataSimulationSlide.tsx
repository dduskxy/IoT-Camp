"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RefreshCw, Send, Download, Wifi, Hand, Lightbulb, Activity, RadioTower } from 'lucide-react';

interface LogEntry {
  id: number;
  time: string;
  msg: string;
  type: 'tx' | 'rx' | 'sys';
}

export function DataSimulationSlide() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [txCount, setTxCount] = useState(0);
  const [rxCount, setRxCount] = useState(0);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [currentFinger, setCurrentFinger] = useState(0);
  const [sendingFinger, setSendingFinger] = useState(0);
  const [logs, setLogs] = useState<LogEntry[]>([{ id: 0, time: '00:00:00', msg: 'System Ready. 2.4GHz Band.', type: 'sys' }]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        const now = new Date();
        const tStr = `${now.getSeconds()}.${now.getMilliseconds().toString().padStart(3, '0')}`;
        
        let finger = 0;
        setTxCount((prev) => {
          const next = prev + 1;
          finger = (next % 5) + 1; // 1 to 5 fingers
          setLogs(l => [...l.slice(-4), { id: Date.now(), time: tStr, msg: `TX broadcasted count: [${finger}]`, type: 'tx' }]);
          return next;
        });
        setSendingFinger(finger);
        setIsTransmitting(true);
        
        setTimeout(() => {
          const rNow = new Date();
          const rtStr = `${rNow.getSeconds()}.${rNow.getMilliseconds().toString().padStart(3, '0')}`;
          
          setRxCount((prev) => {
            const next = prev + 1;
            setLogs(l => [...l.slice(-4), { id: Date.now()+1, time: rtStr, msg: `RX received count & changed LED to [${finger}]`, type: 'rx' }]);
            return next;
          });
          setCurrentFinger(finger);
          setIsTransmitting(false);
        }, 1200); // 1.2s travel time for visual effect
        
      }, 2500); // Send every 2.5 seconds
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const getLedStyle = (finger: number) => {
    switch (finger) {
      case 1: return 'bg-red-500 shadow-[0_0_50px_#ef4444] border-red-300';
      case 2: return 'bg-green-500 shadow-[0_0_50px_#22c55e] border-green-300';
      case 3: return 'bg-blue-500 shadow-[0_0_50px_#3b82f6] border-blue-300';
      case 4: return 'bg-yellow-400 shadow-[0_0_50px_#facc15] border-yellow-200';
      case 5: return 'bg-purple-500 shadow-[0_0_50px_#a855f7] border-purple-300';
      default: return 'bg-gray-800 border-gray-600 shadow-none';
    }
  }

  return (
    <div className="flex flex-col items-center justify-start w-full h-full text-white">
      {/* Main Simulation Area */}
      <div className="w-full flex-1 min-h-0 flex flex-col items-center justify-start md:justify-center relative bg-[#050814] rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] inset-0 overflow-y-auto overflow-x-hidden custom-scrollbar">
        
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

        <div className="w-full max-w-6xl px-4 py-8 md:py-0 flex flex-col md:flex-row items-center justify-between relative z-10 m-auto pb-40 md:pb-16 gap-2 md:gap-0 mt-8 md:mt-auto">
          
          {/* TX Side Group */}
          <div className="flex flex-row md:flex-row items-center gap-4 md:gap-6 z-20">
            {/* Input Device (Camera/PC) */}
            <div className="flex flex-col items-center bg-black/40 p-3 md:p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
              <motion.div 
                key={sendingFinger}
                initial={{ scale: 0.8, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center mb-2 md:mb-3 relative overflow-hidden"
              >
                {sendingFinger > 0 ? (
                  <span className="text-3xl md:text-4xl font-black text-orange-400 drop-shadow-[0_0_15px_rgba(249,115,22,0.8)]">{sendingFinger}</span>
                ) : (
                  <Hand className="w-8 h-8 md:w-10 md:h-10 text-orange-400/50" />
                )}
              </motion.div>
              <div className="text-[10px] md:text-xs text-orange-300 bg-orange-900/40 px-2 md:px-3 py-1 md:py-1.5 rounded-full font-bold border border-orange-500/30">
                ตรวจจับนิ้วมือ
              </div>
            </div>

            <div className="w-4 h-[2px] md:w-12 md:h-[2px] bg-gray-500 border-t border-dashed"></div>

            {/* Transmitter */}
            <div className="flex flex-col items-center">
              <div className="relative">
                {isTransmitting && (
                  <>
                    <motion.div initial={{ scale: 1, opacity: 0.8 }} animate={{ scale: 2.5, opacity: 0 }} transition={{ duration: 1, ease: "easeOut" }} className="absolute inset-0 rounded-full border-2 border-cyan-400" />
                    <motion.div initial={{ scale: 1, opacity: 0.8 }} animate={{ scale: 3.5, opacity: 0 }} transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }} className="absolute inset-0 rounded-full border-2 border-blue-500" />
                    <motion.div initial={{ scale: 1, opacity: 0.8 }} animate={{ scale: 4.5, opacity: 0 }} transition={{ duration: 1.4, ease: "easeOut", delay: 0.4 }} className="absolute inset-0 rounded-full border border-indigo-500" />
                  </>
                )}
                <div className={`w-20 h-20 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-blue-900 to-cyan-700 border-4 ${isTransmitting ? 'border-cyan-400 shadow-[0_0_50px_rgba(34,211,238,0.6)]' : 'border-blue-800'} flex items-center justify-center relative overflow-hidden transition-all duration-300`}>
                  <RadioTower className={`w-10 h-10 md:w-16 md:h-16 text-white z-10 ${isTransmitting ? 'text-cyan-200 drop-shadow-[0_0_10px_rgba(255,255,255,1)]' : 'opacity-70'}`} />
                  {isTransmitting && <div className="absolute inset-0 bg-cyan-400/20 animate-pulse"></div>}
                </div>
              </div>
              <div className="mt-4 md:mt-6 text-center bg-cyan-950/80 px-3 py-1.5 md:px-5 md:py-2.5 rounded-xl border border-cyan-500/30 backdrop-blur-sm shadow-[0_0_20px_rgba(34,211,238,0.15)]">
                <h3 className="font-bold text-cyan-300 flex items-center justify-center gap-1 md:gap-2 text-xs md:text-base"><Send size={12}/> TX Node</h3>
                <p className="text-[9px] md:text-[11px] text-cyan-100/60 font-mono mt-0.5 md:mt-1">Packets: {txCount}</p>
              </div>
            </div>
          </div>

          {/* Wireless Path & Packet */}
          <div className="flex-none md:flex-1 h-20 md:h-32 w-full md:w-auto relative flex flex-col md:flex-row items-center justify-center my-4 md:my-0 md:mx-8">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Dashed line: vertical on mobile, horizontal on desktop */}
              <div className="h-full w-[2px] md:h-[2px] md:w-full border-l-2 md:border-l-0 md:border-t-2 border-dashed border-gray-600/30"></div>
            </div>

            <AnimatePresence>
              {isTransmitting && (
                <>
                  {/* Desktop Packet (Horizontal) */}
                  <motion.div
                    initial={{ left: '0%', opacity: 0, scale: 0.5 }}
                    animate={{ left: '100%', opacity: [0, 1, 1, 0], scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: 'linear' }}
                    className="hidden md:flex absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex-col items-center"
                  >
                    <div className="bg-gradient-to-r from-cyan-500 to-purple-600 px-5 py-2.5 rounded-full shadow-[0_0_30px_rgba(168,85,247,0.8)] border border-white/60 flex items-center gap-3 whitespace-nowrap">
                      <Wifi size={16} className="animate-pulse text-white" />
                      <span className="font-mono font-bold text-white text-sm">Data: {sendingFinger}</span>
                    </div>
                    {/* Trail effect */}
                    <div className="absolute top-1/2 right-full w-20 h-1 -translate-y-1/2 bg-gradient-to-r from-transparent to-cyan-400 blur-sm"></div>
                  </motion.div>

                  {/* Mobile Packet (Vertical) */}
                  <motion.div
                    initial={{ top: '0%', opacity: 0, scale: 0.5 }}
                    animate={{ top: '100%', opacity: [0, 1, 1, 0], scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: 'linear' }}
                    className="flex md:hidden absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                  >
                    <div className="bg-gradient-to-b from-cyan-500 to-purple-600 px-3 py-2 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.8)] border border-white/60 flex flex-col items-center gap-1">
                      <Wifi size={12} className="animate-pulse text-white rotate-90" />
                      <span className="font-mono font-bold text-white text-[10px] leading-none">{sendingFinger}</span>
                    </div>
                    {/* Trail effect */}
                    <div className="absolute left-1/2 bottom-full h-10 w-1 -translate-x-1/2 bg-gradient-to-b from-transparent to-cyan-400 blur-sm"></div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* RX Side Group */}
          <div className="flex flex-row md:flex-row items-center gap-4 md:gap-6 z-20">
            {/* Receiver */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className={`w-20 h-20 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-purple-900 to-fuchsia-700 border-4 ${isTransmitting ? 'border-fuchsia-400 shadow-[0_0_50px_rgba(192,38,211,0.6)]' : 'border-purple-800'} flex items-center justify-center transition-all duration-300 relative overflow-hidden`}>
                  <Download className={`w-10 h-10 md:w-16 md:h-16 text-white z-10 ${isTransmitting ? 'animate-bounce drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'opacity-70'}`} />
                  {isTransmitting && <div className="absolute inset-0 bg-fuchsia-400/20 animate-pulse"></div>}
                </div>
              </div>
              <div className="mt-4 md:mt-6 text-center bg-purple-950/80 px-3 py-1.5 md:px-5 md:py-2.5 rounded-xl border border-purple-500/30 backdrop-blur-sm shadow-[0_0_20px_rgba(168,85,247,0.15)]">
                <h3 className="font-bold text-fuchsia-300 flex items-center justify-center gap-1 md:gap-2 text-xs md:text-base"><Activity size={12}/> RX Node</h3>
                <p className="text-[9px] md:text-[11px] text-fuchsia-100/60 font-mono mt-0.5 md:mt-1">Packets: {rxCount}</p>
              </div>
            </div>

            <div className="w-4 h-[2px] md:w-12 md:h-[2px] bg-gray-500 border-t border-dashed"></div>

            {/* Output Device (RGB LED) */}
            <div className="flex flex-col items-center bg-black/40 p-3 md:p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
              <motion.div 
                key={currentFinger}
                initial={{ scale: 0.8 }}
                animate={{ scale: [0.8, 1.2, 1] }}
                transition={{ duration: 0.4 }}
                className={`w-16 h-16 md:w-20 md:h-20 rounded-full border-4 flex items-center justify-center mb-2 md:mb-3 transition-colors duration-300 ${getLedStyle(currentFinger)}`}
              >
                <Lightbulb className={`w-8 h-8 md:w-10 md:h-10 ${currentFinger ? 'text-white' : 'text-gray-500'}`} />
              </motion.div>
              <div className="text-[10px] md:text-xs text-gray-300 bg-gray-800 px-2 md:px-3 py-1 md:py-1.5 rounded-full font-bold border border-gray-600">
                หลอดไฟ LED
              </div>
            </div>
          </div>

        </div>

        {/* Telemetry Dashboard (Bottom) */}
        <div className="fixed md:absolute bottom-0 inset-x-0 p-3 md:p-6 bg-gradient-to-t from-black via-black/90 to-transparent flex flex-col md:flex-row gap-3 md:gap-4 items-end justify-between z-30 border-t border-white/10 backdrop-blur-md">
          
          {/* Logs */}
          <div className="hidden md:flex bg-black/80 border border-white/10 rounded-xl p-3 w-full md:w-1/3 font-mono text-xs h-32 flex-col justify-end overflow-hidden backdrop-blur-xl">
            <AnimatePresence>
              {logs.map((log) => (
                <motion.div 
                  key={log.id} 
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  className={`py-1 border-b border-white/5 last:border-0 ${log.type === 'tx' ? 'text-cyan-400' : log.type === 'rx' ? 'text-fuchsia-400' : 'text-gray-400'}`}
                >
                  <span className="opacity-40">[{log.time}]</span> <span className="ml-2">{log.msg}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex gap-2 md:gap-4 shrink-0 w-full md:w-auto justify-center mb-1 md:mb-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex-1 md:flex-none flex items-center justify-center px-4 md:px-8 py-3 md:py-4 rounded-full font-bold transition-all text-xs md:text-base ${isPlaying ? 'bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30' : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:brightness-110 shadow-[0_0_30px_rgba(34,211,238,0.5)]'}`}
            >
              {isPlaying ? <Pause className="mr-1 md:mr-2" size={16} /> : <Play className="mr-1 md:mr-2" size={16} />}
              {isPlaying ? 'หยุดจำลอง' : 'เริ่มส่งข้อมูล'}
            </button>
            <button
              onClick={() => { setIsPlaying(false); setTxCount(0); setRxCount(0); setCurrentFinger(0); setSendingFinger(0); setLogs([{ id: Date.now(), time: '00:00:00', msg: 'System Reset.', type: 'sys' }]); }}
              className="flex items-center justify-center px-4 md:px-4 py-3 md:py-4 bg-white/5 hover:bg-white/10 rounded-full transition-all border border-white/10 text-gray-300"
              title="Reset Simulation"
            >
              <RefreshCw size={16} />
            </button>
          </div>
          
          {/* Specs */}
          <div className="hidden md:flex bg-black/80 border border-white/10 rounded-xl p-4 w-1/3 text-xs text-gray-400 flex-col gap-3 backdrop-blur-xl">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="uppercase tracking-wider font-bold text-gray-500">Data Flow</span> 
              <span className="text-white font-mono bg-white/10 px-2 py-0.5 rounded">Hand → TX → RX → LED</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="uppercase tracking-wider font-bold text-gray-500">Frequency</span> 
              <span className="text-cyan-400 font-mono">2.4 GHz Band</span>
            </div>
            <div className="flex justify-between">
              <span className="uppercase tracking-wider font-bold text-gray-500">Payload</span> 
              <span className="text-fuchsia-400 font-mono">Integer (1-5)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

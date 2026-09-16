const fs = require('fs');

const path = 'C:/Users/asus/Documents/GitHub/IoT-Camp/src/components/slides/DataSimulationSlide.tsx';
const newCode = `"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RefreshCw, Send, Download, Wifi, Hand, Lightbulb } from 'lucide-react';

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
        const tStr = \`\${now.getSeconds()}.\${now.getMilliseconds().toString().padStart(3, '0')}\`;
        
        let finger = 0;
        setTxCount((prev) => {
          const next = prev + 1;
          finger = (next % 5) + 1; // 1 to 5 fingers
          setLogs(l => [...l.slice(-4), { id: Date.now(), time: tStr, msg: \`TX broadcasted count: [\${finger}]\`, type: 'tx' }]);
          return next;
        });
        setSendingFinger(finger);
        setIsTransmitting(true);
        
        setTimeout(() => {
          const rNow = new Date();
          const rtStr = \`\${rNow.getSeconds()}.\${rNow.getMilliseconds().toString().padStart(3, '0')}\`;
          
          setRxCount((prev) => {
            const next = prev + 1;
            setLogs(l => [...l.slice(-4), { id: Date.now()+1, time: rtStr, msg: \`RX received count & changed LED to [\${finger}]\`, type: 'rx' }]);
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
      case 1: return 'bg-red-500 shadow-[0_0_40px_#ef4444] border-red-400';
      case 2: return 'bg-green-500 shadow-[0_0_40px_#22c55e] border-green-400';
      case 3: return 'bg-blue-500 shadow-[0_0_40px_#3b82f6] border-blue-400';
      case 4: return 'bg-yellow-500 shadow-[0_0_40px_#eab308] border-yellow-400';
      case 5: return 'bg-purple-500 shadow-[0_0_40px_#a855f7] border-purple-400';
      default: return 'bg-gray-800 border-gray-600 shadow-none';
    }
  }

  return (
    <div className="flex flex-col items-center justify-start w-full h-full text-white">
      <div className="text-center space-y-2 mb-4 mt-4 shrink-0">
        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
          จำลองการส่งข้อมูล (Data Simulation)
        </h2>
        <p className="text-lg text-gray-400">
          เห็นภาพชัดๆ ว่าข้อมูลจากมือเรา วิ่งไปเปลี่ยนสีไฟได้อย่างไร
        </p>
      </div>

      {/* Main Simulation Area */}
      <div className="w-full flex-1 min-h-0 flex flex-col items-center justify-center relative bg-[#0a0f1c] rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] inset-0 overflow-hidden">
        
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        <div className="w-full max-w-6xl px-4 flex items-center justify-between relative z-10 my-auto mb-20">
          
          {/* TX Side Group */}
          <div className="flex flex-row items-center gap-4 z-20">
            {/* Input Device (Camera/PC) */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-xl bg-orange-900/40 border border-orange-500/30 flex items-center justify-center mb-2">
                <Hand className="w-8 h-8 text-orange-400" />
              </div>
              <div className="text-xs text-orange-300 bg-orange-900/40 px-2 py-1 rounded font-bold">นิ้ว: {sendingFinger || '-'}</div>
            </div>

            <div className="w-8 h-[2px] bg-gray-500 border-t border-dashed"></div>

            {/* Transmitter */}
            <div className="flex flex-col items-center">
              <div className="relative">
                {isTransmitting && (
                  <>
                    <motion.div initial={{ scale: 1, opacity: 0.8 }} animate={{ scale: 2.5, opacity: 0 }} transition={{ duration: 1, ease: "easeOut" }} className="absolute inset-0 rounded-full border-2 border-cyan-400" />
                    <motion.div initial={{ scale: 1, opacity: 0.8 }} animate={{ scale: 3.5, opacity: 0 }} transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }} className="absolute inset-0 rounded-full border-2 border-blue-500" />
                  </>
                )}
                <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-blue-900 to-blue-600 border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.4)] relative overflow-hidden">
                  <Send className="w-10 h-10 md:w-14 md:h-14 text-white z-10" />
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
              <div className="mt-4 text-center bg-black/60 px-4 py-2 rounded-xl border border-white/10 backdrop-blur-sm">
                <h3 className="font-bold text-cyan-300">TX Node</h3>
                <p className="text-[10px] text-gray-400 font-mono mt-1">Packets: {txCount}</p>
              </div>
            </div>
          </div>

          {/* Wireless Path & Packet */}
          <div className="flex-1 h-32 relative flex items-center justify-center mx-4">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-[2px] border-t-2 border-dashed border-gray-600/50"></div>
            </div>

            <AnimatePresence>
              {isTransmitting && (
                <motion.div
                  initial={{ left: '0%', opacity: 0, scale: 0.5 }}
                  animate={{ left: '100%', opacity: [0, 1, 1, 0], scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: 'linear' }}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center"
                >
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.8)] border border-white/40 flex items-center gap-2 whitespace-nowrap">
                    <Wifi size={14} className="animate-pulse text-white" />
                    <span className="font-mono font-bold text-white text-sm">Fingers: {sendingFinger}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RX Side Group */}
          <div className="flex flex-row items-center gap-4 z-20">
            {/* Receiver */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className={\`w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-purple-900 to-fuchsia-700 border-2 \${isTransmitting ? 'border-fuchsia-400 shadow-[0_0_30px_rgba(192,38,211,0.6)]' : 'border-purple-600 shadow-lg'} flex items-center justify-center transition-all duration-300\`}>
                  <Download className={\`w-10 h-10 md:w-14 md:h-14 text-white \${isTransmitting ? 'animate-bounce' : ''}\`} />
                </div>
              </div>
              <div className="mt-4 text-center bg-black/60 px-4 py-2 rounded-xl border border-white/10 backdrop-blur-sm">
                <h3 className="font-bold text-fuchsia-300">RX Node</h3>
                <p className="text-[10px] text-gray-400 font-mono mt-1">Packets: {rxCount}</p>
              </div>
            </div>

            <div className="w-8 h-[2px] bg-gray-500 border-t border-dashed"></div>

            {/* Output Device (RGB LED) */}
            <div className="flex flex-col items-center">
              <div className={\`w-16 h-16 rounded-full border-4 flex items-center justify-center mb-2 transition-colors duration-300 \${getLedStyle(currentFinger)}\`}>
                <Lightbulb className={\`w-8 h-8 \${currentFinger ? 'text-white' : 'text-gray-500'}\`} />
              </div>
              <div className="text-xs text-gray-300 bg-gray-800 px-2 py-1 rounded font-bold">RGB LED</div>
            </div>
          </div>

        </div>

        {/* Telemetry Dashboard (Bottom) */}
        <div className="absolute bottom-0 inset-x-0 p-4 md:p-6 bg-gradient-to-t from-black/80 via-black/60 to-transparent flex flex-col md:flex-row gap-4 items-end justify-between z-30">
          
          {/* Logs */}
          <div className="bg-black/80 border border-white/10 rounded-lg p-3 w-full md:w-1/3 font-mono text-xs h-28 flex flex-col justify-end overflow-hidden backdrop-blur-md">
            <AnimatePresence>
              {logs.map((log) => (
                <motion.div 
                  key={log.id} 
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  className={\`py-0.5 \${log.type === 'tx' ? 'text-cyan-400' : log.type === 'rx' ? 'text-fuchsia-400' : 'text-gray-400'}\`}
                >
                  <span className="opacity-50">[{log.time}]</span> {log.msg}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex gap-4 shrink-0">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={\`flex items-center px-6 py-3 rounded-full font-bold transition-all \${isPlaying ? 'bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30' : 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)]'}\`}
            >
              {isPlaying ? <Pause className="mr-2" size={18} /> : <Play className="mr-2" size={18} />}
              {isPlaying ? 'หยุดส่ง (Pause)' : 'เริ่มส่ง (Start)'}
            </button>
            <button
              onClick={() => { setIsPlaying(false); setTxCount(0); setRxCount(0); setCurrentFinger(0); setSendingFinger(0); setLogs([{ id: Date.now(), time: '00:00:00', msg: 'System Reset.', type: 'sys' }]); }}
              className="flex items-center px-4 py-3 bg-white/5 hover:bg-white/10 rounded-full transition-all border border-white/10 text-gray-300"
            >
              <RefreshCw size={18} />
            </button>
          </div>
          
          {/* Specs */}
          <div className="hidden md:flex bg-black/80 border border-white/10 rounded-lg p-3 w-1/3 text-xs text-gray-400 flex-col gap-2 backdrop-blur-md">
            <div className="flex justify-between border-b border-white/5 pb-1"><span>Data Flow</span> <span className="text-white">Hand → TX → RX → LED</span></div>
            <div className="flex justify-between border-b border-white/5 pb-1"><span>Radio</span> <span className="text-white">NRF24L01 (2.4GHz)</span></div>
            <div className="flex justify-between"><span>Payload</span> <span className="text-white">Integer (Finger Count)</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync(path, newCode);
console.log('DataSimulation updated');

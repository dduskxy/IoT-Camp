'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Wifi, RadioTower, RadioReceiver } from 'lucide-react';

interface Log {
  id: number;
  time: string;
  message: string;
}

export function DualSerialSlide() {
  const [txLogs, setTxLogs] = useState<Log[]>([]);
  const [rxLogs, setRxLogs] = useState<Log[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}`;
      
      const newId = Date.now();
      const msg = `Sensor Data: ${Math.floor(Math.random() * 100)}`;
      
      setTxLogs(prev => [...prev.slice(-7), { id: newId, time: timeStr, message: `Sending [${msg}]` }]);
      
      // Delay RX by a slight amount to simulate latency
      setTimeout(() => {
        setRxLogs(prev => [...prev.slice(-7), { id: newId + 1, time: timeStr, message: `Received [${msg}]` }]);
      }, 300);

    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full w-full p-8 text-white bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(59,130,246,0.2)]">
      <h2 className="text-3xl font-bold text-center mb-8 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
        จำลองการรับส่งข้อมูล (Live Simulation)
      </h2>
      
      <div className="flex flex-row justify-between items-center h-[400px] gap-4">
        
        {/* TX Terminal */}
        <div className="flex-1 h-full bg-black/80 rounded-xl border border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.3)] flex flex-col overflow-hidden">
          <div className="bg-blue-900/50 p-3 border-b border-blue-500/30 flex items-center gap-2">
            <RadioTower className="text-blue-400 w-5 h-5" />
            <span className="font-bold text-blue-200">COM3 - TX (Sender)</span>
          </div>
          <div className="p-4 font-mono text-sm text-green-400 flex-1 overflow-hidden flex flex-col justify-end">
            {txLogs.map(log => (
              <motion.div key={log.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                <span className="text-gray-500">[{log.time}]</span> {log.message}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Wireless Animation */}
        <div className="flex flex-col items-center justify-center px-4">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Wifi className="w-16 h-16 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
          </motion.div>
          <motion.div 
            className="flex gap-2 mt-4"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          >
            <div className="w-2 h-2 rounded-full bg-cyan-400" />
            <div className="w-2 h-2 rounded-full bg-cyan-400" />
            <div className="w-2 h-2 rounded-full bg-cyan-400" />
          </motion.div>
        </div>

        {/* RX Terminal */}
        <div className="flex-1 h-full bg-black/80 rounded-xl border border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.3)] flex flex-col overflow-hidden">
          <div className="bg-purple-900/50 p-3 border-b border-purple-500/30 flex items-center gap-2">
            <RadioReceiver className="text-purple-400 w-5 h-5" />
            <span className="font-bold text-purple-200">COM4 - RX (Receiver)</span>
          </div>
          <div className="p-4 font-mono text-sm text-pink-400 flex-1 overflow-hidden flex flex-col justify-end">
            {rxLogs.map(log => (
              <motion.div key={log.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                <span className="text-gray-500">[{log.time}]</span> {log.message}
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

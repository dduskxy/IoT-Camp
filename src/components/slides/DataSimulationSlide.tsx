'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RefreshCw, Send, Radio, Download } from 'lucide-react';

export function DataSimulationSlide() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [txCount, setTxCount] = useState(0);
  const [rxCount, setRxCount] = useState(0);
  const [isTransmitting, setIsTransmitting] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setTxCount((prev) => prev + 1);
        setIsTransmitting(true);
        
        setTimeout(() => {
          setRxCount((prev) => prev + 1);
          setIsTransmitting(false);
        }, 800); // 800ms travel time
        
      }, 2000); // Send every 2 seconds
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-white space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
          จำลองการส่งข้อมูล (Data Simulation)
        </h2>
        <p className="text-xl text-gray-300">
          สังเกตการเดินทางของ Data Packet จาก Transmitter ไปยัง Receiver
        </p>
      </div>

      <div className="flex items-center justify-center space-x-12 w-full max-w-4xl p-4 md:p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(59,130,246,0.3)] relative">
        
        {/* Transmitter */}
        <div className="flex flex-col items-center space-y-4 z-10">
          <div className="w-24 h-24 rounded-full bg-blue-500/20 border border-blue-400/50 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)]">
            <Send className="w-10 h-10 text-blue-400" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold">Transmitter (TX)</h3>
            <p className="text-2xl font-mono text-cyan-300 mt-2">Count: {txCount}</p>
          </div>
        </div>

        {/* Wireless Path */}
        <div className="flex-1 h-1 bg-gray-700 relative flex items-center justify-center">
          <Radio className="absolute -top-4 md:p-6 w-6 h-6 text-gray-500 animate-pulse" />
          
          {/* Animated Packet */}
          {isTransmitting && (
            <motion.div
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: '100%', opacity: [0, 1, 1, 0] }}
              transition={{ duration: 0.8, ease: 'linear' }}
              className="absolute left-0 w-8 h-4 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.8)]"
            />
          )}
        </div>

        {/* Receiver */}
        <div className="flex flex-col items-center space-y-4 z-10">
          <div className="w-24 h-24 rounded-full bg-purple-500/20 border border-purple-400/50 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.5)]">
            <Download className="w-10 h-10 text-purple-400" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold">Receiver (RX)</h3>
            <p className="text-2xl font-mono text-fuchsia-300 mt-2">Count: {rxCount}</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex space-x-6">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center px-6 py-3 bg-blue-600/80 hover:bg-blue-500 rounded-full transition-all shadow-[0_0_15px_rgba(37,99,235,0.5)] hover:shadow-[0_0_25px_rgba(37,99,235,0.8)]"
        >
          {isPlaying ? <Pause className="mr-2" /> : <Play className="mr-2" />}
          {isPlaying ? 'หยุด (Pause)' : 'เริ่ม (Play)'}
        </button>
        <button
          onClick={() => {
            setIsPlaying(false);
            setTxCount(0);
            setRxCount(0);
          }}
          className="flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-all border border-white/20"
        >
          <RefreshCw className="mr-2" /> รีเซ็ต (Reset)
        </button>
      </div>
    </div>
  );
}

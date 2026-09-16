'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Wifi, Laptop, ArrowRight } from 'lucide-react';

export function FinalChallengeSlide() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-white p-8">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
          ความท้าทายสุดท้าย (Final Challenge)
        </h2>
        <p className="text-2xl text-gray-300 mt-4">
          สร้างระบบ IoT พื้นฐานด้วยการประยุกต์ใช้สิ่งที่คุณเรียนรู้
        </p>
      </div>

      <div className="w-full max-w-5xl">
        <div className="relative flex items-center justify-between p-10 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(99,102,241,0.2)]">
          
          {/* Node 1 */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center z-10"
          >
            <div className="w-32 h-32 rounded-2xl bg-indigo-500/20 border border-indigo-400/50 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.4)] mb-4">
              <Cpu className="w-14 h-14 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold">Sensor Node</h3>
            <p className="text-gray-400 text-sm mt-1">Arduino + NRF24 (TX)</p>
            <div className="mt-3 px-3 py-1 bg-white/10 rounded text-xs font-mono">
              อ่านค่าจาก Sensor
            </div>
          </motion.div>

          {/* Arrow 1 */}
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex-1 flex items-center justify-center relative origin-left z-0 px-4"
          >
            <div className="w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
            <motion.div 
              animate={{ x: [0, 100, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute text-purple-300"
            >
              <Wifi className="w-6 h-6 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
            </motion.div>
          </motion.div>

          {/* Node 2 */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col items-center z-10"
          >
            <div className="w-32 h-32 rounded-2xl bg-purple-500/20 border border-purple-400/50 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)] mb-4">
              <Cpu className="w-14 h-14 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold">Gateway Node</h3>
            <p className="text-gray-400 text-sm mt-1">Arduino + NRF24 (RX)</p>
            <div className="mt-3 px-3 py-1 bg-white/10 rounded text-xs font-mono">
              รับค่าและส่งต่อ
            </div>
          </motion.div>

          {/* Arrow 2 */}
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="flex-1 flex items-center justify-center relative origin-left z-0 px-4"
          >
            <div className="w-full h-1 border-t-2 border-dashed border-pink-500/50" />
            <ArrowRight className="absolute text-pink-400 w-6 h-6" />
          </motion.div>

          {/* Node 3 */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="flex flex-col items-center z-10"
          >
            <div className="w-32 h-32 rounded-2xl bg-pink-500/20 border border-pink-400/50 flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.4)] mb-4">
              <Laptop className="w-14 h-14 text-pink-400" />
            </div>
            <h3 className="text-xl font-bold">Dashboard</h3>
            <p className="text-gray-400 text-sm mt-1">PC / Serial Monitor</p>
            <div className="mt-3 px-3 py-1 bg-white/10 rounded text-xs font-mono">
              แสดงผลข้อมูล
            </div>
          </motion.div>

        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="mt-16 text-center"
      >
        <p className="text-xl font-medium text-purple-300">
          "เมื่อทำสำเร็จ คุณพร้อมแล้วสำหรับการพัฒนาระบบ IoT ขั้นสูง"
        </p>
      </motion.div>
    </div>
  );
}

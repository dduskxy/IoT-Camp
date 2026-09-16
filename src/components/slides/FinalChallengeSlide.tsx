'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Radio, Lightbulb, MonitorCheck, ArrowRight } from 'lucide-react';

export function FinalChallengeSlide() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-white">
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="mb-8"
      >
        <div className="w-24 h-24 bg-yellow-500/20 rounded-full flex items-center justify-center border-2 border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.5)]">
          <Trophy className="w-12 h-12 text-yellow-400" />
        </div>
      </motion.div>

      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]">
          ภารกิจฐาน IoT สำเร็จ! 🎉
        </h2>
        <p className="text-xl md:text-2xl text-gray-300 mt-4">
          ยินดีด้วย! คุณได้สร้างระบบสื่อสารไร้สาย 1-to-Many ด้วยมือตัวเอง
        </p>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        
        {/* Card 1 */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-blue-500/30 flex flex-col items-center text-center hover:border-blue-400 transition-colors shadow-lg"
        >
          <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
            <Radio className="w-8 h-8 text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-blue-300 mb-2">เข้าใจ NRF24L01</h3>
          <p className="text-gray-400 text-sm">
            เรียนรู้วิธีตั้งค่า Address, Channel และการสื่อสารผ่านคลื่น 2.4GHz
          </p>
        </motion.div>

        {/* Card 2 */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-purple-500/30 flex flex-col items-center text-center hover:border-purple-400 transition-colors shadow-lg"
        >
          <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
            <MonitorCheck className="w-8 h-8 text-purple-400" />
          </div>
          <h3 className="text-xl font-bold text-purple-300 mb-2">Web Serial API</h3>
          <p className="text-gray-400 text-sm">
            เชื่อมต่อ Web Browser เข้ากับบอร์ด Arduino เพื่อดึงข้อมูล AI มาสั่งงานฮาร์ดแวร์
          </p>
        </motion.div>

        {/* Card 3 */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-emerald-500/30 flex flex-col items-center text-center hover:border-emerald-400 transition-colors shadow-lg"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
            <Lightbulb className="w-8 h-8 text-emerald-400" />
          </div>
          <h3 className="text-xl font-bold text-emerald-300 mb-2">Broadcast System</h3>
          <p className="text-gray-400 text-sm">
            ส่งข้อมูลชุดเดียว (จำนวนนิ้วมือ) ควบคุมสีไฟ LED ให้เปลี่ยนพร้อมกันทุกบอร์ด!
          </p>
        </motion.div>

      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 text-center flex flex-col items-center"
      >
        <p className="text-lg md:text-xl font-medium text-white/80 mb-4">
          ขอบคุณทุกคนที่ตั้งใจเรียนรู้! ขอให้สนุกกับการนำ IoT ไปสร้างสรรค์โปรเจกต์ของตัวเองนะครับ
        </p>
        <div className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full font-bold shadow-[0_0_20px_rgba(249,115,22,0.4)] flex items-center gap-2 animate-pulse">
          จบ Workshop อย่างเป็นทางการ! 🏆
        </div>
      </motion.div>
    </div>
  );
}

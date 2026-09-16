'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Target } from 'lucide-react';

const missions = [
  { id: 1, title: 'Wiring', desc: 'ต่อวงจร NRF24L01 กับบอร์ด Arduino ให้ถูกต้อง' },
  { id: 2, title: 'TX Ready', desc: 'อัปโหลดโค้ดฝั่งส่ง (Transmitter) สำเร็จ' },
  { id: 3, title: 'RX Ready', desc: 'อัปโหลดโค้ดฝั่งรับ (Receiver) สำเร็จ' },
  { id: 4, title: 'TX/RX Comm', desc: 'ทดสอบการส่งข้อมูลและรับข้อมูลผ่าน Serial Monitor' },
  { id: 5, title: 'Troubleshooting', desc: 'สามารถแก้ปัญหาเบื้องต้นได้ (ถ้ามี)' }
];

export function MissionsSlide() {
  const [completed, setCompleted] = useState<number[]>([]);

  const toggleMission = (id: number) => {
    setCompleted((prev) =>
      prev.includes(id) ? prev.filter((mId) => mId !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-white p-8">
      <div className="text-center mb-10">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center justify-center p-4 bg-green-500/20 rounded-full mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)]"
        >
          <Target className="w-12 h-12 text-green-400" />
        </motion.div>
        <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
          ภารกิจของคุณ (Missions)
        </h2>
        <p className="text-xl text-gray-300 mt-4">
          ทำภารกิจเหล่านี้ให้สำเร็จเพื่อเป็นผู้เชี่ยวชาญ IoT!
        </p>
      </div>

      <div className="w-full max-w-3xl space-y-4">
        {missions.map((mission, index) => {
          const isDone = completed.includes(mission.id);
          return (
            <motion.div
              key={mission.id}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => toggleMission(mission.id)}
              className={`flex items-center p-6 rounded-2xl cursor-pointer transition-all border ${
                isDone 
                  ? 'bg-green-500/10 border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.2)]' 
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              } backdrop-blur-md`}
            >
              <div className="mr-6">
                {isDone ? (
                  <CheckCircle2 className="w-8 h-8 text-green-400" />
                ) : (
                  <Circle className="w-8 h-8 text-gray-500" />
                )}
              </div>
              <div>
                <h3 className={`text-2xl font-semibold ${isDone ? 'text-green-300 line-through opacity-70' : 'text-white'}`}>
                  {mission.title}
                </h3>
                <p className={`text-lg mt-1 ${isDone ? 'text-gray-400' : 'text-gray-300'}`}>
                  {mission.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 text-xl font-mono text-emerald-400">
        Progress: {completed.length} / {missions.length}
      </div>
    </div>
  );
}

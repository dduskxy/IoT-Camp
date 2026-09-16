'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Target, Rocket } from 'lucide-react';

const missions = [
  { id: 1, title: 'Power Check (สำคัญมาก)', desc: 'ตรวจสอบสาย VCC ว่าต่อเข้า 3.3V แล้ว (ไม่ได้เผลอเสียบ 5V)' },
  { id: 2, title: 'Ground Check', desc: 'ตรวจสอบสาย GND ว่าต่อแน่นสนิท ไม่หลวม' },
  { id: 3, title: 'SPI Bus Check', desc: 'ตรวจสอบสาย MOSI (D11), MISO (D12), SCK (D13) ว่าไม่สลับเส้นกัน' },
  { id: 4, title: 'Control Check', desc: 'ตรวจสอบสาย CE (D9) และ CSN (D10) ว่าต่อตรงตามที่ระบุในโค้ด' },
  { id: 5, title: 'USB Connection', desc: 'เสียบสาย USB เข้าคอมพิวเตอร์ และเลือกพอร์ต (COM Port) ใน Arduino IDE ให้ถูกต้อง' }
];

export function MissionsSlide() {
  const [completed, setCompleted] = useState<number[]>([]);

  const toggleMission = (id: number) => {
    setCompleted((prev) =>
      prev.includes(id) ? prev.filter((mId) => mId !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-white">
      

      <div className="w-full max-w-3xl space-y-3">
        {missions.map((mission, index) => {
          const isDone = completed.includes(mission.id);
          return (
            <motion.div
              key={mission.id}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => toggleMission(mission.id)}
              className={`flex items-center p-4 md:p-6 rounded-2xl cursor-pointer transition-all border ${
                isDone 
                  ? 'bg-orange-500/10 border-orange-500/50 shadow-[0_0_20px_rgba(249,115,22,0.2)]' 
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              } backdrop-blur-md`}
            >
              <div className="mr-4 md:mr-6 shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8 text-orange-400" />
                ) : (
                  <Circle className="w-6 h-6 md:w-8 md:h-8 text-gray-500" />
                )}
              </div>
              <div>
                <h3 className={`text-lg md:text-2xl font-semibold ${isDone ? 'text-orange-300 line-through opacity-70' : 'text-white'}`}>
                  {mission.title}
                </h3>
                <p className={`text-sm md:text-lg mt-1 ${isDone ? 'text-gray-400' : 'text-gray-300'}`}>
                  {mission.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 text-lg md:text-xl font-mono text-orange-400">
        ความพร้อม: {completed.length} / {missions.length} 
        {completed.length === missions.length && " (พร้อมลุย!)"}
      </div>
    </div>
  );
}

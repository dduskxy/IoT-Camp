"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, Cpu, Wifi, Smartphone } from "lucide-react";

export function WhatIsIoTSlide() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full max-w-5xl mx-auto space-y-10 pt-4">
      

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 md:p-12 rounded-3xl shadow-[0_0_40px_rgba(59,130,246,0.3)] text-center relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-[80px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/20 blur-[80px] rounded-full"></div>
        
        <p className="text-2xl md:text-4xl font-medium leading-relaxed text-white relative z-10">
          "การที่<span className="text-blue-400 font-bold">อุปกรณ์ต่างๆ</span> สามารถเชื่อมต่อและ<span className="text-purple-400 font-bold">สื่อสารกัน</span>ผ่าน<span className="text-emerald-400 font-bold">อินเทอร์เน็ตหรือเครือข่าย</span>ได้ ทำให้เราสามารถสั่งการ ควบคุม หรือเก็บข้อมูลได้จากทุกที่"
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full"
      >
        {[
          { icon: Cpu, text: "Hardware (อุปกรณ์)", color: "text-blue-400", bg: "bg-blue-400/10" },
          { icon: Wifi, text: "Network (เครือข่าย)", color: "text-purple-400", bg: "bg-purple-400/10" },
          { icon: Globe, text: "Internet/Cloud (อินเทอร์เน็ต)", color: "text-emerald-400", bg: "bg-emerald-400/10" },
          { icon: Smartphone, text: "User App (แอปพลิเคชัน)", color: "text-orange-400", bg: "bg-orange-400/10" },
        ].map((item, i) => (
          <div key={i} className={`${item.bg} border border-white/10 rounded-2xl p-6 flex flex-col items-center gap-4 hover:scale-105 transition-transform`}>
            <item.icon className={`w-12 h-12 ${item.color}`} />
            <span className="font-bold text-white text-lg">{item.text}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

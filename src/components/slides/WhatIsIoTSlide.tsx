"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Thermometer, Cpu, Radio, MonitorSmartphone } from "lucide-react";

export function WhatIsIoTSlide() {
  const [activeNode, setActiveNode] = useState<number | null>(null);

  const nodes = [
    {
      id: 1,
      icon: Thermometer,
      title: "Sensor",
      desc: "อุปกรณ์ที่ตรวจจับสิ่งต่างๆ เช่น อุณหภูมิ แสง หรือการเคลื่อนไหว",
      color: "text-amber-400",
      bg: "bg-amber-400/10",
      border: "border-amber-400/30",
      shadow: "shadow-[0_0_30px_rgba(251,191,36,0.2)]"
    },
    {
      id: 2,
      icon: Cpu,
      title: "Controller",
      desc: "สมองของระบบ ทำหน้าที่อ่านข้อมูลและสั่งงาน (เช่น Arduino)",
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      border: "border-blue-400/30",
      shadow: "shadow-[0_0_30px_rgba(96,165,250,0.2)]"
    },
    {
      id: 3,
      icon: Radio,
      title: "Wireless",
      desc: "การส่งข้อมูลโดยไม่ต้องใช้สายระหว่างอุปกรณ์ (เช่น NRF24L01)",
      color: "text-purple-400",
      bg: "bg-purple-400/10",
      border: "border-purple-400/30",
      shadow: "shadow-[0_0_30px_rgba(192,132,252,0.2)]"
    },
    {
      id: 4,
      icon: MonitorSmartphone,
      title: "Dashboard",
      desc: "หน้าจอแสดงผลให้เราดูข้อมูลและควบคุมระบบได้",
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      border: "border-emerald-400/30",
      shadow: "shadow-[0_0_30px_rgba(52,211,153,0.2)]"
    }
  ];

  return (
    <div className="flex flex-col items-center w-full h-full max-w-4xl mx-auto space-y-16 pt-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center space-y-4 mb-4"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white">Internet of Things คืออะไร?</h2>
        <p className="text-slate-400 font-medium">คลิกที่ไอคอนด้านล่างเพื่อสำรวจแต่ละส่วนประกอบ</p>
      </motion.div>

      <div className="relative flex flex-col md:flex-row items-center justify-between w-full gap-6 md:gap-0">
        {/* Desktop connection lines */}
        <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-amber-500/20 via-blue-500/20 to-emerald-500/20 -translate-y-1/2 -z-10"></div>

        {nodes.map((node, index) => {
          const isActive = activeNode === node.id;
          return (
            <React.Fragment key={node.id}>
              {/* Mobile connection lines */}
              {index > 0 && <div className="md:hidden w-1 h-8 bg-white/10"></div>}
              
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveNode(isActive ? null : node.id)}
                className={`relative flex flex-col items-center justify-center p-4 rounded-3xl border border-white/10 transition-all duration-300 w-36 h-36 backdrop-blur-md
                  ${isActive ? `${node.bg} ${node.border} ${node.shadow} scale-110 z-10` : 'bg-white/5 hover:bg-white/10'}
                `}
              >
                <div className={`${isActive ? node.bg : 'bg-white/5'} ${node.color} p-4 rounded-2xl mb-3 transition-colors`}>
                  <node.icon className="w-8 h-8" />
                </div>
                <span className={`text-sm font-bold tracking-wide ${isActive ? 'text-white' : 'text-slate-400'}`}>
                  {node.title}
                </span>
              </motion.button>
            </React.Fragment>
          );
        })}
      </div>

      {/* Info Card */}
      <div className="w-full h-40 mt-6 perspective-[1000px]">
        <AnimatePresence mode="wait">
          {activeNode ? (
            <motion.div
              key={activeNode}
              initial={{ opacity: 0, rotateX: -20, y: 20 }}
              animate={{ opacity: 1, rotateX: 0, y: 0 }}
              exit={{ opacity: 0, rotateX: 20, y: -20 }}
              transition={{ duration: 0.4, type: "spring" }}
              className={`w-full h-full p-4 md:p-6 rounded-3xl border border-white/10 ${nodes.find(n => n.id === activeNode)?.bg} flex flex-col items-center justify-center text-center backdrop-blur-md ${nodes.find(n => n.id === activeNode)?.shadow}`}
            >
              <h3 className={`text-2xl font-black mb-3 ${nodes.find(n => n.id === activeNode)?.color}`}>
                {nodes.find(n => n.id === activeNode)?.title}
              </h3>
              <p className="text-white/80 font-medium text-lg max-w-2xl">
                {nodes.find(n => n.id === activeNode)?.desc}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full p-4 md:p-6 rounded-3xl border border-white/5 bg-white/[0.02] flex items-center justify-center text-slate-500 font-medium"
            >
              เลือกระบบด้านบนเพื่อดูรายละเอียดการทำงาน
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

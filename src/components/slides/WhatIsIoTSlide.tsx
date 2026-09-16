"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Thermometer, Cpu, Radio, MonitorSmartphone } from "lucide-react";

export function WhatIsIoTSlide() {
  const [activeNode, setActiveNode] = useState<number | null>(null);

  const nodes = [
    {
      id: 1,
      icon: Thermometer,
      title: "Sensor",
      desc: "อุปกรณ์ที่ตรวจจับสิ่งต่างๆ เช่น อุณหภูมิ แสง หรือการเคลื่อนไหว",
      color: "text-amber-500",
      bg: "bg-amber-100",
      border: "border-amber-200"
    },
    {
      id: 2,
      icon: Cpu,
      title: "Controller",
      desc: "สมองของระบบ ทำหน้าที่อ่านข้อมูลและสั่งงาน (เช่น Arduino)",
      color: "text-blue-500",
      bg: "bg-blue-100",
      border: "border-blue-200"
    },
    {
      id: 3,
      icon: Radio,
      title: "Wireless",
      desc: "การส่งข้อมูลโดยไม่ต้องใช้สายระหว่างอุปกรณ์ (เช่น NRF24L01)",
      color: "text-purple-500",
      bg: "bg-purple-100",
      border: "border-purple-200"
    },
    {
      id: 4,
      icon: MonitorSmartphone,
      title: "Dashboard",
      desc: "หน้าจอแสดงผลให้เราดูข้อมูลและควบคุมระบบได้",
      color: "text-emerald-500",
      bg: "bg-emerald-100",
      border: "border-emerald-200"
    }
  ];

  return (
    <div className="flex flex-col items-center w-full h-full max-w-3xl mx-auto space-y-12">
      <div className="text-center space-y-4 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Internet of Things คืออะไร?</h2>
        <p className="text-slate-500">คลิกที่ไอคอนด้านล่างเพื่อดูความหมายของแต่ละส่วนประกอบ</p>
      </div>

      <div className="relative flex flex-col md:flex-row items-center justify-between w-full gap-4 md:gap-0">
        {/* Desktop connection lines */}
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -translate-y-1/2 -z-10"></div>

        {nodes.map((node, index) => {
          const isActive = activeNode === node.id;
          return (
            <React.Fragment key={node.id}>
              {/* Mobile connection lines */}
              {index > 0 && <div className="md:hidden w-1 h-8 bg-slate-100"></div>}
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveNode(isActive ? null : node.id)}
                className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300 w-32 h-32 bg-white shadow-sm
                  ${isActive ? `${node.border} shadow-lg ring-4 ring-slate-50` : 'border-slate-100 hover:border-slate-300'}
                `}
              >
                <div className={`${node.bg} ${node.color} p-4 rounded-xl mb-3 transition-colors`}>
                  <node.icon className="w-8 h-8" />
                </div>
                <span className={`text-sm font-bold ${isActive ? 'text-slate-900' : 'text-slate-500'}`}>
                  {node.title}
                </span>
              </motion.button>
            </React.Fragment>
          );
        })}
      </div>

      {/* Info Card */}
      <div className="w-full h-32 mt-8">
        <motion.div
          key={activeNode || 'empty'}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full h-full"
        >
          {activeNode ? (
            <div className={`w-full h-full p-6 rounded-2xl border-2 ${nodes.find(n => n.id === activeNode)?.border} ${nodes.find(n => n.id === activeNode)?.bg} flex flex-col items-center justify-center text-center`}>
              <h3 className={`text-lg font-bold mb-2 ${nodes.find(n => n.id === activeNode)?.color}`}>
                {nodes.find(n => n.id === activeNode)?.title}
              </h3>
              <p className="text-slate-700 font-medium">
                {nodes.find(n => n.id === activeNode)?.desc}
              </p>
            </div>
          ) : (
            <div className="w-full h-full p-6 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center text-slate-400 font-medium">
              เลือกหัวข้อด้านบนเพื่อดูคำอธิบาย
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

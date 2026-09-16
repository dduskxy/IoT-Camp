"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Cpu, Wifi, Zap } from "lucide-react";

export function WelcomeSlide() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 100, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 100, mass: 0.5 });

  // 3D Tilt
  const rotateX = useTransform(smoothY, [-1, 1], [10, -10]);
  const rotateY = useTransform(smoothX, [-1, 1], [-10, 10]);
  
  // Glow movement
  const glowX = useTransform(smoothX, [-1, 1], ["-20%", "120%"]);
  const glowY = useTransform(smoothY, [-1, 1], ["-20%", "120%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width * 2 - 1;
    const y = (e.clientY - rect.top) / rect.height * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div 
      className="flex flex-col items-center justify-center w-full h-full max-w-4xl mx-auto pt-10 relative perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={containerRef}
      style={{ perspective: 1200 }}
    >
      {/* 3D WebGL Background using Iframe */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none flex justify-center items-center overflow-hidden mix-blend-screen scale-125">
        <iframe src="https://my.spline.design/6Wq1Q7YGyM-iab9i/" frameBorder="0" width="100%" height="100%" className="w-full h-full border-none"></iframe>
      </div>

      {/* Main Tilt Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.2, type: "spring", bounce: 0.4 }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="w-full relative z-10"
      >
        <div className="flex flex-col items-center text-center space-y-10">
          <motion.div 
            style={{ transform: "translateZ(40px)" }}
            className="bg-blue-500/10 border border-blue-500/20 text-blue-400 px-6 py-2 rounded-full text-xs font-black tracking-[0.2em] uppercase backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.3)]"
          >
            Welcome to the Workshop
          </motion.div>
          
          <motion.h2 
            style={{ transform: "translateZ(60px)", transformStyle: "preserve-3d" }}
            className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight drop-shadow-2xl"
          >
            ค่ายจำลอง <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 drop-shadow-[0_0_30px_rgba(99,102,241,0.5)]">
              Internet of Things
            </span>
          </motion.h2>
          
          <motion.div 
            style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
            className="bg-white/[0.02] backdrop-blur-2xl p-8 md:p-12 rounded-[2rem] border border-white/5 w-full max-w-2xl text-left shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden group"
          >
            {/* Dynamic Glow inside Card */}
            <motion.div 
              className="absolute w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none"
              style={{ left: glowX, top: glowY, translateX: "-50%", translateY: "-50%" }}
            />
            
            <h3 className="text-xl font-bold text-white mb-8 relative z-10 drop-shadow-md">สิ่งที่จะเรียนรู้ในวันนี้:</h3>
            <ul className="space-y-6 relative z-10">
              {[
                { text: "ทำความรู้จักอุปกรณ์ฮาร์ดแวร์ IoT (Arduino, เซ็นเซอร์)", icon: Cpu, color: "text-blue-400" },
                { text: "การเชื่อมต่อวงจร (Wiring) เบื้องต้น", icon: Zap, color: "text-yellow-400" },
                { text: "หลักการสื่อสารไร้สาย (Wireless Communication)", icon: Wifi, color: "text-purple-400" },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 group/item">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/5 text-white flex items-center justify-center border border-white/10 group-hover/item:scale-110 transition-transform shadow-lg">
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <span className="text-slate-300 font-medium group-hover/item:text-white transition-colors">{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Cpu, Radio, Activity, Code, Smartphone, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-[100dvh] bg-[#030303] text-white font-sans flex flex-col overflow-hidden relative selection:bg-blue-500/30">
      
      {/* High-end animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        {/* Glowing orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-indigo-600/20 blur-[120px]"
        />
      </div>

      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 z-10 relative mt-20 md:mt-0">
        <div className="max-w-5xl w-full flex flex-col items-center text-center space-y-12">
          
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl text-sm font-medium text-blue-200"
          >
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="tracking-wide uppercase text-xs font-bold">Interactive IoT Workshop</span>
          </motion.div>

          {/* Hero Content with Staggered Reveal */}
          <div className="space-y-6 max-w-4xl relative">
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[1.05]"
            >
              Smart Automation <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                Camp 2026
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light"
            >
              เรียนรู้ระบบ IoT ตั้งแต่พื้นฐาน เริ่มต้นจากการเชื่อมต่อฮาร์ดแวร์ การเขียนโค้ด 
              ไปจนถึงการส่งข้อมูลไร้สายด้วย NRF24L01 ในรูปแบบ Interactive เต็มหน้าจอ
            </motion.p>
          </div>

          {/* Magnetic Start Button */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="pt-8 pb-16 relative group"
          >
            <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
            <Link href="/workshop/1">
              <Button size="lg" className="relative h-16 px-10 text-lg rounded-full bg-white text-black hover:bg-slate-200 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(59,130,246,0.3)] transition-all duration-300 gap-3 border-none font-bold">
                เริ่มเข้าสู่บทเรียน
                <div className="bg-black/5 p-1.5 rounded-full overflow-hidden relative">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                  >
                    <ArrowRight className="w-5 h-5 text-black" />
                  </motion.div>
                </div>
              </Button>
            </Link>
          </motion.div>

          {/* Feature Grid with Hover Effects */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl"
          >
            {[
              { icon: Cpu, label: "Hardware", desc: "รู้จักอุปกรณ์จริง", color: "text-blue-400", glow: "group-hover:shadow-[0_0_30px_rgba(96,165,250,0.3)]" },
              { icon: Activity, label: "Wiring", desc: "จำลองการต่อสาย", color: "text-emerald-400", glow: "group-hover:shadow-[0_0_30px_rgba(52,211,153,0.3)]" },
              { icon: Code, label: "Coding", desc: "โค้ด TX & RX", color: "text-indigo-400", glow: "group-hover:shadow-[0_0_30px_rgba(129,140,248,0.3)]" },
              { icon: Radio, label: "Wireless", desc: "ส่งข้อมูลหากัน", color: "text-purple-400", glow: "group-hover:shadow-[0_0_30px_rgba(192,132,252,0.3)]" },
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -5 }}
                className={`group bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 flex flex-col items-center text-center transition-all duration-300 ${feature.glow}`}
              >
                <div className={`bg-white/5 p-4 rounded-2xl mb-4 ${feature.color} border border-white/5 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-white mb-1 tracking-wide">{feature.label}</h3>
                <p className="text-xs text-slate-400 font-medium">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-8 text-center text-slate-500 text-sm font-medium flex items-center justify-center gap-2 z-10">
        <Smartphone className="w-4 h-4" /> รองรับการใช้งานทั้งบนมือถือ แท็บเล็ต และคอมพิวเตอร์
      </footer>
    </div>
  );
}

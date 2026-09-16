"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { ArduinoUno } from "../hardware/ArduinoUno";
import { NRF24L01 } from "../hardware/NRF24L01";

export function NRF24Slide() {
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);

  const connections = [
    { nrf: "VCC", ctrl: "3.3V", desc: "ไฟเลี้ยง 3.3V ห้ามต่อ 5V เด็ดขาด!", color: "text-red-400", bg: "bg-red-500", border: "border-red-400" },
    { nrf: "GND", ctrl: "GND", desc: "กราวด์ (Ground)", color: "text-gray-400", bg: "bg-[#8B4513]", border: "border-[#A0522D]" },
    { nrf: "CE", ctrl: "D9", desc: "Chip Enable (สั่งให้ชิปทำงาน)", color: "text-purple-400", bg: "bg-purple-500", border: "border-purple-400" },
    { nrf: "CSN", ctrl: "D10", desc: "Chip Select Not (เริ่มคุย SPI)", color: "text-blue-400", bg: "bg-blue-500", border: "border-blue-400" },
    { nrf: "SCK", ctrl: "D13", desc: "SPI Clock (สัญญาณนาฬิกา)", color: "text-orange-400", bg: "bg-orange-500", border: "border-orange-400" },
    { nrf: "MOSI", ctrl: "D11", desc: "Master Out Slave In (ส่งข้อมูลเข้า)", color: "text-yellow-400", bg: "bg-yellow-400", border: "border-yellow-300" },
    { nrf: "MISO", ctrl: "D12", desc: "Master In Slave Out (รับข้อมูลออก)", color: "text-green-400", bg: "bg-green-500", border: "border-green-400" },
  ];

  const activeConnections = connections.reduce((acc, curr) => {
    acc[curr.nrf] = curr.ctrl;
    return acc;
  }, {} as Record<string, string>);

  const nrfPinColors = connections.reduce((acc, curr) => {
    acc[curr.nrf] = `${curr.bg} ${curr.border} transition-all duration-300 ${hoveredPin === curr.nrf ? 'shadow-[0_0_20px_rgba(255,255,255,0.8)] scale-125 z-20 opacity-100' : 'opacity-60'}`;
    return acc;
  }, {} as Record<string, string>);

  const arduinoPinColors = connections.reduce((acc, curr) => {
    acc[curr.ctrl] = `${curr.bg} ${curr.border} transition-all duration-300 ${hoveredPin === curr.nrf ? 'shadow-[0_0_20px_rgba(255,255,255,0.8)] scale-125 z-20 opacity-100' : 'opacity-60'}`;
    return acc;
  }, {} as Record<string, string>);

  return (
    <div className="w-full h-full flex flex-col items-center justify-start bg-transparent text-white pt-2 pb-10 overflow-y-auto custom-scrollbar">
      <motion.div 
        className="w-full max-w-5xl bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-md shadow-[0_0_40px_rgba(139,92,246,0.15)] flex flex-col gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center space-y-3">
          <h2 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            โครงสร้างและขาเชื่อมต่อ (Pinout)
          </h2>
          <p className="text-slate-300 text-sm md:text-base">
            โมดูล NRF24L01 สื่อสารกับ Arduino ผ่านระบบ SPI (Serial Peripheral Interface) <br className="hidden md:block" />
            <span className="text-emerald-400 font-medium">ลองเอาเมาส์ชี้ที่ตารางการเชื่อมต่อด้านขวา</span> เพื่อดูตำแหน่งขาบนบอร์ดให้ชัดเจนขึ้น
          </p>
        </div>

        <div className="flex flex-col xl:flex-row items-center justify-between gap-10">
          
          {/* Visual Hardware Area */}
          <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 w-full">
            <div className="flex flex-col items-center relative">
              <div className="absolute -top-10 text-purple-300 font-bold bg-purple-900/40 px-4 py-1 rounded-full border border-purple-500/30 whitespace-nowrap">NRF24L01</div>
              <NRF24L01 
                selectedPin={hoveredPin}
                activeConnections={activeConnections}
                pinColors={nrfPinColors}
              />
            </div>

            <div className="hidden md:flex flex-col items-center justify-center">
              <motion.div 
                className="h-1 w-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </div>

            <div className="flex flex-col items-center relative mt-10 md:mt-0">
              <div className="absolute -top-10 text-blue-300 font-bold bg-blue-900/40 px-4 py-1 rounded-full border border-blue-500/30 whitespace-nowrap">Arduino Uno</div>
              <div className="scale-75 md:scale-90 origin-top">
                <ArduinoUno 
                  selectedPin={null}
                  activeConnections={Object.entries(activeConnections).reduce((acc, [k, v]) => ({...acc, [v]: k}), {})}
                  pinColors={arduinoPinColors}
                />
              </div>
            </div>
          </div>

          {/* Connection Table Area */}
          <div className="w-full xl:w-[450px] bg-black/40 border border-white/10 rounded-2xl p-6 relative shadow-[0_0_20px_rgba(59,130,246,0.1)]">
            <div className="flex items-center gap-3 mb-6">
              <Info className="text-blue-400" size={24} />
              <h3 className="text-lg font-semibold">ตารางการเชื่อมต่อ</h3>
            </div>
            <div className="space-y-3">
              {connections.map((c, i) => {
                const isHovered = hoveredPin === c.nrf;
                return (
                  <motion.div 
                    key={`conn-${i}`} 
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                      isHovered 
                        ? 'bg-white/10 border-white/30 scale-[1.02] shadow-lg shadow-white/5' 
                        : 'bg-white/5 border-white/5 hover:bg-white/10'
                    }`}
                    onMouseEnter={() => setHoveredPin(c.nrf)}
                    onMouseLeave={() => setHoveredPin(null)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full border ${c.bg} ${c.border} ${isHovered ? 'animate-pulse shadow-[0_0_10px_currentColor]' : ''}`}></div>
                      <span className={`font-mono font-bold w-12 ${c.color}`}>{c.nrf}</span>
                      <span className="text-gray-500 text-xs">→</span>
                      <span className={`font-mono font-bold w-12 text-blue-300`}>{c.ctrl}</span>
                    </div>
                    <div className="text-xs text-gray-400 text-right max-w-[140px] leading-tight">
                      {c.desc}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          
        </div>
      </motion.div>
    </div>
  );
}

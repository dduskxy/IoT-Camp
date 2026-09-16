"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Layers, Radio, Split, Lightbulb, Monitor, Usb, Info } from "lucide-react";

const EQUIPMENTS = [
  { id: 1, name: "Arduino Uno", icon: Cpu, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/38/Arduino_Uno_-_R3.jpg", function: "สมองกล", detail: "ทำหน้าที่ประมวลผลคำสั่งที่รับมา อ่านค่าจากเซ็นเซอร์ และควบคุมอุปกรณ์" },
  { id: 2, name: "Grove Base Shield", icon: Layers, imageUrl: "https://raw.githubusercontent.com/SeeedDocument/Base_Shield_V2/master/img/Base_shield_v2.1.jpg", function: "บอร์ดขยายพอร์ต", detail: "สวมทับ Arduino เพื่อให้ง่ายต่อการต่ออุปกรณ์ Grove โดยไม่ต้องใช้สายโยง" },
  { id: 3, name: "NRF24L01", icon: Radio, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/15/NRF24L01.jpg", function: "โมดูลสื่อสาร", detail: "ใช้รับส่งสัญญาณวิทยุความถี่ 2.4GHz ให้ Arduino สื่อสารกันได้ระยะไกล" },
  { id: 4, name: "สายจัมเปอร์ (Jumper)", icon: Split, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/73/Jumper_Wires_-_Male_to_Male.jpg", function: "สายเชื่อมต่อ", detail: "เชื่อมต่อสัญญาณไฟฟ้าระหว่างโมดูลไร้สายกับบอร์ด" },
  { id: 5, name: "Grove RGB LED", icon: Lightbulb, imageUrl: "https://raw.githubusercontent.com/SeeedDocument/Grove-Chainable_RGB_LED/master/img/Grove-Chainable_RGB_LED_V2.0.jpg", function: "หลอดไฟเปลี่ยนสี", detail: "หลอดไฟ LED ที่ผสมสี RGB และต่อกันแบบลูกโซ่ (Chainable) ได้" },
  { id: 6, name: "Computer", icon: Monitor, imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800", function: "เครื่องเขียนอัปโหลด", detail: "ใช้สำหรับเขียนโค้ด อัปโหลดลงบอร์ด และเปิดหน้าเว็บ AI ดูการนับนิ้ว" },
  { id: 7, name: "Serial/USB Cable", icon: Usb, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/07/USB_Type-B_plug.jpg", function: "สายจ่ายไฟ/รับส่งข้อมูล", detail: "ใช้จ่ายไฟและรับส่งข้อมูล (Serial) ระหว่างคอมพิวเตอร์กับบอร์ด (หัวแบบ USB Type-B)" },
];

export function HardwareSlide() {
  const [selectedEq, setSelectedEq] = useState(EQUIPMENTS[0]);

  return (
    <div className="w-full h-full flex flex-col md:flex-row gap-6 bg-transparent text-white font-sans">
      {/* Left List */}
      <motion.div 
        className="flex-1 bg-white/[0.02] border border-white/5 rounded-2xl p-4 md:p-6 backdrop-blur-xl relative shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] flex flex-col"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="grid grid-cols-1 gap-3 overflow-y-auto custom-scrollbar pr-2 flex-1">
          {EQUIPMENTS.map((eq) => {
            const Icon = eq.icon;
            const isSelected = selectedEq.id === eq.id;
            return (
              <button
                key={eq.id}
                onClick={() => setSelectedEq(eq)}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 border text-left
                  ${isSelected 
                    ? "bg-indigo-500/20 border-indigo-400/50 shadow-[0_0_15px_rgba(99,102,241,0.2)]" 
                    : "bg-white/5 border-white/10 hover:bg-white/10"}`}
              >
                <div className={`p-3 rounded-lg ${isSelected ? "bg-indigo-500/30 text-indigo-300" : "bg-white/10 text-slate-300"}`}>
                  <Icon size={24} />
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold text-lg ${isSelected ? "text-indigo-300" : "text-white"}`}>{eq.name}</h3>
                  <p className="text-sm text-slate-400">{eq.function}</p>
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Right Detail Panel */}
      <motion.div 
        className="flex-1 flex flex-col gap-6"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedEq.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex-1 bg-white/[0.02] border border-white/5 rounded-2xl p-6 backdrop-blur-xl flex flex-col items-center justify-center relative overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] group"
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Real Image Container */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl mb-8 group-hover:scale-[1.02] transition-transform duration-500 bg-white/5 flex items-center justify-center">
              <img 
                src={selectedEq.imageUrl} 
                alt={selectedEq.name}
                className="w-full h-full object-contain opacity-100 transition-opacity p-4"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-4 left-6 flex items-center gap-3">
                <div className="p-2 bg-indigo-500/30 backdrop-blur-md rounded-lg text-indigo-300 border border-indigo-400/30">
                  <selectedEq.icon size={24} />
                </div>
                <h3 className="text-3xl font-bold text-white drop-shadow-md">{selectedEq.name}</h3>
              </div>
            </div>

            {/* Description Box */}
            <div className="bg-black/40 backdrop-blur-md w-full p-6 rounded-xl border border-white/10 relative z-10">
              <div className="flex items-center gap-2 mb-3 text-indigo-400">
                <Info size={20} />
                <span className="font-semibold uppercase tracking-wider text-sm">หน้าที่หลัก</span>
              </div>
              <p className="text-lg text-slate-300 leading-relaxed">
                {selectedEq.detail}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

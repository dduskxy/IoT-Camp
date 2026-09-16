const fs = require('fs');

const hwSlidePath = 'C:/Users/asus/Documents/GitHub/IoT-Camp/src/components/slides/HardwareSlide.tsx';
const hwCode = `"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Layers, Radio, Split, Lightbulb, Monitor, Usb, Info } from "lucide-react";

const EQUIPMENTS = [
  { id: 1, name: "Arduino", icon: Cpu, function: "บอร์ดสมองกล", detail: "ทำหน้าที่เป็นสมองประมวลผลคำสั่งทั้งหมด อ่านค่าจากเซ็นเซอร์และสั่งงานอุปกรณ์อื่นๆ" },
  { id: 2, name: "Grove Base Shield", icon: Layers, function: "บอร์ดขยายพอร์ต", detail: "สวมทับบน Arduino เพื่อให้เสียบสายต่ออุปกรณ์ Grove ได้ง่ายขึ้นโดยไม่ต้องต่อวงจรเอง" },
  { id: 3, name: "NRF24L01", icon: Radio, function: "โมดูลสื่อสารไร้สาย", detail: "ตัวรับส่งสัญญาณวิทยุ 2.4GHz ทำให้บอร์ด Arduino สื่อสารกันได้โดยไม่ต้องใช้สาย" },
  { id: 4, name: "สายจัมเปอร์ (Jumper)", icon: Split, function: "สายเชื่อมต่อวงจร", detail: "ใช้เสียบเชื่อมต่อสัญญาณและไฟเลี้ยงระหว่างโมดูลกับบอร์ด" },
  { id: 5, name: "Grove RGB LED", icon: Lightbulb, function: "หลอดไฟเปลี่ยนสีได้", detail: "หลอดไฟ LED ที่สามารถผสมสี RGB และต่อกันเป็นลูกโซ่ (Chainable) ได้" },
  { id: 6, name: "Computer", icon: Monitor, function: "เครื่องสั่งการและมอนิเตอร์", detail: "ใช้สำหรับเขียนโค้ด อัปโหลดโปรแกรม และรันหน้าเว็บ AI เพื่อส่งคำสั่งมือ" },
  { id: 7, name: "Serial/USB Cable", icon: Usb, function: "สายรับส่งข้อมูล", detail: "สายสำหรับจ่ายไฟให้บอร์ดและรับส่งข้อมูล (Serial) ระหว่างบอร์ดกับคอมพิวเตอร์" },
];

export function HardwareSlide() {
  const [selectedEq, setSelectedEq] = useState(EQUIPMENTS[0]);

  return (
    <div className="w-full h-full flex flex-col md:flex-row gap-6 bg-transparent text-white font-sans">
      <motion.div 
        className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 backdrop-blur-md relative shadow-[0_0_30px_rgba(59,130,246,0.1)] flex flex-col"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">
          อุปกรณ์ที่ต้องใช้ในแคมป์
        </h2>
        
        <div className="grid grid-cols-1 gap-3 overflow-y-auto custom-scrollbar pr-2 flex-1">
          {EQUIPMENTS.map((eq) => {
            const Icon = eq.icon;
            const isSelected = selectedEq.id === eq.id;
            return (
              <motion.button
                key={eq.id}
                onClick={() => setSelectedEq(eq)}
                className={\`p-4 rounded-xl flex items-center gap-4 transition-all duration-300 border \${isSelected ? 'bg-blue-500/20 border-blue-400/50 shadow-[0_0_20px_rgba(59,130,246,0.4)]' : 'bg-white/5 border-white/10 hover:bg-white/10'}\`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={\`p-2 rounded-lg \${isSelected ? 'bg-blue-500/30' : 'bg-white/10'}\`}>
                  <Icon className={isSelected ? 'text-blue-400' : 'text-gray-400'} size={24} />
                </div>
                <div className="text-left">
                  <span className={\`block font-bold text-lg \${isSelected ? 'text-blue-300' : 'text-white'}\`}>{eq.name}</span>
                  <span className="text-sm text-gray-400">{eq.function}</span>
                </div>
              </motion.button>
            )
          })}
        </div>
      </motion.div>

      <motion.div 
        className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 md:p-8 backdrop-blur-md flex flex-col justify-center"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedEq.id}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center text-center h-full justify-center"
          >
            <div className="p-8 bg-gradient-to-br from-blue-900/40 to-purple-900/40 rounded-full border border-blue-400/30 shadow-[0_0_40px_rgba(59,130,246,0.2)] mb-8">
              <selectedEq.icon className="text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" size={80} />
            </div>
            
            <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
              {selectedEq.name}
            </h3>
            
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 w-full max-w-md">
              <p className="text-blue-300 font-semibold text-lg mb-2">{selectedEq.function}</p>
              <p className="text-gray-300 text-lg leading-relaxed">{selectedEq.detail}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
`;

fs.writeFileSync(hwSlidePath, hwCode);
console.log('Updated HardwareSlide');

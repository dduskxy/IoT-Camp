"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Zap, Activity, Hash, Info } from "lucide-react";

const PINS = [
  { id: "digital", name: "Digital Pins", icon: Hash, function: "ส่ง/รับสัญญาณดิจิทัล (0 หรือ 1)", example: "เปิด/ปิด LED, อ่านปุ่มกด", note: "รวมถึง PWM สำหรับควบคุมความสว่างหรือความเร็ว" },
  { id: "analog", name: "Analog Pins", icon: Activity, function: "อ่านค่าแรงดันไฟฟ้าต่อเนื่อง", example: "เซ็นเซอร์แสง, เซ็นเซอร์ความชื้น", note: "แปลงสัญญาณอนาล็อกเป็นดิจิทัล (ADC)" },
  { id: "power", name: "Power Pins", icon: Zap, function: "จ่ายไฟ 5V, 3.3V และ GND", example: "แหล่งพลังงานสำหรับเซ็นเซอร์", note: "ระวังการใช้กระแสเกินขีดจำกัดของบอร์ด" },
  { id: "spi", name: "SPI Pins (11,12,13)", icon: Cpu, function: "สื่อสารข้อมูลความเร็วสูง", example: "เชื่อมต่อ NRF24L01, SD Card", note: "SCK, MOSI, MISO" },
];

export function HardwareSlide() {
  const [selectedPin, setSelectedPin] = useState(PINS[0]);

  return (
    <div className="w-full h-full flex flex-col md:flex-row gap-6 bg-transparent text-white font-sans">
      {/* Board Layout (Simplified) */}
      <motion.div 
        className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 backdrop-blur-md relative shadow-[0_0_30px_rgba(59,130,246,0.1)]"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">ส่วนประกอบบอร์ดไมโครคอนโทรลเลอร์</h2>
        
        <div className="grid grid-cols-2 gap-4">
          {PINS.map((pin) => {
            const Icon = pin.icon;
            const isSelected = selectedPin.id === pin.id;
            return (
              <motion.button
                key={pin.id}
                onClick={() => setSelectedPin(pin)}
                className={`p-4 rounded-xl flex items-center gap-3 transition-all duration-300 border ${isSelected ? 'bg-blue-500/20 border-blue-400/50 shadow-[0_0_20px_rgba(59,130,246,0.4)]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className={isSelected ? 'text-blue-400' : 'text-gray-400'} size={24} />
                <span className="font-semibold">{pin.name}</span>
              </motion.button>
            )
          })}
        </div>

        {/* Mockup visual of board */}
        <div className="mt-8 border border-white/10 rounded-xl p-4 bg-black/30 flex items-center justify-center min-h-[200px]">
          <div className="text-gray-400 flex flex-col items-center gap-2">
            <Cpu size={48} className="opacity-50" />
            <span>Interactive Board Area</span>
          </div>
        </div>
      </motion.div>

      {/* Details Panel */}
      <motion.div 
        className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 backdrop-blur-md"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedPin.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col h-full"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-500/20 rounded-lg border border-blue-400/30">
                <selectedPin.icon className="text-blue-400" size={32} />
              </div>
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {selectedPin.name}
              </h3>
            </div>

            <div className="space-y-6">
              <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                <p className="text-gray-400 text-sm mb-1 uppercase tracking-wider">หน้าที่หลัก (Function)</p>
                <p className="text-lg">{selectedPin.function}</p>
              </div>

              <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                <p className="text-gray-400 text-sm mb-1 uppercase tracking-wider">ตัวอย่างการใช้งาน (Example)</p>
                <p className="text-lg">{selectedPin.example}</p>
              </div>

              <div className="mt-auto bg-blue-900/20 p-4 rounded-xl border border-blue-500/20 flex items-start gap-3">
                <Info className="text-blue-400 mt-1 flex-shrink-0" size={20} />
                <p className="text-blue-200 text-sm">{selectedPin.note}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

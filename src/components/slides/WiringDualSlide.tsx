"use client";
import { motion } from "framer-motion";
import { RadioTower, Send, Smartphone } from "lucide-react";

export function WiringDualSlide() {
  return (
    <div className="w-full h-full p-6 flex flex-col justify-center bg-transparent text-white font-sans">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">ระบบสื่อสาร 2 ฝั่ง (TX & RX)</h2>
        <p className="text-gray-400 mt-2">ภาพรวมการเชื่อมต่อระบบ IoT เต็มรูปแบบ</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center justify-center max-w-6xl mx-auto w-full">
        {/* TX Node (Transmitter) */}
        <motion.div 
          className="flex-1 bg-white/5 border border-blue-500/20 rounded-3xl p-8 backdrop-blur-md shadow-[0_0_40px_rgba(59,130,246,0.1)] relative overflow-hidden"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Send size={100} />
          </div>
          
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <Send className="text-blue-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-blue-400">Transmitter (TX)</h3>
              <p className="text-sm text-gray-400">ฝั่งส่งข้อมูล (เช่น เซ็นเซอร์, รีโมท)</p>
            </div>
          </div>

          <div className="space-y-4 relative z-10">
            <div className="p-4 bg-black/40 rounded-xl border border-white/5">
              <p className="font-semibold text-gray-200 mb-2">Microcontroller</p>
              <ul className="text-sm text-gray-400 list-disc list-inside space-y-1">
                <li>อ่านค่าจากเซ็นเซอร์</li>
                <li>เตรียมแพ็คเกจข้อมูล</li>
              </ul>
            </div>
            <div className="p-4 bg-blue-900/20 rounded-xl border border-blue-500/20">
              <p className="font-semibold text-blue-200 mb-2">NRF24L01 (TX Mode)</p>
              <p className="text-sm text-blue-300/70">ต่อวงจร SPI + CE/CSN</p>
            </div>
          </div>
        </motion.div>

        {/* Wireless Signal */}
        <motion.div 
          className="flex flex-col items-center justify-center py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <RadioTower size={48} className="text-purple-400 mb-4" />
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={`wave-${i}`}
                className="w-2 h-2 rounded-full bg-purple-400"
                animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
              />
            ))}
          </div>
          <p className="text-xs text-purple-300 mt-4 font-mono">2.4 GHz RF</p>
        </motion.div>

        {/* RX Node (Receiver) */}
        <motion.div 
          className="flex-1 bg-white/5 border border-pink-500/20 rounded-3xl p-8 backdrop-blur-md shadow-[0_0_40px_rgba(236,72,153,0.1)] relative overflow-hidden"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Smartphone size={100} />
          </div>

          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="p-3 bg-pink-500/20 rounded-xl">
              <Smartphone className="text-pink-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-pink-400">Receiver (RX)</h3>
              <p className="text-sm text-gray-400">ฝั่งรับข้อมูล (เช่น จอแสดงผล, ควบคุมรีเลย์)</p>
            </div>
          </div>

          <div className="space-y-4 relative z-10">
            <div className="p-4 bg-pink-900/20 rounded-xl border border-pink-500/20">
              <p className="font-semibold text-pink-200 mb-2">NRF24L01 (RX Mode)</p>
              <p className="text-sm text-pink-300/70">เปิดท่อรับข้อมูล (Pipe) รอฟังตลอดเวลา</p>
            </div>
            <div className="p-4 bg-black/40 rounded-xl border border-white/5">
              <p className="font-semibold text-gray-200 mb-2">Microcontroller</p>
              <ul className="text-sm text-gray-400 list-disc list-inside space-y-1">
                <li>ประมวลผลคำสั่ง</li>
                <li>สั่งงาน Actuators</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

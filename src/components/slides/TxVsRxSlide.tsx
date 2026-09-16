'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { RadioReceiver, RadioTower, ArrowRight, Zap } from 'lucide-react';

export function TxVsRxSlide() {
  const [activeTab, setActiveTab] = useState<'TX' | 'RX' | null>(null);

  return (
    <div className="flex flex-col h-full w-full p-4 md:p-6 text-white bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-4 text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]"
      >
        เปรียบเทียบหน้าที่ TX (ผู้ส่ง) และ RX (ผู้รับ)
      </motion.h2>
      
      <div className="flex flex-row justify-center items-stretch gap-4 md:p-6 h-full">
        {/* TX Side */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          onClick={() => setActiveTab('TX')}
          className={`flex-1 p-6 rounded-xl border cursor-pointer transition-all ${activeTab === 'TX' ? 'bg-blue-500/20 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.5)]' : 'bg-black/40 border-white/10 hover:border-blue-400/50'}`}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <RadioTower className="w-12 h-12 text-blue-400" />
            <h3 className="text-3xl font-bold text-blue-400">Transmitter (TX)</h3>
          </div>
          <ul className="space-y-4 text-xl">
            <li className="flex items-center gap-3"><Zap className="w-6 h-6 text-yellow-400" /> <span><code className="text-pink-400 bg-pink-400/10 px-2 py-1 rounded">openWritingPipe()</code> - กำหนดท่อสำหรับส่งข้อมูล</span></li>
            <li className="flex items-center gap-3"><Zap className="w-6 h-6 text-yellow-400" /> <span><code className="text-pink-400 bg-pink-400/10 px-2 py-1 rounded">stopListening()</code> - หยุดโหมดการรับ เพื่อเตรียมส่ง</span></li>
            <li className="flex items-center gap-3"><Zap className="w-6 h-6 text-yellow-400" /> <span><code className="text-pink-400 bg-pink-400/10 px-2 py-1 rounded">write()</code> - ส่งข้อมูลออกไปบนคลื่นวิทยุ</span></li>
          </ul>
          {activeTab === 'TX' && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-6 p-4 bg-blue-900/40 rounded-lg border border-blue-500/30">
              <p className="text-lg text-blue-200">
                ตัวส่งทำหน้าที่คล้ายสถานีวิทยุกระจายเสียง โดยจะเปิดท่อสื่อสาร (Pipe) จากนั้นปิดหูรับฟังชั่วคราวเพื่อลดสัญญาณรบกวน แล้วจึงกระจายข้อมูลออกสู่อากาศ!
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Divider / Wave */}
        <div className="flex flex-col items-center justify-center text-blue-500">
          <motion.div 
            animate={{ x: [0, 20, 0] }} 
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ArrowRight className="w-12 h-12" />
          </motion.div>
          <span className="text-sm mt-2 opacity-50">2.4GHz</span>
        </div>

        {/* RX Side */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          onClick={() => setActiveTab('RX')}
          className={`flex-1 p-6 rounded-xl border cursor-pointer transition-all ${activeTab === 'RX' ? 'bg-purple-500/20 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.5)]' : 'bg-black/40 border-white/10 hover:border-purple-400/50'}`}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <RadioReceiver className="w-12 h-12 text-purple-400" />
            <h3 className="text-3xl font-bold text-purple-400">Receiver (RX)</h3>
          </div>
          <ul className="space-y-4 text-xl">
            <li className="flex items-center gap-3"><Zap className="w-6 h-6 text-yellow-400" /> <span><code className="text-pink-400 bg-pink-400/10 px-2 py-1 rounded">openReadingPipe()</code> - เปิดท่อสำหรับรับข้อมูลให้ตรงกับผู้ส่ง</span></li>
            <li className="flex items-center gap-3"><Zap className="w-6 h-6 text-yellow-400" /> <span><code className="text-pink-400 bg-pink-400/10 px-2 py-1 rounded">startListening()</code> - เริ่มดักฟังข้อมูลในอากาศ</span></li>
            <li className="flex items-center gap-3"><Zap className="w-6 h-6 text-yellow-400" /> <span><code className="text-pink-400 bg-pink-400/10 px-2 py-1 rounded">available()</code> & <code className="text-pink-400 bg-pink-400/10 px-2 py-1 rounded">read()</code> - ตรวจสอบว่ามีข้อมูลเข้ามาหรือไม่ และอ่านค่า</span></li>
          </ul>
          {activeTab === 'RX' && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-6 p-4 bg-purple-900/40 rounded-lg border border-purple-500/30">
              <p className="text-lg text-purple-200">
                ตัวรับทำหน้าที่คล้ายวิทยุที่บ้าน โดยจะจูนคลื่นให้ตรงกับผู้ส่ง (เปิดท่ออ่าน) จากนั้นคอยดักฟัง (startListening) เมื่อมีสัญญาณมาก็จะอ่านข้อมูลมาใช้งาน (available / read)
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

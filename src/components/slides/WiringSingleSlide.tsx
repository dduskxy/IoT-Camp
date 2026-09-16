'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCcw, XCircle, Info, ChevronRight, AlertTriangle, Zap, CheckCircle2 } from 'lucide-react';
import { ArduinoUno } from "../hardware/ArduinoUno";
import { NRF24L01, NRF_PINS } from "../hardware/NRF24L01";

const TARGET_WIRING: Record<string, string> = {
  "CE": "D9",
  "CSN": "D10",
  "SCK": "D13",
  "MOSI": "D11",
  "MISO": "D12",
  "VCC": "3.3V",
  "GND": "GND"
};

const WIRE_COLORS: Record<string, string> = {
  "GND": "bg-black border-gray-600",
  "VCC": "bg-red-500 border-red-400",
  "CE": "bg-orange-500 border-orange-400",
  "CSN": "bg-yellow-500 border-yellow-400",
  "SCK": "bg-green-500 border-green-400",
  "MOSI": "bg-blue-500 border-blue-400",
  "MISO": "bg-purple-500 border-purple-400",
};

const STEPS = [
  {
    id: 1,
    title: 'ขั้นที่ 1: สายไฟเลี้ยงบอร์ด (Power)',
    desc: 'สำคัญที่สุด! NRF24L01 รับไฟได้แค่ 3.3V เท่านั้น ห้ามต่อเข้า 5V เด็ดขาด บอร์ดจะพังทันที',
    requiredPins: ['VCC', 'GND'],
    icon: <AlertTriangle className="text-red-400" />
  },
  {
    id: 2,
    title: 'ขั้นที่ 2: ถนนส่งข้อมูล (SPI Bus)',
    desc: 'สาย 3 เส้นนี้ทำหน้าที่เป็นถนนความเร็วสูงให้ข้อมูลวิ่งไปมาระหว่าง Arduino กับ NRF24',
    requiredPins: ['MOSI', 'MISO', 'SCK'],
    icon: <Zap className="text-blue-400" />
  },
  {
    id: 3,
    title: 'ขั้นที่ 3: สายสั่งการ (Control Pins)',
    desc: 'สายสำหรับสั่งให้ชิปเปิด/ปิดการรับส่งสัญญาณ (CE) และเลือกชิปเป้าหมาย (CSN)',
    requiredPins: ['CE', 'CSN'],
    icon: <Info className="text-orange-400" />
  }
];

export function WiringSingleSlide() {
  const [connections, setConnections] = useState<Record<string, string>>({});
  const [selectedNrfPin, setSelectedNrfPin] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  const handleNrfClick = (pin: string) => {
    setSelectedNrfPin(selectedNrfPin === pin ? null : pin);
  };

  const handleCtrlClick = (pin: string) => {
    if (selectedNrfPin) {
      // If user connects 5V to VCC, simulate explosion/error
      if (selectedNrfPin === 'VCC' && pin === '5V') {
        alert("💥 BOOM! บอร์ด NRF24 ไหม้แล้ว! (รับไฟได้แค่ 3.3V) กรุณาต่อใหม่");
        setConnections(prev => { const next = {...prev}; delete next['VCC']; return next; });
        setSelectedNrfPin(null);
        return;
      }
      setConnections(prev => ({ ...prev, [selectedNrfPin]: pin }));
      setSelectedNrfPin(null);
    }
  };

  const currentStepData = STEPS[activeStep];
  
  // Check if current step's required pins are ALL correctly connected
  const isStepComplete = currentStepData?.requiredPins.every(
    pin => connections[pin] === TARGET_WIRING[pin]
  );

  return (
    <div className="w-full h-full flex flex-col bg-transparent text-white font-sans">
      <div className="text-center mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
          คู่มือต่อสายไฟ: Arduino + NRF24L01
        </h2>
        <p className="text-gray-400 mt-1 text-sm md:text-base">ทำตามคำแนะนำทีละขั้นตอน เพื่อป้องกันอุปกรณ์เสียหาย</p>
      </div>

      {/* Guided Step Banner */}
      {currentStepData ? (
        <motion.div 
          key={activeStep}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl mx-auto mb-6 bg-slate-900/80 border-2 border-indigo-500/50 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-[0_0_20px_rgba(99,102,241,0.2)]"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-black/50 rounded-full">{currentStepData.icon}</div>
            <div>
              <h3 className="font-bold text-lg text-indigo-300">{currentStepData.title}</h3>
              <p className="text-sm text-gray-300">{currentStepData.desc}</p>
              <p className="text-xs font-mono text-emerald-400 mt-1">
                ภารกิจ: ต่อสาย {currentStepData.requiredPins.join(', ')} ให้ถูกต้อง
              </p>
            </div>
          </div>
          <button
            disabled={!isStepComplete}
            onClick={() => setActiveStep(s => s + 1)}
            className={`px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-all shrink-0 ${
              isStepComplete 
                ? 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isStepComplete ? 'ผ่าน! ไปขั้นต่อไป' : 'รอการต่อสาย...'}
            <ChevronRight size={18} />
          </button>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-4xl mx-auto mb-6 bg-emerald-900/80 border-2 border-emerald-500 rounded-xl p-4 flex items-center justify-center gap-4 shadow-[0_0_30px_rgba(16,185,129,0.4)]"
        >
          <CheckCircle2 className="w-10 h-10 text-emerald-400" />
          <div>
            <h3 className="font-bold text-xl text-emerald-300">ประกอบร่างเสร็จสมบูรณ์!</h3>
            <p className="text-sm text-emerald-100">ตรวจสอบความเรียบร้อย แล้วไปเรียนรู้โค้ดกันต่อเลย</p>
          </div>
        </motion.div>
      )}

      <div className="flex-1 flex flex-col gap-4 justify-start items-center w-full min-h-0">
        {/* Hardware Row */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 w-full">
          {/* NRF24L01 */}
          <div className="flex flex-col items-center">
            <h3 className="text-sm font-bold mb-2 text-purple-400">1. เลือกขาที่ NRF24</h3>
            <NRF24L01 
              onPinClick={handleNrfClick}
              selectedPin={selectedNrfPin}
              activeConnections={connections}
            />
          </div>

          <div className="hidden md:flex flex-col items-center justify-center opacity-30">
            <div className="h-[2px] w-12 bg-gradient-to-r from-purple-500 to-blue-500"></div>
          </div>

          {/* Arduino */}
          <div className="flex flex-col items-center">
            <h3 className="text-sm font-bold mb-2 text-blue-400">2. ไปจิ้มที่ Arduino</h3>
            <ArduinoUno 
              onPinClick={handleCtrlClick}
              selectedPin={null}
              activeConnections={Object.entries(connections).reduce((acc, [k, v]) => ({...acc, [v]: k}), {})}
            />
          </div>
        </div>

        {/* Wire List Minimal */}
        <div className="w-full max-w-4xl mx-auto bg-black/40 border border-white/10 rounded-xl p-4 mt-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <AnimatePresence>
              {Object.entries(connections).map(([nrfPin, ctrlPin]) => {
                const isCorrect = TARGET_WIRING[nrfPin] === ctrlPin;
                return (
                  <motion.div
                    key={nrfPin}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className={`flex items-center gap-2 p-2 rounded-lg border ${
                      isCorrect ? 'bg-emerald-900/30 border-emerald-500/30' : 'bg-red-900/30 border-red-500/30'
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full border ${WIRE_COLORS[nrfPin] || 'bg-white'}`}></div>
                    <span className="font-mono font-bold text-sm">{nrfPin}</span>
                    <span className="text-xs text-gray-500">→</span>
                    <span className="font-mono font-bold text-sm text-blue-300">{ctrlPin}</span>
                    <button 
                      onClick={() => setConnections(prev => { const next = {...prev}; delete next[nrfPin]; return next; })}
                      className="ml-1 text-gray-500 hover:text-red-400 transition-colors"
                    >
                      <XCircle size={14} />
                    </button>
                  </motion.div>
                );
              })}
              {Object.keys(connections).length === 0 && (
                <span className="text-gray-500 text-sm">ยังไม่ได้ต่อสายไฟ</span>
              )}
            </AnimatePresence>
          </div>
          
          <div className="mt-4 flex justify-center">
             <button
                onClick={() => { setConnections({}); setSelectedNrfPin(null); setActiveStep(0); }}
                className="text-xs px-3 py-1 bg-white/10 hover:bg-white/20 text-gray-300 rounded transition-colors flex items-center gap-1"
              >
                <RefreshCcw size={12} /> เริ่มต่อสายใหม่ตั้งแต่ต้น
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCcw, XCircle, Info, ChevronRight, AlertTriangle, Zap, CheckCircle2, Image as ImageIcon } from 'lucide-react';
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
  "GND": "bg-[#8B4513] border-[#A0522D]", // Brown
  "VCC": "bg-red-600 border-red-500", // Red
  "CE": "bg-purple-600 border-purple-500", // Purple
  "CSN": "bg-blue-600 border-blue-500", // Blue
  "SCK": "bg-orange-500 border-orange-400", // Orange
  "MOSI": "bg-yellow-400 border-yellow-300", // Yellow
  "MISO": "bg-green-500 border-green-400", // Green
};

const STEPS = [
  {
    id: 1,
    title: 'ขั้นที่ 1: สายพลังงาน (Power)',
    desc: 'สำคัญที่สุด! NRF24L01 รับไฟ 3.3V เท่านั้น (ห้าม 5V เด็ดขาด บอร์ดจะพังทันที)',
    requiredPins: ['VCC', 'GND'],
    icon: <AlertTriangle className="text-red-400" />
  },
  {
    id: 2,
    title: 'ขั้นที่ 2: สายส่งข้อมูล (SPI Bus)',
    desc: 'ทั้ง 3 เส้นทำหน้าที่เป็นถนนความเร็วสูงระหว่าง Arduino กับ NRF24',
    requiredPins: ['MOSI', 'MISO', 'SCK'],
    icon: <Zap className="text-blue-400" />
  },
  {
    id: 3,
    title: 'ขั้นที่ 3: สายควบคุม (Control Pins)',
    desc: 'สำหรับเปิด/ปิดรับสัญญาณ (CE) และเลือกชิป (CSN)',
    requiredPins: ['CE', 'CSN'],
    icon: <Info className="text-orange-400" />
  }
];

export function WiringSingleSlide() {
  const [connections, setConnections] = useState<Record<string, string>>({});
  const [selectedNrfPin, setSelectedNrfPin] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(1);
  const [showReference, setShowReference] = useState(false);

  const handleNrfClick = (pin: string) => setSelectedNrfPin(pin === selectedNrfPin ? null : pin);

  const handleCtrlClick = (pin: string) => {
    if (selectedNrfPin) {
      setConnections(prev => ({ ...prev, [selectedNrfPin]: pin }));
      setSelectedNrfPin(null);
    }
  };

  const removeConnection = (nrfPin: string) => {
    const newConn = { ...connections };
    delete newConn[nrfPin];
    setConnections(newConn);
  };

  const currentStepData = STEPS.find(s => s.id === activeStep);
  const isStepComplete = currentStepData?.requiredPins.every(pin => 
    connections[pin] === TARGET_WIRING[pin]
  );

  const nrfPinColors: Record<string, string> = {};
  const arduinoPinColors: Record<string, string> = {};

  Object.entries(connections).forEach(([nrfPin, arduinoPin]) => {
    if (TARGET_WIRING[nrfPin] === arduinoPin) {
      const colorClass = WIRE_COLORS[nrfPin] || 'bg-emerald-500 border-emerald-400';
      nrfPinColors[nrfPin] = `${colorClass} shadow-[0_0_15px_rgba(255,255,255,0.2)]`;
      arduinoPinColors[arduinoPin] = `${colorClass} shadow-[0_0_15px_rgba(255,255,255,0.2)]`;
    } else {
      nrfPinColors[nrfPin] = 'bg-rose-500 border-rose-300 shadow-[0_0_15px_#f43f5e] animate-pulse';
      arduinoPinColors[arduinoPin] = 'bg-rose-500 border-rose-300 shadow-[0_0_15px_#f43f5e] animate-pulse';
    }
  });

  return (
    <div className="w-full h-full flex flex-col bg-transparent text-white font-sans">
      

      <AnimatePresence>
        {showReference && (
          <motion.div 
            initial={{ opacity: 0, height: 0, scale: 0.95 }} 
            animate={{ opacity: 1, height: 'auto', scale: 1 }} 
            exit={{ opacity: 0, height: 0, scale: 0.95 }} 
            className="w-full max-w-2xl mx-auto mb-6 overflow-hidden rounded-xl border border-white/10 shadow-2xl relative"
          >
            <img src="/images/wiring-guide.jpg" alt="Wiring Reference" className="w-full object-contain bg-white/5" />
            <button onClick={() => setShowReference(false)} className="absolute top-3 right-3 p-1.5 bg-black/60 hover:bg-black text-white rounded-full backdrop-blur-sm transition-colors">
              <XCircle size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

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
            <h3 className="font-bold text-xl text-emerald-300">ประกอบร่างสมบูรณ์!</h3>
            <p className="text-sm text-emerald-100">ตรวจสอบความเรียบร้อย แล้วไปเรียนโค้ดกันต่อเลย</p>
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
              pinColors={nrfPinColors}
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
              pinColors={arduinoPinColors}
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
                      isCorrect ? 'bg-emerald-900/30 border-emerald-500/30' : 'bg-rose-900/40 border-rose-500/50'
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full border ${isCorrect ? (WIRE_COLORS[nrfPin] || 'bg-white') : 'bg-rose-500 border-rose-400 animate-pulse'}`}></div>
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
          
          <div className="mt-4 flex justify-center gap-4">
             <button
                onClick={() => { setConnections({}); setSelectedNrfPin(null); setActiveStep(1); }}
                className="text-xs px-3 py-1 bg-white/10 hover:bg-white/20 text-gray-300 rounded transition-colors flex items-center gap-1"
              >
                <RefreshCcw size={12} /> เริ่มต่อสายใหม่ตั้งแต่ต้น
              </button>
              <button
                onClick={() => setShowReference(true)}
                className="text-xs px-3 py-1 bg-indigo-500/20 hover:bg-indigo-500/40 text-indigo-300 border border-indigo-500/30 rounded transition-colors flex items-center gap-1"
              >
                <ImageIcon size={12} /> ดูรูปไกด์การต่อสาย
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}

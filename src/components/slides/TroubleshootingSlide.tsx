'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ChevronRight, CheckCircle, Wrench } from 'lucide-react';

const steps = [
  { id: 1, title: 'Check Power', desc: 'ตรวจสอบไฟเลี้ยง 3.3V ห้ามใช้ 5V เด็ดขาด', hint: 'ใช้ Multimeter วัดไฟ หรือดู LED บนบอร์ดถ้ามี' },
  { id: 2, title: 'Check CE/CSN', desc: 'ตรวจสอบการต่อสาย CE และ CSN ให้ตรงกับโค้ด', hint: 'ส่วนใหญ่ต่อ CE=7, CSN=8' },
  { id: 3, title: 'Check SPI', desc: 'ตรวจสอบสาย MOSI, MISO, SCK', hint: 'MOSI=11, MISO=12, SCK=13 (สำหรับ Arduino Uno)' },
  { id: 4, title: 'Check Address', desc: 'ตรวจสอบ Pipe Address ว่าตรงกันหรือไม่', hint: 'const byte address[6] = "00001";' }
];

export function TroubleshootingSlide() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-white p-8">
      <div className="text-center mb-10 flex flex-col items-center">
        <div className="p-4 bg-orange-500/20 rounded-full mb-4 shadow-[0_0_30px_rgba(249,115,22,0.3)]">
          <AlertTriangle className="w-12 h-12 text-orange-400" />
        </div>
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
          การแก้ปัญหาเบื้องต้น (Troubleshooting)
        </h2>
        <p className="text-xl text-gray-300 mt-2">
          ถ้า NRF24L01 ไม่ทำงาน ลองเช็คตามขั้นตอนเหล่านี้
        </p>
      </div>

      <div className="flex w-full max-w-5xl space-x-8">
        {/* Steps List */}
        <div className="w-1/2 space-y-4">
          {steps.map((step) => (
            <motion.div
              key={step.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => setActiveStep(step.id)}
              className={`p-5 rounded-xl cursor-pointer border backdrop-blur-md transition-all ${
                activeStep === step.id
                  ? 'bg-orange-500/20 border-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.3)]'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    activeStep === step.id ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-300'
                  }`}>
                    {step.id}
                  </div>
                  <h3 className={`text-xl font-semibold ${activeStep === step.id ? 'text-orange-300' : 'text-gray-200'}`}>
                    {step.title}
                  </h3>
                </div>
                <ChevronRight className={`w-5 h-5 ${activeStep === step.id ? 'text-orange-400' : 'text-gray-500'}`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Step Details */}
        <div className="w-1/2">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-full bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md flex flex-col justify-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-10 opacity-5">
              <Wrench className="w-48 h-48" />
            </div>
            
            <div className="z-10">
              <h3 className="text-3xl font-bold text-white mb-4">
                Step {activeStep}: {steps.find(s => s.id === activeStep)?.title}
              </h3>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {steps.find(s => s.id === activeStep)?.desc}
              </p>
              
              <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-5">
                <h4 className="text-blue-300 font-semibold mb-2 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" /> คำแนะนำ (Hint)
                </h4>
                <p className="text-blue-100/80 font-mono text-lg">
                  {steps.find(s => s.id === activeStep)?.hint}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

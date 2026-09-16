'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Terminal, Code, Cpu, Link2 } from 'lucide-react';
import { ArduinoUno } from '../hardware/ArduinoUno';
import { NRF24L01 } from '../hardware/NRF24L01';

const RX_CODE_SECTIONS = [
  { id: 'libs', title: '1. Libraries', code: `#include <SPI.h>\n#include <nRF24L01.h>\n#include <RF24.h>`, explanation: 'ใช้ไลบรารีเดียวกันกับฝั่งส่ง เพื่อให้สื่อสารกันผ่านโปรโตคอลของ NRF24 ได้' },
  { id: 'pins', title: '2. Pins & Init', code: `RF24 radio(9, 10); // CE, CSN\nconst byte address[6] = "00001";`, explanation: 'ตั้งค่าขาต่อใช้งานเหมือนฝั่งส่งเป๊ะๆ และที่สำคัญ ชื่อท่อ (Address) ต้องเหมือนกัน' },
  { id: 'setup', title: '3. Setup', code: `void setup() {\n  Serial.begin(9600);\n  radio.begin();\n  radio.openReadingPipe(0, address);\n  radio.startListening();\n}`, explanation: 'เปิด Serial Monitor เปิดท่อรับข้อมูล (ท่อที่ 0) และสั่งให้บอร์ด "เริ่มฟังเสียงในอากาศ"' },
  { id: 'loop', title: '4. Loop (Receive)', code: `void loop() {\n  if (radio.available()) {\n    char text[32] = "";\n    radio.read(&text, sizeof(text));\n    Serial.println(text);\n  }\n}`, explanation: 'ตรวจสอบตลอดเวลาว่ามีข้อมูลลอยมาไหม ถ้ามีให้ดึงข้อมูลมาเก็บไว้และปรินต์ออกหน้าจอ' }
];

const WIRE_COLORS: Record<string, string> = {
  "GND": "bg-[#8B4513] border-[#A0522D]",
  "VCC": "bg-red-600 border-red-500",
  "CE": "bg-purple-600 border-purple-500",
  "CSN": "bg-blue-600 border-blue-500",
  "SCK": "bg-orange-500 border-orange-400",
  "MOSI": "bg-yellow-400 border-yellow-300",
  "MISO": "bg-green-500 border-green-400",
};

export function CodeLabRxSlide() {
  const [activeSection, setActiveSection] = useState(RX_CODE_SECTIONS[0].id);
  const [rightTab, setRightTab] = useState<'output' | 'wiring'>('output');

  // Static connections for the reference
  const connections: Record<string, string> = {
    "CE": "D9", "CSN": "D10", "SCK": "D13", "MOSI": "D11", "MISO": "D12", "VCC": "3.3V", "GND": "GND"
  };

  const arduinoPinColors = Object.entries(connections).reduce((acc, [nrf, ctrl]) => ({...acc, [ctrl]: WIRE_COLORS[nrf]}), {});

  return (
    <div className="flex flex-col h-full w-full p-4 md:p-6 text-white bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
      <div className="flex items-center gap-3 mb-6">
        <Code className="w-8 h-8 text-purple-400" />
        <h2 className="text-3xl font-bold text-purple-400">Code Lab: ฝั่งผู้รับ (RX)</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-0">
        {/* Left Column: Code Logic */}
        <div className="w-full md:w-1/2 flex flex-col min-h-0 relative">
          <div className="absolute top-0 right-0 p-2 z-10 text-slate-500 font-mono text-xs">receiver.ino</div>
          <div className="flex-1 bg-[#1e1e1e] rounded-xl overflow-hidden border border-white/10 shadow-inner flex flex-col font-mono text-sm leading-relaxed">
            {RX_CODE_SECTIONS.map((section) => (
              <motion.div
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`p-4 border-l-4 cursor-pointer transition-colors ${
                  activeSection === section.id 
                    ? 'border-purple-500 bg-purple-500/10' 
                    : 'border-transparent hover:bg-white/5'
                }`}
              >
                <div className="text-gray-500 mb-1">{section.title}</div>
                <pre className="text-gray-300 overflow-x-auto custom-scrollbar">
                  <code>{section.code}</code>
                </pre>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Output / Wiring Tab */}
        <div className="w-full md:w-1/2 flex flex-col min-h-0">
          <div className="flex bg-black/40 p-1 rounded-xl mb-4 border border-white/5">
            <button 
              onClick={() => setRightTab('output')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all ${rightTab === 'output' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-gray-200'}`}
            >
              <Terminal size={16} /> Serial Monitor
            </button>
            <button 
              onClick={() => setRightTab('wiring')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all ${rightTab === 'wiring' ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-400 hover:text-gray-200'}`}
            >
              <Cpu size={16} /> Hardware Ref
            </button>
          </div>

          <div className="flex-1 rounded-xl border border-white/10 overflow-hidden relative shadow-inner">
            <AnimatePresence mode="wait">
              {rightTab === 'output' ? (
                <motion.div
                  key="output"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full bg-black p-4 font-mono text-green-400 flex flex-col"
                >
                  <div className="flex items-center gap-2 text-gray-500 text-xs mb-4 border-b border-white/10 pb-2">
                    <Terminal size={12} /> COM4 - 9600 baud
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-400">Initializing NRF24L01...</p>
                    <p className="text-gray-400">Radio is ready.</p>
                    <p className="text-gray-400">Listening on address: 00001</p>
                    <p className="mt-4">Hello IoT</p>
                    <p>Hello IoT</p>
                    <p className="animate-pulse">_</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="wiring"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full bg-[#111111] overflow-y-auto custom-scrollbar"
                >
                  <div className="p-4 text-center border-b border-white/5">
                    <h3 className="font-bold text-emerald-400">Reference Wiring</h3>
                    <p className="text-xs text-gray-400">ดูไว้เผื่อลืมตอนเขียนโค้ด</p>
                  </div>
                  <div className="w-full flex justify-center items-center h-full min-h-[300px]">
                    <motion.div 
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      className="flex flex-col items-center gap-6 py-4 transform scale-75 origin-top"
                    >
                      <div className="flex justify-center gap-4 md:p-6 w-full">
                        <NRF24L01 activeConnections={connections} pinColors={WIRE_COLORS} />
                        <ArduinoUno activeConnections={Object.entries(connections).reduce((acc, [k, v]) => ({...acc, [v]: k}), {})} pinColors={arduinoPinColors as Record<string, string>} />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

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

export function CodeLabRxSlide() {
  const [activeSection, setActiveSection] = useState(RX_CODE_SECTIONS[0].id);
  const [rightTab, setRightTab] = useState<'output' | 'wiring'>('output');

  // Static connections for the reference
  const connections = {
    "CE": "D9", "CSN": "D10", "SCK": "D13", "MOSI": "D11", "MISO": "D12", "VCC": "3.3V", "GND": "GND"
  };

  return (
    <div className="flex flex-col h-full w-full p-8 text-white bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
      <div className="flex items-center gap-3 mb-6">
        <Code className="w-8 h-8 text-purple-400" />
        <h2 className="text-3xl font-bold text-purple-400">Code Lab: ฝั่งผู้รับข้อมูล (RX)</h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-full min-h-0">
        {/* Left: Code Snippets */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-2 pb-4">
          {RX_CODE_SECTIONS.map((section) => (
            <motion.div
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                activeSection === section.id 
                  ? 'bg-purple-500/20 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)]' 
                  : 'bg-black/50 border-white/10 hover:border-purple-400/50'
              }`}
            >
              <h4 className="font-bold text-gray-300 mb-2">{section.title}</h4>
              <pre className="text-sm font-mono text-pink-400 bg-black/60 p-3 rounded-lg overflow-x-auto">
                {section.code}
              </pre>
            </motion.div>
          ))}
        </div>

        {/* Right: Explanation & Output/Wiring */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6 min-h-0">
          <motion.div 
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-none p-6 bg-purple-900/30 rounded-xl border border-purple-400/30"
          >
            <h3 className="text-xl font-bold text-purple-300 mb-3 flex items-center gap-2">
              <Cpu className="w-5 h-5" /> คำอธิบายโค้ด
            </h3>
            <p className="text-lg text-purple-100 leading-relaxed">
              {RX_CODE_SECTIONS.find(s => s.id === activeSection)?.explanation}
            </p>
          </motion.div>

          <div className="flex-1 flex flex-col bg-black/80 rounded-xl border border-gray-700 shadow-inner overflow-hidden min-h-0">
            {/* Tabs */}
            <div className="flex border-b border-gray-700 bg-black/50">
              <button 
                onClick={() => setRightTab('output')}
                className={`flex-1 py-3 px-4 font-bold text-sm flex items-center justify-center gap-2 transition-colors ${rightTab === 'output' ? 'bg-purple-900/40 text-purple-400 border-b-2 border-purple-400' : 'text-gray-500 hover:bg-white/5'}`}
              >
                <Terminal className="w-4 h-4" /> Serial Monitor (RX)
              </button>
              <button 
                onClick={() => setRightTab('wiring')}
                className={`flex-1 py-3 px-4 font-bold text-sm flex items-center justify-center gap-2 transition-colors ${rightTab === 'wiring' ? 'bg-purple-900/40 text-purple-400 border-b-2 border-purple-400' : 'text-gray-500 hover:bg-white/5'}`}
              >
                <Link2 className="w-4 h-4" /> ดูแผนผังการต่อสาย
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto relative p-4 custom-scrollbar">
              <AnimatePresence mode="wait">
                {rightTab === 'output' ? (
                  <motion.div 
                    key="output"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="font-mono text-pink-400 text-sm space-y-1"
                  >
                    <p>{">"} Received: Hello IoT</p>
                    <p>{">"} Received: Hello IoT</p>
                    <p>{">"} Received: Hello IoT</p>
                    <p className="animate-pulse">{">"} _</p>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="wiring"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-6 py-4 transform scale-75 origin-top"
                  >
                    <div className="flex justify-center gap-8 w-full">
                      <NRF24L01 activeConnections={connections} />
                      <ArduinoUno activeConnections={Object.entries(connections).reduce((acc, [k, v]) => ({...acc, [v]: k}), {})} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

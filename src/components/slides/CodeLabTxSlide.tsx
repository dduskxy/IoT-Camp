'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Terminal, Code, Cpu } from 'lucide-react';

const TX_CODE_SECTIONS = [
  { id: 'libs', title: '1. Libraries', code: `#include <SPI.h>\n#include <nRF24L01.h>\n#include <RF24.h>`, explanation: 'เรียกใช้งานไลบรารีสำหรับการสื่อสารผ่าน SPI และควบคุมชิป NRF24L01' },
  { id: 'pins', title: '2. Pins & Init', code: `RF24 radio(7, 8); // CE, CSN\nconst byte address[6] = "00001";`, explanation: 'กำหนดขา CE และ CSN ของโมดูล และตั้งชื่อท่อ (Address) ให้ตรงกันทั้งสองฝั่ง' },
  { id: 'setup', title: '3. Setup', code: `void setup() {\n  radio.begin();\n  radio.openWritingPipe(address);\n  radio.stopListening();\n}`, explanation: 'เริ่มต้นการทำงานของวิทยุ เปิดท่อสำหรับส่ง และบอกให้หยุดฟังเพื่อเตรียมส่งข้อมูล' },
  { id: 'loop', title: '4. Loop (Send)', code: `void loop() {\n  const char text[] = "Hello IoT";\n  radio.write(&text, sizeof(text));\n  delay(1000);\n}`, explanation: 'ส่งข้อความ "Hello IoT" ออกไปผ่านวิทยุทุกๆ 1 วินาที' }
];

export function CodeLabTxSlide() {
  const [activeSection, setActiveSection] = useState(TX_CODE_SECTIONS[0].id);

  return (
    <div className="flex flex-col h-full w-full p-8 text-white bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
      <div className="flex items-center gap-3 mb-6">
        <Code className="w-8 h-8 text-blue-400" />
        <h2 className="text-3xl font-bold text-blue-400">Code Lab: สร้างตัวส่งข้อมูล (TX)</h2>
      </div>

      <div className="flex flex-row gap-6 h-full">
        {/* Left: Code Snippets */}
        <div className="w-1/2 flex flex-col gap-4">
          {TX_CODE_SECTIONS.map((section) => (
            <motion.div
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                activeSection === section.id 
                  ? 'bg-blue-500/20 border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.4)]' 
                  : 'bg-black/50 border-white/10 hover:border-blue-400/50'
              }`}
            >
              <h4 className="font-bold text-gray-300 mb-2">{section.title}</h4>
              <pre className="text-sm font-mono text-green-400 bg-black/60 p-3 rounded-lg overflow-x-auto">
                {section.code}
              </pre>
            </motion.div>
          ))}
        </div>

        {/* Right: Explanation & Output */}
        <div className="w-1/2 flex flex-col gap-6">
          <motion.div 
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 p-6 bg-blue-900/30 rounded-xl border border-blue-400/30"
          >
            <h3 className="text-2xl font-bold text-blue-300 mb-4 flex items-center gap-2">
              <Cpu className="w-6 h-6" /> คำอธิบาย
            </h3>
            <p className="text-xl text-blue-100 leading-relaxed">
              {TX_CODE_SECTIONS.find(s => s.id === activeSection)?.explanation}
            </p>
          </motion.div>

          <div className="flex-1 p-6 bg-black/80 rounded-xl border border-gray-700 shadow-inner">
            <h3 className="text-xl font-bold text-gray-400 mb-4 flex items-center gap-2">
              <Terminal className="w-5 h-5" /> Serial Monitor (TX)
            </h3>
            <motion.div 
              className="font-mono text-green-500 text-sm space-y-1 h-32 overflow-hidden relative"
            >
              <motion.div 
                animate={{ y: [0, -20, -40, -60, -80] }}
                transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
              >
                <p>{">"} Sending: Hello IoT ... Success</p>
                <p>{">"} Sending: Hello IoT ... Success</p>
                <p>{">"} Sending: Hello IoT ... Success</p>
                <p>{">"} Sending: Hello IoT ... Success</p>
                <p>{">"} Sending: Hello IoT ... Success</p>
                <p>{">"} Sending: Hello IoT ... Success</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

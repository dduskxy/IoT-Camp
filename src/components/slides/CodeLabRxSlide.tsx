'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Terminal, Code, Cpu } from 'lucide-react';

const RX_CODE_SECTIONS = [
  { id: 'libs', title: '1. Libraries', code: `#include <SPI.h>\n#include <nRF24L01.h>\n#include <RF24.h>`, explanation: 'ใช้ไลบรารีเดียวกันกับฝั่งส่ง เพื่อให้สื่อสารกันได้ผ่านโปรโตคอล NRF24' },
  { id: 'pins', title: '2. Pins & Init', code: `RF24 radio(7, 8); // CE, CSN\nconst byte address[6] = "00001";`, explanation: 'ตั้งค่าขาต่อใช้งานเหมือนกัน และที่สำคัญที่สุดคือชื่อท่อ (address) ต้องตรงกับผู้ส่ง' },
  { id: 'setup', title: '3. Setup', code: `void setup() {\n  Serial.begin(9600);\n  radio.begin();\n  radio.openReadingPipe(0, address);\n  radio.startListening();\n}`, explanation: 'เปิด Serial Monitor เปิดท่อสำหรับรับข้อมูล (ท่อเบอร์ 0) และสั่งให้เริ่มดักฟังข้อมูลในอากาศ' },
  { id: 'loop', title: '4. Loop (Receive)', code: `void loop() {\n  if (radio.available()) {\n    char text[32] = "";\n    radio.read(&text, sizeof(text));\n    Serial.println(text);\n  }\n}`, explanation: 'ตรวจสอบตลอดเวลาว่ามีข้อมูลเข้ามาหรือไม่ ถ้ามี (available) ก็จะดึงข้อมูลมาเก็บไว้แล้วแสดงผล' }
];

export function CodeLabRxSlide() {
  const [activeSection, setActiveSection] = useState(RX_CODE_SECTIONS[0].id);

  return (
    <div className="flex flex-col h-full w-full p-8 text-white bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
      <div className="flex items-center gap-3 mb-6">
        <Code className="w-8 h-8 text-purple-400" />
        <h2 className="text-3xl font-bold text-purple-400">Code Lab: สร้างตัวรับข้อมูล (RX)</h2>
      </div>

      <div className="flex flex-row gap-6 h-full">
        {/* Left: Code Snippets */}
        <div className="w-1/2 flex flex-col gap-4">
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

        {/* Right: Explanation & Output */}
        <div className="w-1/2 flex flex-col gap-6">
          <motion.div 
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 p-6 bg-purple-900/30 rounded-xl border border-purple-400/30"
          >
            <h3 className="text-2xl font-bold text-purple-300 mb-4 flex items-center gap-2">
              <Cpu className="w-6 h-6" /> คำอธิบาย
            </h3>
            <p className="text-xl text-purple-100 leading-relaxed">
              {RX_CODE_SECTIONS.find(s => s.id === activeSection)?.explanation}
            </p>
          </motion.div>

          <div className="flex-1 p-6 bg-black/80 rounded-xl border border-gray-700 shadow-inner">
            <h3 className="text-xl font-bold text-gray-400 mb-4 flex items-center gap-2">
              <Terminal className="w-5 h-5" /> Serial Monitor (RX)
            </h3>
            <motion.div 
              className="font-mono text-pink-400 text-sm space-y-1 h-32 overflow-hidden relative"
            >
              <motion.div 
                animate={{ y: [0, -20, -40, -60, -80] }}
                transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
              >
                <p>{">"} Received: Hello IoT</p>
                <p>{">"} Received: Hello IoT</p>
                <p>{">"} Received: Hello IoT</p>
                <p>{">"} Received: Hello IoT</p>
                <p>{">"} Received: Hello IoT</p>
                <p>{">"} Received: Hello IoT</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

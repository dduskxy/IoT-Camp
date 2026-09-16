'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Terminal, Code, Cpu, Play } from 'lucide-react';
import { ArduinoUno } from '../hardware/ArduinoUno';
import { NRF24L01 } from '../hardware/NRF24L01';

const RX_CODE_SECTIONS = [
  { id: 'libs', title: '1. Config & Libraries', code: `/*
 * receiver.ino
 * 
 * NRF24L01 Wireless Receiver Node for Hand Gesture RGB LED System
 * (1 Transmitter ➔ 3 Receivers Architecture)
 * 
 * Hardware Connections:
 *   [Grove Chainable RGB LED - P9813]
 *   - VCC  -> Arduino 5V
 *   - GND  -> Arduino GND
 *   - CLK  -> Arduino Pin D2
 *   - DATA -> Arduino Pin D3
 * 
 *   [NRF24L01 Wireless Transceiver Module]
 *   - VCC  -> Arduino 3.3V (⚠️ ห้ามต่อ 5V! แนะนำต่อ Capacitor 10uF-100uF คร่อม VCC/GND เพื่อความเสถียร)
 *   - GND  -> Arduino GND
 *   - CE   -> Arduino Pin D9
 *   - CSN  -> Arduino Pin D10
 *   - SCK  -> Arduino Pin D13 (Hardware SPI)
 *   - MOSI -> Arduino Pin D11 (Hardware SPI)
 *   - MISO -> Arduino Pin D12 (Hardware SPI)
 *   - IRQ  -> ไม่ได้ใช้งาน (Unused)
 * 
 * 1-to-3 Broadcast Setup:
 *   - AutoAck is DISABLED (radio.setAutoAck(false)) to prevent 3 receivers
 *     from sending conflicting ACK packets simultaneously (RF Collision).
 *   - Both Grove Chainable LED and PC Web Serial (index.html) are synced in real-time.
 */

#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>
#include <printf.h>

#define CE_PIN   9
#define CSN_PIN  10

RF24 radio(CE_PIN, CSN_PIN);
const byte rfAddress[6] = "00001";
const uint8_t rfChannel = 76; // Default RF channel for consistent multi-node sync

// Grove Chainable LED (P9813) pins
const int clkPin  = 2;
const int dataPin = 3;

// Global state tracking
int currentFingerCount = 0;

// Bit-bang sending a single 8-bit byte to P9813
void sendByte(uint8_t b) {
  for (int i = 7; i >= 0; i--) {
    digitalWrite(dataPin, (b >> i) & 0x01);
    digitalWrite(clkPin, LOW);
    digitalWrite(clkPin, HIGH);
  }
}

// Set RGB LED color using P9813 transmission protocol
void setColor(uint8_t r, uint8_t g, uint8_t b) {
  for (int i = 0; i < 4; i++) sendByte(0x00);
  uint8_t checksum = 0xC0;
  checksum |= ((~b >> 6) & 0x03) << 4;
  checksum |= ((~g >> 6) & 0x03) << 2;
  checksum |= ((~r >> 6) & 0x03);
  sendByte(checksum);
  sendByte(b);
  sendByte(g);
  sendByte(r);
  for (int i = 0; i < 4; i++) sendByte(0x00);
}

// Helper to apply colors based on finger count (0 to 10)
void applyFingerColor(int count) {
  switch (count) {
    case 0:  setColor(0, 0, 0);       Serial.println(F("ACK: 0 Fingers -> LED OFF")); break;
    case 1:  setColor(255, 0, 0);     Serial.println(F("ACK: 1 Finger -> RED")); break;
    case 2:  setColor(0, 255, 0);     Serial.println(F("ACK: 2 Fingers -> GREEN")); break;
    case 3:  setColor(0, 0, 255);     Serial.println(F("ACK: 3 Fingers -> BLUE")); break;
    case 4:  setColor(255, 255, 0);   Serial.println(F("ACK: 4 Fingers -> YELLOW")); break;
    case 5:  setColor(180, 0, 255);   Serial.println(F("ACK: 5 Fingers -> PURPLE")); break;
    case 6:  setColor(0, 255, 255);   Serial.println(F("ACK: 6 Fingers -> CYAN")); break;
    case 7:  setColor(255, 128, 0);   Serial.println(F("ACK: 7 Fingers -> ORANGE")); break;
    case 8:  setColor(255, 20, 147);  Serial.println(F("ACK: 8 Fingers -> PINK")); break;
    case 9:  setColor(128, 255, 0);   Serial.println(F("ACK: 9 Fingers -> LIME")); break;
    case 10: setColor(255, 255, 255); Serial.println(F("ACK: 10 Fingers -> WHITE")); break;
    default: break;
  }
}`, explanation: 'ตั้งค่าไลบรารีและตัวแปรสำหรับ NRF24L01 ฝั่งรับ และ P9813 LED' },
  { id: 'setup', title: '2. Setup', code: `void setup() {
Serial.begin(115200);
  while (!Serial && millis() < 3000) {}

  pinMode(clkPin, OUTPUT);
  pinMode(dataPin, OUTPUT);
  digitalWrite(clkPin, LOW);
  digitalWrite(dataPin, LOW);
  setColor(0, 0, 0);

  printf_begin();
  Serial.println(F("========================================"));
  Serial.println(F("Testing NRF24L01 Receiver (Multi-Node)..."));

  if (!radio.begin()) {
    Serial.println(F("ERROR: NRF24L01 hardware not responding!"));
    Serial.println(F("Please check wiring: CE->9, CSN->10, SCK->13, MOSI->11, MISO->12, VCC->3.3V, GND->GND"));
    while (1) {}
  }

  Serial.println(F("SUCCESS: NRF24L01 found on Receiver Node!"));
  radio.printPrettyDetails();
  Serial.println(F("========================================"));

  // RF24 configuration for Multi-Receiver Broadcast
  radio.setAutoAck(false);            // ปิด Auto-ACK เพื่อไม่ให้ชนกับเครื่องรับอื่น
  radio.setChannel(rfChannel);        // ล็อคช่องสัญญาณ 76 ให้ตรงกับตัวส่ง
  radio.openReadingPipe(1, rfAddress);
  radio.setPALevel(RF24_PA_LOW);
  radio.setDataRate(RF24_1MBPS);
  radio.startListening();

  Serial.println(F("RECEIVER_READY: Listening for RF24 broadcast from transmitter..."));
}`, explanation: 'เริ่มต้นการทำงานของ Hardware และตั้งค่า NRF24L01 เป็นโหมดรับ (Receiver)' },
  { id: 'loop', title: '3. Loop', code: `void loop() {
// 1. ตรวจสอบข้อมูลไร้สายที่ได้รับจาก NRF24L01 (จากเครื่องส่ง)
  if (radio.available()) {
    int receivedCount = -1;
    radio.read(&receivedCount, sizeof(receivedCount));

    if (receivedCount >= 0 && receivedCount <= 10) {
      if (receivedCount != currentFingerCount) {
        currentFingerCount = receivedCount;
        
        // อัปเดตสีไฟ Grove Chainable LED ที่บอร์ดนี้
        applyFingerColor(currentFingerCount);

        // ส่ง Protocol ไปยัง Web Serial ให้หน้าเว็บของเครื่องรับอัปเดตสีและจำนวนนิ้วทันที
        Serial.print(F("SYNC:"));
        Serial.println(currentFingerCount);
      }
    }
  }

  // 2. ตอบกลับสถานะปัจจุบันเมื่อหน้าเว็บเครื่องรับขอเข้ามา (เช่น เมื่อเพิ่งกด Connect Serial)
  while (Serial.available() > 0) {
    char c = Serial.read();
    if (c == '?' || c == 'S') {
      Serial.print(F("SYNC:"));
      Serial.println(currentFingerCount);
    }
  }
}`, explanation: 'รอรับข้อมูลจาก Transmitter และปรับเปลี่ยนสี LED ตามที่ได้รับทันที' }
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

const CodeHighlighter = ({ code }: { code: string }) => {
  const html = code
    .replace(/(\/\/.*)/g, '<span class="text-green-500/80 italic">$1</span>')
    .replace(/(".*?")/g, '<span class="text-orange-300">$1</span>')
    .replace(/\b(void|const|byte|char|if|sizeof|while|for|return|int)\b/g, '<span class="text-purple-400 font-bold">$1</span>')
    .replace(/\b(radio|Serial|delay)\b/g, '<span class="text-yellow-200">$1</span>')
    .replace(/(\#include)/g, '<span class="text-pink-400 font-bold">$1</span>')
    .replace(/(&lt;.*?&gt;|<.*?>)/g, '<span class="text-orange-300">$1</span>');

  return <code dangerouslySetInnerHTML={{ __html: html }} />;
};

export function CodeLabRxSlide() {
  const [activeSection, setActiveSection] = useState(RX_CODE_SECTIONS[0].id);
  const [rightTab, setRightTab] = useState<'output' | 'wiring'>('output');
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(true);

  // Terminal Animation
  useEffect(() => {
    if (rightTab !== 'output' || !isRunning) return;
    
    setTerminalLines(["Initializing NRF24L01...", "Radio is ready.", "Listening on address: 00001"]);
    
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setTerminalLines(prev => {
        const newLines = [...prev, `[${new Date().toLocaleTimeString()}] Received: Hello IoT`];
        return newLines.slice(-8); // Keep last 8 lines
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [rightTab, isRunning]);

  const connections: Record<string, string> = {
    "CE": "D9", "CSN": "D10", "SCK": "D13", "MOSI": "D11", "MISO": "D12", "VCC": "3.3V", "GND": "GND"
  };
  const arduinoPinColors = Object.entries(connections).reduce((acc, [nrf, ctrl]) => ({...acc, [ctrl]: WIRE_COLORS[nrf]}), {});

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-0">
        
        {/* Left Column: VSCode IDE */}
        <div className="w-full md:w-1/2 flex flex-col min-h-0 bg-[#1e1e1e] rounded-xl border border-white/10 shadow-2xl overflow-hidden">
          {/* IDE Header */}
          <div className="bg-[#2d2d2d] h-10 flex items-center px-4 justify-between shrink-0 border-b border-black/50">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-gray-400 font-mono text-xs flex items-center gap-2">
              <Code size={14} /> receiver.ino
            </div>
            <div className="w-12"></div>
          </div>
          
          <div className="flex-1 flex flex-col font-mono text-sm leading-relaxed overflow-y-auto custom-scrollbar bg-[#1e1e1e]">
            {RX_CODE_SECTIONS.map((section) => (
              <motion.div
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex cursor-pointer transition-colors ${
                  activeSection === section.id 
                    ? 'bg-purple-900/30' 
                    : 'hover:bg-white/5'
                }`}
              >
                {/* Line numbers (fake) */}
                <div className="w-10 shrink-0 bg-[#252526] text-gray-600 flex flex-col items-center py-4 border-r border-[#333]">
                  {section.code.split('\n').map((_, i) => <div key={i}>{i+1}</div>)}
                </div>
                <div className="flex-1 p-4">
                  <div className={`text-xs mb-2 font-sans font-bold ${activeSection === section.id ? 'text-purple-400' : 'text-gray-500'}`}>
                    // {section.title}
                  </div>
                  <pre className="text-gray-300 overflow-x-auto">
                    <CodeHighlighter code={section.code} />
                  </pre>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Explanation Footer */}
          <div className="bg-[#6b21a8] text-white p-4 font-sans text-sm flex items-center gap-3 shrink-0">
            <div className="bg-white/20 p-2 rounded-lg"><Code size={16} /></div>
            <div>
              <div className="font-bold mb-0.5">คำอธิบายโค้ด</div>
              <div className="text-purple-100">{RX_CODE_SECTIONS.find(s => s.id === activeSection)?.explanation}</div>
            </div>
          </div>
        </div>

        {/* Right Column: Output / Wiring Tab */}
        <div className="w-full md:w-1/2 flex flex-col min-h-0 bg-black/40 rounded-xl border border-white/5 overflow-hidden">
          <div className="flex bg-[#252526] p-2 shrink-0 gap-2 border-b border-black">
            <button 
              onClick={() => setRightTab('output')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-semibold transition-all ${rightTab === 'output' ? 'bg-[#1e1e1e] text-purple-400 shadow-md border-t-2 border-purple-500' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}`}
            >
              <Terminal size={16} /> Serial Monitor
            </button>
            <button 
              onClick={() => setRightTab('wiring')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-semibold transition-all ${rightTab === 'wiring' ? 'bg-[#1e1e1e] text-emerald-400 shadow-md border-t-2 border-emerald-500' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}`}
            >
              <Cpu size={16} /> Hardware Ref
            </button>
          </div>

          <div className="flex-1 relative overflow-hidden bg-[#1e1e1e]">
            <AnimatePresence mode="wait">
              {rightTab === 'output' ? (
                <motion.div
                  key="output"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full p-4 font-mono text-pink-400 flex flex-col"
                >
                  <div className="flex items-center justify-between text-gray-500 text-xs mb-4 border-b border-white/10 pb-2">
                    <div className="flex items-center gap-2"><Terminal size={12} /> COM4 - 9600 baud</div>
                    <button onClick={() => setIsRunning(!isRunning)} className="flex items-center gap-1 hover:text-white transition-colors">
                      {isRunning ? <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span> : <Play size={12} />} 
                      {isRunning ? 'Running' : 'Paused'}
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto custom-scrollbar space-y-1 text-sm">
                    {terminalLines.map((line, i) => (
                      <motion.p 
                        key={i} 
                        initial={{ opacity: 0, x: -10 }} 
                        animate={{ opacity: 1, x: 0 }}
                        className={line.includes("Received") ? "text-pink-300" : "text-gray-400"}
                      >
                        {line}
                      </motion.p>
                    ))}
                    {isRunning && <p className="animate-pulse">_</p>}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="wiring"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full overflow-y-auto custom-scrollbar"
                >
                  <div className="p-4 text-center border-b border-white/5 bg-black/20">
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

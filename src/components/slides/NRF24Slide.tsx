"use client";
import { motion } from "framer-motion";
import { Radio, Cpu, ArrowRight } from "lucide-react";

export function NRF24Slide() {
  const connections = [
    { nrf: "VCC", ctrl: "3.3V", desc: "ห้ามต่อ 5V เด็ดขาด (บอร์ดอาจพัง)", color: "text-red-400" },
    { nrf: "GND", ctrl: "GND", desc: "กราวด์ร่วม", color: "text-gray-400" },
    { nrf: "CE", ctrl: "D9", desc: "Chip Enable (สั่งเริ่มส่ง/รับ)", color: "text-blue-400" },
    { nrf: "CSN", ctrl: "D10", desc: "Chip Select Not (SPI)", color: "text-blue-400" },
    { nrf: "SCK", ctrl: "D13", desc: "SPI Clock", color: "text-green-400" },
    { nrf: "MOSI", ctrl: "D11", desc: "SPI Master Out Slave In", color: "text-green-400" },
    { nrf: "MISO", ctrl: "D12", desc: "SPI Master In Slave Out", color: "text-green-400" },
  ];

  return (
    <div className="w-full h-full p-6 flex flex-col items-center justify-center bg-transparent text-white">
      <motion.div 
        className="w-full max-w-4xl bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-md shadow-[0_0_40px_rgba(139,92,246,0.15)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">การเชื่อมต่อ NRF24L01 (SPI Protocol)</h2>
          <p className="text-gray-400 mt-2">โมดูลสื่อสารไร้สาย 2.4GHz</p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Microcontroller */}
          <div className="flex-1 bg-black/40 border border-white/10 rounded-2xl p-6 w-full relative">
            <div className="flex items-center gap-3 mb-6">
              <Cpu className="text-blue-400" size={32} />
              <h3 className="text-xl font-semibold">Microcontroller</h3>
            </div>
            <div className="space-y-3">
              {connections.map((c, i) => (
                <div key={`ctrl-${i}`} className="flex justify-end p-2 bg-white/5 rounded-lg border border-white/5">
                  <span className={`font-mono font-bold ${c.color}`}>{c.ctrl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Connections (Arrows) */}
          <div className="flex flex-col space-y-4">
            {connections.map((c, i) => (
              <motion.div 
                key={`arrow-${i}`} 
                className="flex items-center gap-2 group relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className={`h-[2px] w-12 md:w-24 ${c.color.replace('text-', 'bg-')}/50 relative overflow-hidden`}>
                  <motion.div 
                    className={`absolute top-0 bottom-0 left-0 w-1/3 ${c.color.replace('text-', 'bg-')}`}
                    animate={{ x: ["-100%", "300%"] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: i * 0.2 }}
                  />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-gray-900 px-3 py-1 rounded-md text-xs border border-white/20 z-10 pointer-events-none">
                  {c.desc}
                </div>
              </motion.div>
            ))}
          </div>

          {/* NRF24L01 */}
          <div className="flex-1 bg-black/40 border border-white/10 rounded-2xl p-6 w-full relative shadow-[0_0_20px_rgba(59,130,246,0.1)]">
            <div className="flex items-center gap-3 mb-6">
              <Radio className="text-purple-400" size={32} />
              <h3 className="text-xl font-semibold">NRF24L01</h3>
            </div>
            <div className="space-y-3">
              {connections.map((c, i) => (
                <div key={`nrf-${i}`} className="flex justify-start p-2 bg-white/5 rounded-lg border border-white/5">
                  <span className={`font-mono font-bold ${c.color}`}>{c.nrf}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

"use client";
import React from "react";
import { motion } from "framer-motion";

export const NRF_PINS = ["GND", "VCC", "CE", "CSN", "SCK", "MOSI", "MISO", "IRQ"];

export function NRF24L01({
  onPinClick,
  selectedPin,
  activeConnections = {},
  pinColors = {}
}: {
  onPinClick?: (pin: string) => void;
  selectedPin?: string | null;
  activeConnections?: Record<string, string>;
  pinColors?: Record<string, string>;
}) {
  // NRF24L01 has a 2x4 pin header
  // Looking from top (antenna on top):
  // GND  CE   SCK  MISO
  // VCC  CSN  MOSI IRQ
  const topRow = ["GND", "CE", "SCK", "MISO"];
  const bottomRow = ["VCC", "CSN", "MOSI", "IRQ"];

  const renderPin = (pin: string) => {
    const isSelected = selectedPin === pin;
    const isConnected = Object.values(activeConnections).includes(pin) || Object.keys(activeConnections).includes(pin);
    const customColorClass = pinColors[pin];

    return (
      <div key={pin} className="flex flex-col items-center gap-1 group" onClick={() => onPinClick?.(pin)}>
        <motion.div
          whileHover={{ scale: 1.2 }}
          className={`w-5 h-5 rounded-sm border-[2px] cursor-pointer transition-colors relative flex items-center justify-center
            ${isSelected ? 'bg-purple-500 border-white shadow-[0_0_15px_#a855f7] z-10' :
              customColorClass ? customColorClass :
              isConnected ? 'bg-green-500 border-green-300' : 'bg-[#C0A040] border-[#8A7330] hover:border-white'}`}
          id={`pin-nrf-${pin}`}
        >
          <div className="w-2 h-2 rounded-full bg-black"></div>
        </motion.div>
        <span className="text-[9px] font-bold text-white/80 select-none">
          {pin}
        </span>
      </div>
    );
  };

  return (
    <div className="relative w-[200px] h-[300px] bg-[#1a1a1a] rounded-lg border-2 border-[#333] shadow-2xl flex flex-col items-center p-4">
      {/* Zig-Zag Antenna */}
      <div className="w-full h-16 border-4 border-[#C0A040] border-t-0 border-l-0 mb-4 rounded-br-lg opacity-80" style={{ borderStyle: 'solid', borderImage: 'repeating-linear-gradient(45deg, #C0A040, #C0A040 10px, transparent 10px, transparent 20px) 1' }}>
        <div className="w-full h-2 bg-[#C0A040] absolute top-4 left-0"></div>
        <div className="w-full h-2 bg-[#C0A040] absolute top-10 left-0"></div>
      </div>
      
      {/* IC Chip */}
      <div className="w-16 h-16 bg-black rounded-sm border border-gray-800 flex items-center justify-center shadow-lg my-auto">
        <span className="text-[8px] text-gray-500 font-mono tracking-wider rotate-90">NRF24L01</span>
      </div>

      {/* 2x4 Header Pins */}
      <div className="mt-auto bg-black/60 p-3 rounded-lg border border-white/10">
        <div className="flex gap-2 mb-2">
          {topRow.map(renderPin)}
        </div>
        <div className="flex gap-2">
          {bottomRow.map(renderPin)}
        </div>
      </div>
    </div>
  );
}

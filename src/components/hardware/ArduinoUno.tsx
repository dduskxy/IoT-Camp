"use client";
import React from "react";
import { motion } from "framer-motion";

export const ARDUINO_PINS = [
  // Top row (Digital) - Right to left typical Arduino orientation
  "D13", "D12", "D11", "D10", "D9", "D8", "D7", "D6", "D5", "D4", "D3", "D2", "TX", "RX",
  // Bottom row (Power & Analog) - Left to right
  "3.3V", "5V", "GND", "GND", "VIN", "A0", "A1", "A2", "A3", "A4", "A5"
];

export function ArduinoUno({
  onPinClick,
  selectedPin,
  activeConnections = {}
}: {
  onPinClick?: (pin: string) => void;
  selectedPin?: string | null;
  activeConnections?: Record<string, string>;
}) {
  const topPins = ["D13", "D12", "D11", "D10", "D9", "D8", "D7", "D6", "D5", "D4", "D3", "D2", "TX", "RX"];
  const bottomPins = ["3.3V", "5V", "GND", "GND", "VIN", "A0", "A1", "A2", "A3", "A4", "A5"];

  const renderPin = (pin: string) => {
    const isSelected = selectedPin === pin;
    const isConnected = Object.values(activeConnections).includes(pin) || Object.keys(activeConnections).includes(pin);

    return (
      <div key={pin} className="flex flex-col items-center gap-1 group" onClick={() => onPinClick?.(pin)}>
        <span className="text-[9px] font-bold text-white/70 tracking-tighter -rotate-90 md:rotate-0 my-2 md:my-0 select-none">
          {pin}
        </span>
        <motion.div
          whileHover={{ scale: 1.2 }}
          className={`w-4 h-4 rounded-full border-2 cursor-pointer transition-colors relative flex items-center justify-center
            ${isSelected ? 'bg-blue-400 border-white shadow-[0_0_10px_#60a5fa]' :
              isConnected ? 'bg-green-500 border-green-300' : 'bg-black/60 border-gray-500 hover:border-white'}`}
          id={`pin-arduino-${pin}`}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="relative w-full max-w-[450px] aspect-[4/3] bg-[#005C8A] rounded-[24px] border-[3px] border-[#004A70] shadow-2xl flex flex-col justify-between p-4 overflow-visible">
      {/* USB and Power Jacks */}
      <div className="absolute top-8 -left-4 w-12 h-16 bg-gray-300 border-2 border-gray-400 rounded-sm shadow-md"></div>
      <div className="absolute bottom-8 -left-3 w-10 h-12 bg-black border-2 border-gray-700 rounded-sm shadow-md"></div>
      
      {/* Microcontroller Chip */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-10 bg-black rounded-sm flex items-center justify-center border border-gray-800 shadow-xl">
        <span className="text-[8px] text-gray-500 tracking-[0.3em] font-mono">ATMEGA328P</span>
      </div>

      {/* Arduino Logo Text */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/4 text-white/20 font-black tracking-widest text-xl rotate-90 select-none">
        UNO
      </div>

      {/* Top Pins (Digital) */}
      <div className="flex justify-end w-full gap-2 px-6">
        <div className="flex gap-[3px] bg-black/40 p-1.5 rounded-md border border-white/10">
          {topPins.map(renderPin)}
        </div>
      </div>

      {/* Bottom Pins (Power & Analog) */}
      <div className="flex justify-start w-full gap-6 px-12">
        <div className="flex gap-[3px] bg-black/40 p-1.5 rounded-md border border-white/10">
          {bottomPins.slice(0, 5).map(renderPin)}
        </div>
        <div className="flex gap-[3px] bg-black/40 p-1.5 rounded-md border border-white/10">
          {bottomPins.slice(5).map(renderPin)}
        </div>
      </div>
    </div>
  );
}

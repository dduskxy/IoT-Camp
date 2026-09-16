"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, RefreshCcw, Info } from "lucide-react";
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
  "GND": "bg-black border-gray-600",
  "VCC": "bg-red-500 border-red-400",
  "CE": "bg-orange-500 border-orange-400",
  "CSN": "bg-yellow-500 border-yellow-400",
  "SCK": "bg-green-500 border-green-400",
  "MOSI": "bg-blue-500 border-blue-400",
  "MISO": "bg-purple-500 border-purple-400",
  "IRQ": "bg-gray-400 border-gray-300",
};

export function WiringSingleSlide() {
  const [connections, setConnections] = useState<Record<string, string>>({});
  const [selectedNrfPin, setSelectedNrfPin] = useState<string | null>(null);

  const nrfPins = Object.keys(TARGET_WIRING);

  const handleNrfClick = (pin: string) => {
    if (selectedNrfPin === pin) {
      setSelectedNrfPin(null);
    } else {
      setSelectedNrfPin(pin);
    }
  };

  const handleCtrlClick = (pin: string) => {
    if (selectedNrfPin) {
      setConnections(prev => ({ ...prev, [selectedNrfPin]: pin }));
      setSelectedNrfPin(null);
    }
  };

  const checkWiring = () => {
    let correct = 0;
    nrfPins.forEach(pin => {
      if (connections[pin] === TARGET_WIRING[pin]) correct++;
    });
    return {
      total: nrfPins.length,
      correct,
      isPerfect: correct === nrfPins.length,
      isComplete: Object.keys(connections).length === nrfPins.length
    };
  };

  const status = checkWiring();

  return (
    <div className="w-full h-full flex flex-col bg-transparent text-white font-sans">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
          Wiring Simulator: Arduino ↔ NRF24L01
        </h2>
        <p className="text-gray-400 mt-2 text-lg">Click a pin on the NRF24L01, then click the matching pin on the Arduino Uno.</p>
      </div>

      <div className="flex-1 flex flex-col gap-8 justify-start items-center w-full">
        {/* Hardware Row */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 w-full">
          {/* NRF24L01 Side */}
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold mb-4 text-purple-400">1. Select NRF24 Pin</h3>
            <NRF24L01 
              onPinClick={handleNrfClick}
              selectedPin={selectedNrfPin}
              activeConnections={connections}
            />
          </div>

          {/* Connection Animation / Arrow */}
          <div className="hidden md:flex flex-col items-center justify-center opacity-50">
            <div className="h-[2px] w-16 bg-gradient-to-r from-purple-500 to-blue-500"></div>
          </div>

          {/* Arduino Side */}
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold mb-4 text-blue-400">2. Connect to Arduino</h3>
            <ArduinoUno 
              onPinClick={handleCtrlClick}
              selectedPin={null}
              activeConnections={Object.entries(connections).reduce((acc, [k, v]) => ({...acc, [v]: k}), {})}
            />
          </div>
        </div>

        {/* Wire Connections Status & Controls Row */}
        <div className="w-full flex flex-col lg:flex-row gap-6 items-stretch justify-center max-w-5xl mx-auto mt-4">
          
          {/* Wire List */}
          <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center justify-between">
              <span>Connections</span>
              <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">{Object.keys(connections).length} / {nrfPins.length}</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {Object.entries(connections).map(([nrfPin, ctrlPin]) => (
                  <motion.div
                    key={nrfPin}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2 p-2 rounded-lg bg-black/40 border border-white/5"
                  >
                    <div className={`w-3 h-3 rounded-full border ${WIRE_COLORS[nrfPin] || 'bg-white'}`}></div>
                    <span className="font-mono font-bold text-sm">{nrfPin}</span>
                    <span className="text-xs text-gray-500">→</span>
                    <span className="font-mono font-bold text-sm text-blue-300">{ctrlPin}</span>
                    <button 
                      onClick={() => setConnections(prev => {
                        const next = {...prev};
                        delete next[nrfPin];
                        return next;
                      })}
                      className="ml-1 text-gray-500 hover:text-red-400 transition-colors"
                    >
                      <XCircle size={14} />
                    </button>
                  </motion.div>
                ))}
                {Object.keys(connections).length === 0 && (
                  <div className="text-gray-500 text-sm italic w-full text-center py-2">
                    No wires connected yet.
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Verification Status */}
          <motion.div 
            className="flex-1 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-between gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-500/20 rounded-full text-blue-400 shrink-0">
                <Info size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Wiring Check</h4>
                {status.isComplete ? (
                  <p className={status.isPerfect ? "text-green-400 font-medium" : "text-red-400 font-medium"}>
                    {status.isPerfect ? "Excellent! All wires are correctly connected." : `You have ${status.total - status.correct} incorrect connections.`}
                  </p>
                ) : (
                  <p className="text-gray-400 text-sm">Connect all 7 essential pins (CE, CSN, SCK, MOSI, MISO, VCC, GND).</p>
                )}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 mt-4">
              {status.isComplete && !status.isPerfect && (
                <button
                  onClick={() => {
                    const correctOnly: Record<string, string> = {};
                    Object.entries(connections).forEach(([k, v]) => {
                      if (TARGET_WIRING[k] === v) correctOnly[k] = v;
                    });
                    setConnections(correctOnly);
                  }}
                  className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors font-semibold flex-1 text-sm"
                >
                  Remove Wrong Wires
                </button>
              )}
              <button
                onClick={() => { setConnections({}); setSelectedNrfPin(null); }}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center justify-center gap-2 font-semibold flex-1 text-sm"
              >
                <RefreshCcw size={16} />
                Reset All
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

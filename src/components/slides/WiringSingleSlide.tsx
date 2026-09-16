"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, RefreshCcw } from "lucide-react";

const TARGET_WIRING: Record<string, string> = {
  "CE": "D9",
  "CSN": "D10",
  "SCK": "D13",
  "MOSI": "D11",
  "MISO": "D12",
  "VCC": "3.3V",
  "GND": "GND"
};

export function WiringSingleSlide() {
  const [connections, setConnections] = useState<Record<string, string>>({});
  const [selectedNrfPin, setSelectedNrfPin] = useState<string | null>(null);

  const nrfPins = Object.keys(TARGET_WIRING);
  const ctrlPins = ["D9", "D10", "D11", "D12", "D13", "3.3V", "5V", "GND"];

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
    <div className="w-full h-full p-6 flex flex-col bg-transparent text-white font-sans">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Simulator: ต่อสาย NRF24L01</h2>
        <p className="text-gray-400 mt-2">คลิกที่พอร์ต NRF แล้วคลิกที่พอร์ตบอร์ดเพื่อเชื่อมต่อสาย</p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-8 justify-center items-stretch max-w-5xl mx-auto w-full">
        {/* NRF Module */}
        <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md relative flex flex-col">
          <h3 className="text-xl font-semibold mb-6 text-center text-purple-400">NRF24L01 Pins</h3>
          <div className="flex-1 flex flex-col gap-3 justify-center">
            {nrfPins.map(pin => {
              const isConnected = !!connections[pin];
              const isSelected = selectedNrfPin === pin;
              const isCorrect = isConnected && connections[pin] === TARGET_WIRING[pin];
              const isWrong = isConnected && connections[pin] !== TARGET_WIRING[pin];

              return (
                <motion.button
                  key={`nrf-${pin}`}
                  onClick={() => handleNrfClick(pin)}
                  className={`p-3 rounded-xl border flex justify-between items-center transition-all ${
                    isSelected ? 'bg-purple-500/30 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)]' :
                    isConnected ? 'bg-white/10 border-white/30' : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="font-mono font-bold">{pin}</span>
                  <div className="flex items-center gap-2">
                    {isConnected && (
                      <span className="text-xs px-2 py-1 bg-black/40 rounded-md font-mono text-gray-300">
                        {connections[pin]}
                      </span>
                    )}
                    {status.isComplete && isCorrect && <CheckCircle2 size={16} className="text-green-400" />}
                    {status.isComplete && isWrong && <XCircle size={16} className="text-red-400" />}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Controller */}
        <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md relative flex flex-col">
          <h3 className="text-xl font-semibold mb-6 text-center text-blue-400">Controller Pins</h3>
          <div className="flex-1 flex flex-col gap-3 justify-center">
            {ctrlPins.map(pin => {
              const isTargeted = selectedNrfPin !== null;
              
              return (
                <motion.button
                  key={`ctrl-${pin}`}
                  onClick={() => handleCtrlClick(pin)}
                  disabled={!isTargeted}
                  className={`p-3 rounded-xl border flex justify-between items-center transition-all ${
                    isTargeted ? 'bg-blue-900/20 border-blue-500/50 hover:bg-blue-800/40 cursor-pointer shadow-[0_0_10px_rgba(59,130,246,0.2)]' : 'bg-black/40 border-white/5 opacity-50 cursor-not-allowed'
                  }`}
                  whileHover={isTargeted ? { scale: 1.02, x: -5 } : {}}
                  whileTap={isTargeted ? { scale: 0.98 } : {}}
                >
                  <span className="font-mono font-bold">{pin}</span>
                  <div className="w-4 h-4 rounded-full bg-black border border-white/20"></div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <motion.div 
        className="mt-8 max-w-5xl mx-auto w-full p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div>
          <p className="text-sm text-gray-400">สถานะการเชื่อมต่อ:</p>
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold">{Object.keys(connections).length} / {status.total} สาย</span>
            {status.isComplete && (
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${status.isPerfect ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {status.isPerfect ? 'ยอดเยี่ยม! ต่อสายถูกต้องทั้งหมด' : `มีข้อผิดพลาด ${status.total - status.correct} จุด`}
              </span>
            )}
          </div>
        </div>
        <button
          onClick={() => { setConnections({}); setSelectedNrfPin(null); }}
          className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors flex items-center gap-2"
        >
          <RefreshCcw size={18} />
          <span>เริ่มใหม่</span>
        </button>
      </motion.div>
    </div>
  );
}

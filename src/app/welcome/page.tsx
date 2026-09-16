"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronRight, Cpu, User, Users, Clock, ShieldCheck, Database, Zap, Activity } from "lucide-react";
import { students, Student } from "@/data/students";

type AppState = "hero" | "search" | "reveal" | "team" | "all_teams" | "timeline" | "brief";

export default function WelcomePage() {
  const [appState, setAppState] = useState<AppState>("hero");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  
  // Handlers
  const handleStartSearch = () => setAppState("search");
  
  const handleSelectStudent = (student: Student) => {
    setSelectedStudent(student);
    setAppState("reveal");
    setTimeout(() => {
      setAppState("team");
    }, 2500); // 2.5s reveal animation
  };

  const handleBackToSearch = () => {
    setSelectedStudent(null);
    setSearchQuery("");
    setAppState("search");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-blue-500/30">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-indigo-600 rounded-full mix-blend-screen filter blur-[120px] opacity-70"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 min-h-screen flex flex-col">
        {/* Top Nav (Optional) */}
        <header className="py-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Cpu className="w-6 h-6 text-blue-400" />
            <span className="font-bold tracking-wider text-sm cursor-pointer" onClick={() => setAppState("hero")}>IoT MISSION</span>
          </div>
          <div className="flex space-x-4 text-xs font-medium text-white/50">
            <button onClick={() => setAppState("brief")} className="hover:text-white transition">WELCOME MESSAGE</button>
            <button onClick={() => setAppState("all_teams")} className="hover:text-white transition">ALL TEAMS</button>
            <button onClick={() => setAppState("timeline")} className="hover:text-white transition">TIMELINE</button>
          </div>
        </header>

        <main className="flex-1 flex flex-col justify-center py-12">
          <AnimatePresence mode="wait">
            {appState === "hero" && <HeroSection key="hero" onStart={handleStartSearch} />}
            {appState === "search" && <SearchSection key="search" query={searchQuery} setQuery={setSearchQuery} onSelect={handleSelectStudent} />}
            {appState === "reveal" && <RevealSection key="reveal" student={selectedStudent!} />}
            {appState === "team" && <TeamSection key="team" student={selectedStudent!} onBack={handleBackToSearch} />}
            {appState === "all_teams" && <AllTeamsSection key="all_teams" onBack={() => setAppState("hero")} />}
            {appState === "timeline" && <TimelineSection key="timeline" onBack={() => setAppState("hero")} />}
            {appState === "brief" && <BriefSection key="brief" onBack={() => setAppState("hero")} />}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

// -----------------------------------------------------
// Components
// -----------------------------------------------------

function AnimatedMesh() {
  return (
    <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none flex justify-center items-center opacity-40 mix-blend-screen">
      <motion.svg
        viewBox="0 0 800 800"
        className="w-[800px] h-[800px] md:w-[1200px] md:h-[1200px]"
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
      >
        <defs>
          <linearGradient id="meshGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.ellipse
            key={i}
            cx="400"
            cy="400"
            rx="300"
            ry="100"
            fill="none"
            stroke="url(#meshGrad)"
            strokeWidth="1"
            style={{ transformOrigin: "400px 400px", rotate: i * 20 }}
            animate={{
              rx: [300, 350, 300],
              ry: [100, 150, 100],
            }}
            transition={{
              duration: 8 + (i % 5),
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.svg>
    </div>
  );
}

function HeroSection({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto text-center relative"
    >
      <AnimatedMesh />
      
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-8 inline-flex items-center justify-center p-3 bg-white/5 rounded-full border border-white/10 backdrop-blur-md relative z-10"
      >
        <span className="text-xs font-mono tracking-widest text-blue-300 px-4">NAKHON PHANOM WITTAYAKOM SCHOOL</span>
      </motion.div>
      
      <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 relative z-10">
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">WELCOME TO</span>
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-300 drop-shadow-[0_0_40px_rgba(59,130,246,0.4)] mt-2">
          IoT MISSION
        </span>
      </h1>
      
      <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-6 text-sm md:text-base text-white/60 mb-12 font-mono relative z-10">
        <div className="flex items-center"><Clock className="w-4 h-4 mr-2" /> 17 SEPTEMBER 2026</div>
        <div className="hidden md:block w-1 h-1 bg-white/30 rounded-full"></div>
        <div className="flex items-center"><User className="w-4 h-4 mr-2" /> ENGINEERING FACULTY NPU</div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className="group relative inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold tracking-wide transition-all overflow-hidden shadow-[0_0_40px_rgba(37,99,235,0.3)] z-10"
      >
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
        <Search className="w-5 h-5 mr-3" />
        ค้นหาชื่อของฉัน
        <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
      </motion.button>
      <p className="mt-4 text-xs text-white/40 relative z-10">ค้นหาชื่อเพื่อดูภารกิจและทีมของคุณ</p>
    </motion.div>
  );
}

function SearchSection({ query, setQuery, onSelect }: { query: string, setQuery: (q: string) => void, onSelect: (s: Student) => void }) {
  const filtered = query.trim().length > 0 
    ? students.filter(s => s.name.includes(query) || s.className.includes(query))
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto w-full"
    >
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2">IDENTIFY YOURSELF</h2>
        <p className="text-white/50 text-sm">พิมพ์ชื่อของคุณเพื่อเข้าสู่ระบบ</p>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-white/40" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="พิมพ์ชื่อของคุณ..."
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 backdrop-blur-md transition-all text-lg"
          autoFocus
        />
      </div>

      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        <AnimatePresence>
          {filtered.map(student => (
            <motion.button
              key={student.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={() => onSelect(student)}
              className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-colors text-left group"
            >
              <div>
                <div className="font-medium text-lg">{student.name}</div>
                <div className="text-sm text-white/50">{student.className}</div>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
        
        {query.trim().length > 0 && filtered.length === 0 && (
          <div className="text-center py-8 text-white/40">
            ไม่พบรายชื่อ ลองค้นหาด้วยชื่อหรือนามสกุลอีกครั้ง
          </div>
        )}
      </div>
    </motion.div>
  );
}

function RevealSection({ student }: { student: Student }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="max-w-md mx-auto text-center flex flex-col items-center justify-center min-h-[40vh]"
    >
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        className="w-24 h-24 border-2 border-blue-500/30 border-t-blue-500 rounded-full mb-8"
      />
      
      <motion.h3 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-xl font-mono text-blue-400 mb-2 tracking-widest"
      >
        SCANNING PROTOCOL
      </motion.h3>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-white/60"
      >
        กำลังค้นหา Mission ของคุณ...
      </motion.p>
    </motion.div>
  );
}

function TeamSection({ student, onBack }: { student: Student, onBack: () => void }) {
  const teamMembers = students.filter(s => s.group === student.group);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-5xl mx-auto"
    >
      <button onClick={onBack} className="mb-6 text-sm text-white/50 hover:text-white flex items-center transition">
        <ChevronRight className="w-4 h-4 rotate-180 mr-1" />
        กลับไปหน้าค้นหา
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Identity */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md relative overflow-hidden flex flex-col justify-center">
          <div className={`absolute top-0 right-0 w-64 h-64 blur-[80px] opacity-20 -mr-10 -mt-10 bg-current ${student.color}`}></div>
          
          <div className="text-sm font-mono text-white/50 mb-2">MISSION ACCEPTED</div>
          <h2 className={`text-5xl md:text-6xl font-black tracking-tight mb-4 ${student.color}`}>{student.group}</h2>
          <div className="text-2xl font-medium mb-8 text-white">{student.name}</div>
          
          <div className="flex items-center space-x-6 text-sm text-white/60">
            <div className="flex items-center"><Users className="w-5 h-5 mr-2" /> {teamMembers.length} Members</div>
            <div className="flex items-center"><User className="w-5 h-5 mr-2" /> {student.className}</div>
          </div>
        </div>
        
        {/* Team Members */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md">
          <h3 className="text-xl font-bold mb-6 flex items-center"><Activity className="w-6 h-6 mr-3 text-blue-400" /> Team Members</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
            {teamMembers.map((member, idx) => (
              <li key={member.id} className={`text-sm md:text-base flex items-center ${member.id === student.id ? 'text-white font-bold bg-white/10 px-3 py-1.5 rounded-lg -ml-3' : 'text-white/60'}`}>
                <span className="opacity-50 mr-2 w-5 text-right">{idx + 1}.</span> {member.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

function AllTeamsSection({ onBack }: { onBack: () => void }) {
  const groups = ["GROUP 01", "GROUP 02", "GROUP 03", "GROUP 04"];
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-5xl mx-auto w-full">
      <button onClick={onBack} className="mb-6 text-sm text-white/50 hover:text-white flex items-center transition">
        <ChevronRight className="w-4 h-4 rotate-180 mr-1" />
        กลับสู่หน้าแรก
      </button>
      <h2 className="text-3xl font-black mb-8 text-center tracking-wider">ALL MISSIONS</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {groups.map(group => {
          const groupStudents = students.filter(s => s.group === group);
          const colorClass = groupStudents[0]?.color || "text-white";
          return (
            <div key={group} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className={`text-2xl font-black mb-2 ${colorClass}`}>{group}</h3>
              <div className="text-sm text-white/40 mb-6">{groupStudents.length} Members</div>
              <ul className="space-y-2">
                {groupStudents.map(s => (
                  <li key={s.id} className="text-xs text-white/70 truncate">{s.name}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

function TimelineSection({ onBack }: { onBack: () => void }) {
  const timeline = [
    { time: "09:00", event: "พิธีเปิดและชี้แจงกิจกรรม" },
    { time: "09:15", event: "เข้าประจำกลุ่ม และรับมอบอุปกรณ์" },
    { time: "09:35", event: "ปูพื้นฐานและทดลองใช้งานอุปกรณ์" },
    { time: "10:30", event: "พักรับประทานอาหารว่าง" },
    { time: "10:40", event: "ปฏิบัติการพัฒนาโครงงาน IoT" },
    { time: "11:45", event: "สรุปผลการเรียนรู้ และปิดกิจกรรม" }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto w-full">
      <button onClick={onBack} className="mb-6 text-sm text-white/50 hover:text-white flex items-center transition">
        <ChevronRight className="w-4 h-4 rotate-180 mr-1" />
        กลับสู่หน้าแรก
      </button>
      <h2 className="text-3xl font-black mb-12 text-center tracking-wider">MISSION TIMELINE</h2>
      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
        {timeline.map((item, i) => (
          <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-blue-400 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
              <div className="w-2 h-2 bg-blue-400 rounded-full group-hover:scale-150 transition-transform"></div>
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm group-hover:bg-white/10 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <span className="font-bold text-lg">{item.event}</span>
                <span className="text-sm font-mono text-blue-400">{item.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function BriefSection({ onBack }: { onBack: () => void }) {
  const [step, setStep] = React.useState(0);

  const slides = [
    {
      title: "ยินดีต้อนรับเข้าสู่ค่าย",
      highlight: "IoT & AUTOMATION MISSION 2026",
      text: "พร้อมที่จะเริ่มต้นภารกิจกันหรือยัง?"
    },
    {
      title: "หลายคนอาจจะสงสัยว่า",
      highlight: "\"ทำไมเราต้องมารู้จัก IoT?\"",
      text: "และ \"เรามาทำอะไรกันที่นี่?\""
    },
    {
      title: "ในยุคนี้",
      highlight: "Internet of Things (IoT)",
      text: "ไม่ใช่แค่เรื่องของอนาคตอีกต่อไป แต่มันคือสิ่งที่มีผลกับชีวิตเราในทุกๆ วัน"
    },
    {
      title: "ทุกอย่างกำลังถูกเชื่อมต่อกัน",
      highlight: "ผ่านอินเทอร์เน็ต",
      text: "ตั้งแต่สมาร์ทโฟน สมาร์ทโฮม ระบบการเกษตรอัจฉริยะ ไปจนถึงเทคโนโลยีทางการแพทย์"
    },
    {
      title: "ค่ายในวันนี้ ไม่ใช่แค่เพื่อให้เรานั่งฟัง",
      highlight: "แต่เพื่อให้พวกเราได้ \"ลงมือทำ\"",
      text: "ได้ลองต่อวงจร ได้ลองเขียนโค้ดสั่งการมันด้วยตัวเอง"
    },
    {
      title: "เพื่อให้เราเข้าใจ",
      highlight: "เบื้องหลังเทคโนโลยีล้ำๆ",
      text: "ว่ามันทำงานยังไง และตัวเราเองก็สามารถสร้างมันขึ้นมาได้เช่นกัน"
    },
    {
      title: "เทคโนโลยีไม่ได้มีไว้เพื่อให้เราเป็นแค่ผู้ใช้งาน",
      highlight: "แต่มันมีไว้เพื่อให้เราเป็น \"ผู้สร้าง\"",
      text: "ขอให้ทุกคนสนุกกับการเรียนรู้และทำภารกิจในวันนี้นะครับ!"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 bg-[#050505] flex flex-col justify-center items-center px-6 md:px-20 text-center"
      onClick={() => {
        if (step < slides.length - 1) setStep(step + 1);
        else onBack();
      }}
    >
      <div className="absolute top-8 left-8">
        <button onClick={(e) => { e.stopPropagation(); onBack(); }} className="text-white/50 hover:text-white flex items-center transition bg-white/5 px-4 py-2 rounded-full border border-white/10">
          <ChevronRight className="w-5 h-5 rotate-180 mr-1" />
          ออกจากการนำเสนอ
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.1, y: -20 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl"
        >
          <h3 className="text-2xl md:text-4xl text-white/70 mb-4 md:mb-6 font-medium">
            {slides[step].title}
          </h3>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 md:mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 drop-shadow-[0_0_30px_rgba(59,130,246,0.3)] leading-tight">
            {slides[step].highlight}
          </h2>
          <p className="text-xl md:text-3xl text-white/80 leading-relaxed font-light">
            {slides[step].text}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-12 flex space-x-3">
        {slides.map((_, i) => (
          <div key={i} className={`h-2 rounded-full transition-all duration-500 ${i === step ? 'w-12 bg-blue-500' : 'w-2 bg-white/20'}`} />
        ))}
      </div>
      
      <p className="absolute bottom-4 text-white/30 text-sm animate-pulse">
        คลิกที่ใดก็ได้เพื่อไปยังหน้าถัดไป
      </p>
    </motion.div>
  );
}


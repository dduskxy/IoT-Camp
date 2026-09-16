const fs = require('fs');
const path = require('path');

const slidesDir = 'C:/Users/asus/Documents/GitHub/IoT-Camp/src/components/slides';
const files = fs.readdirSync(slidesDir).filter(f => f.endsWith('Slide.tsx') || f.endsWith('Slide.ts') || f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(slidesDir, file);
  let code = fs.readFileSync(filePath, 'utf8');
  
  // Unify H2 Titles
  // Find <h2 className="...">...</h2>
  code = code.replace(/<h2 className="[^"]*text-\d+xl[^"]*">([\s\S]*?)<\/h2>/g, 
    '<h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]">$1</h2>'
  );

  // Unify wrapper containers to have consistent padding and flex
  // For HardwareSlide
  if (file === 'HardwareSlide.tsx') {
    code = code.replace(/<h2 className="[^"]*">([\s\S]*?)<\/h2>/g, 
      '<h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-6 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)] text-center w-full">$1</h2>'
    );
  }
  
  // WhatIsIoTSlide
  if (file === 'WhatIsIoTSlide.tsx') {
    code = code.replace(/text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400/g, 'text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]');
  }

  // FinalChallengeSlide
  if (file === 'FinalChallengeSlide.tsx') {
    code = code.replace(/<h2 className="[^"]*">([\s\S]*?)<\/h2>/g, 
      '<h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)] mb-2">$1</h2>'
    );
  }

  fs.writeFileSync(filePath, code);
}
console.log('Unification applied');

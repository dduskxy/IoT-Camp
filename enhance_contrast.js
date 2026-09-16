const fs = require('fs');
const path = require('path');

function enhanceContrast(code) {
  // Main background (if hardcoded)
  code = code.replace(/bg-\[\#030303\]/g, 'bg-[#0A0A0A]'); // Slightly off-black

  // Cards and Panels
  // Upgrade bg-white/5 to bg-white/10 or bg-slate-800/50 for more distinct boundaries
  code = code.replace(/bg-white\/\[0\.02\]/g, 'bg-white/10');
  code = code.replace(/bg-white\/5/g, 'bg-slate-800/60');
  code = code.replace(/border-white\/5/g, 'border-white/20');
  
  // SlideLayout specific sidebar
  code = code.replace(/bg-\[\#080808\]\/95/g, 'bg-[#111827]/95'); // distinct sidebar color
  code = code.replace(/border-white\/10/g, 'border-white/20');

  // Add strong drop shadows and inner glow to cards to separate them from background
  // code = code.replace(/backdrop-blur-md/g, 'backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.6)]');
  
  return code;
}

const dirs = [
  'C:/Users/asus/Documents/GitHub/IoT-Camp/src/components/slides',
  'C:/Users/asus/Documents/GitHub/IoT-Camp/src/app',
  'C:/Users/asus/Documents/GitHub/IoT-Camp/src/app/welcome'
];

for (const d of dirs) {
  if (!fs.existsSync(d)) continue;
  const files = fs.readdirSync(d).filter(f => f.endsWith('.tsx'));
  for (const f of files) {
    const p = path.join(d, f);
    let code = fs.readFileSync(p, 'utf8');
    const newCode = enhanceContrast(code);
    if (code !== newCode) {
      fs.writeFileSync(p, newCode);
      console.log(`Enhanced contrast in ${f}`);
    }
  }
}

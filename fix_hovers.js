const fs = require('fs');
const path = require('path');

function fixHovers(code) {
  code = code.replace(/hover:bg-white\/\[0\.02\]/g, 'hover:bg-white/10');
  
  // Also some icons backgrounds that were bg-white/10 became bg-white/[0.02]
  // Let's just fix the specific one in HardwareSlide
  code = code.replace(/bg-white\/\[0\.02\] text-slate-300/g, 'bg-white/10 text-slate-300');
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
    const newCode = fixHovers(code);
    if (code !== newCode) {
      fs.writeFileSync(p, newCode);
      console.log(`Fixed hovers in ${f}`);
    }
  }
}

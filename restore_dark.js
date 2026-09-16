const fs = require('fs');
const path = require('path');

function restoreDark(code) {
  code = code.replace(/bg-\[\#0A0A0A\]/g, 'bg-[#030303]');
  code = code.replace(/bg-white\/10/g, 'bg-white/[0.02]');
  code = code.replace(/bg-slate-800\/60/g, 'bg-white/5');
  code = code.replace(/border-white\/20/g, 'border-white/5');
  code = code.replace(/bg-\[\#111827\]\/95/g, 'bg-[#080808]/95');
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
    const newCode = restoreDark(code);
    if (code !== newCode) {
      fs.writeFileSync(p, newCode);
      console.log(`Restored dark in ${f}`);
    }
  }
}

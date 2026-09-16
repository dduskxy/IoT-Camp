const fs = require('fs');

function replaceStr(path, from, to) {
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(from, to);
  fs.writeFileSync(path, content);
}

// 1. FinalChallengeSlide
replaceStr('C:/Users/asus/Documents/GitHub/IoT-Camp/src/components/slides/FinalChallengeSlide.tsx', 
  /จบค่าย IoT อย่างเป็นทางการ/g, 
  'จบ Workshop อย่างเป็นทางการ'
);

// 2. HardwareSlide
replaceStr('C:/Users/asus/Documents/GitHub/IoT-Camp/src/components/slides/HardwareSlide.tsx', 
  /อุปกรณ์ที่ต้องใช้ในแคมป์/g, 
  'อุปกรณ์ที่ต้องใช้ในฐานนี้'
);

// 3. Welcome page
replaceStr('C:/Users/asus/Documents/GitHub/IoT-Camp/src/app/welcome/page.tsx', 
  /ยินดีต้อนรับเข้าสู่ค่าย/g, 
  'ยินดีต้อนรับเข้าสู่ Workshop'
);
replaceStr('C:/Users/asus/Documents/GitHub/IoT-Camp/src/app/welcome/page.tsx', 
  /ค่ายในวันนี้/g, 
  'Workshop ในวันนี้'
);

// 4. page.tsx
replaceStr('C:/Users/asus/Documents/GitHub/IoT-Camp/src/app/page.tsx', 
  /Camp 2026/g, 
  'Workshop 2026'
);

// 5. workshop/[step]/page.tsx
const stepPath = 'C:/Users/asus/Documents/GitHub/IoT-Camp/src/app/workshop/[step]/page.tsx';
if (fs.existsSync(stepPath)) {
  replaceStr(stepPath, /Welcome to the Camp/g, 'Welcome to the Workshop');
}

console.log('Words updated');

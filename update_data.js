const fs = require('fs');
let code = fs.readFileSync('C:/Users/asus/Documents/GitHub/IoT-Camp/src/data/workshop.ts', 'utf8');
code = code.replace(/ยินดีต้อนรับสู่แคมป์/g, 'ยินดีต้อนรับสู่ Workshop');
code = code.replace(/ภารกิจของแคมป์/g, 'ภารกิจของฐาน');
fs.writeFileSync('C:/Users/asus/Documents/GitHub/IoT-Camp/src/data/workshop.ts', code);
console.log("data updated");

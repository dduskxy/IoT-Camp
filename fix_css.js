const fs = require('fs');
const p = 'C:/Users/asus/Documents/GitHub/IoT-Camp/src/app/globals.css';
let c = fs.readFileSync(p, 'utf8');

c = c.replace(/background: rgba\(255, 255, 255, 0\.1\);/g, 'background: rgba(0, 0, 0, 0.1);');
c = c.replace(/background: rgba\(255, 255, 255, 0\.2\);/g, 'background: rgba(0, 0, 0, 0.2);');
c = c.replace(/background: #0B0F19;/g, 'background: #f8fafc;');
c = c.replace(/background: rgba\(255, 255, 255, 0\.15\);/g, 'background: rgba(0, 0, 0, 0.15);');
c = c.replace(/border: 2px solid #0B0F19;/g, 'border: 2px solid #f8fafc;');
c = c.replace(/background: rgba\(255, 255, 255, 0\.3\);/g, 'background: rgba(0, 0, 0, 0.3);');

fs.writeFileSync(p, c);
console.log('Fixed css scrollbar');

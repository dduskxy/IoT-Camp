const fs = require('fs');

function replaceFile(path, from, to) {
  let code = fs.readFileSync(path, 'utf8');
  code = code.replace(from, to);
  fs.writeFileSync(path, code);
}

replaceFile('C:/Users/asus/Documents/GitHub/IoT-Camp/src/components/slides/WiringSingleSlide.tsx',
  /จำลองการต่อวงจร: Arduino \+ NRF24L01/g,
  'ขั้นตอนการต่อวงจร (Step-by-Step Wiring)'
);

replaceFile('C:/Users/asus/Documents/GitHub/IoT-Camp/src/components/slides/CodeLabTxSlide.tsx',
  /อธิบายโค้ดฝั่งส่ง/g,
  'อธิบายโค้ด (ฝั่งส่งข้อมูล - TX)'
);

replaceFile('C:/Users/asus/Documents/GitHub/IoT-Camp/src/components/slides/CodeLabRxSlide.tsx',
  /อธิบายโค้ดฝั่งรับ/g,
  'อธิบายโค้ด (ฝั่งรับข้อมูล - RX)'
);

console.log('Titles updated');

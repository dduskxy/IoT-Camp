const fs = require('fs');

const path = 'C:/Users/asus/Documents/GitHub/IoT-Camp/src/components/slides/WiringDualSlide.tsx';
let code = fs.readFileSync(path, 'utf8');

// TX side
code = code.replace(
  /ฝั่งส่งข้อมูล \(เช่น เซ็นเซอร์, รีโมท\)/g,
  'อ่านค่านิ้วมือจาก Web AI ผ่าน Serial'
);
code = code.replace(
  /<li>อ่านค่าจากเซ็นเซอร์<\/li>/g,
  '<li>รับค่าจำนวนนิ้วมือจาก Computer</li>'
);

// RX side
code = code.replace(
  /ฝั่งรับข้อมูล \(เช่น จอแสดงผล, ควบคุมรีเลย์\)/g,
  'รับข้อมูลเพื่อสั่งเปลี่ยนสีไฟ RGB LED'
);
code = code.replace(
  /<li>สั่งงาน Actuators<\/li>/g,
  '<li>สั่งงาน Grove RGB LED</li>'
);

fs.writeFileSync(path, code);
console.log('WiringDual updated');

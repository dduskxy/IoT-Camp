const fs = require('fs');
const path = 'C:/Users/asus/Documents/GitHub/IoT-Camp/src/components/slides/DualSerialSlide.tsx';
let code = fs.readFileSync(path, 'utf8');

code = code.replace(
  /const msg = \`Sensor Data: \$\{Math\.floor\(Math\.random\(\) \* 100\)\}\`;/g,
  'const msg = `Finger Count: ${Math.floor(Math.random() * 6)}`;'
);

code = code.replace(
  /message: \`Sending \[\$\{msg\}\]\`/g,
  'message: `Broadcast [${msg}]`'
);

code = code.replace(
  /message: \`Received \[\$\{msg\}\]\`/g,
  'message: `Received [${msg}] & Applied LED Color`'
);

fs.writeFileSync(path, code);
console.log("Updated DualSerialSlide");

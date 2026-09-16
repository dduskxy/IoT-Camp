const fs = require('fs');

const path = 'C:/Users/asus/Documents/GitHub/IoT-Camp/src/components/slides/HardwareSlide.tsx';
let code = fs.readFileSync(path, 'utf8');

// Add referrerPolicy="no-referrer" to the img tag
code = code.replace(
  /<img[\s\S]*?className="([^"]+)"[\s\S]*?\/>/, 
  `<img \n                src={selectedEq.imageUrl} \n                alt={selectedEq.name}\n                className="$1"\n                referrerPolicy="no-referrer"\n              />`
);

fs.writeFileSync(path, code);
console.log('Fixed img tag');

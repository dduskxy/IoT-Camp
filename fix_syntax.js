const fs = require('fs');
const p = 'C:/Users/asus/Documents/GitHub/IoT-Camp/src/components/slides/SlideLayout.tsx';
let c = fs.readFileSync(p, 'utf8');
c = c.replace(/<\/div>\r?\n\s+<\/div>\r?\n\r?\n\s+\{\/\* The Interactive Content \*\/\}/, '</div>\n\n                {/* The Interactive Content */}');
fs.writeFileSync(p, c);
console.log('Fixed syntax');

const fs = require('fs');

let ds = fs.readFileSync('C:/Users/asus/Documents/GitHub/IoT-Camp/src/components/slides/DualSerialSlide.tsx', 'utf8');
ds = ds.replace(/<h2[\s\S]*?<\/h2>/, '');
fs.writeFileSync('C:/Users/asus/Documents/GitHub/IoT-Camp/src/components/slides/DualSerialSlide.tsx', ds);

let txrx = fs.readFileSync('C:/Users/asus/Documents/GitHub/IoT-Camp/src/components/slides/TxVsRxSlide.tsx', 'utf8');
txrx = txrx.replace(/<motion\.h2[\s\S]*?<\/motion\.h2>/, '');
fs.writeFileSync('C:/Users/asus/Documents/GitHub/IoT-Camp/src/components/slides/TxVsRxSlide.tsx', txrx);

console.log('done');

const https = require('https');
const fs = require('fs');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error('Failed ' + res.statusCode));
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => { file.close(resolve); });
    }).on('error', reject);
  });
}

const urls = [
  { name: 'arduino.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Arduino_Uno_-_R3.jpg' },
  { name: 'shield.png', url: 'https://raw.githubusercontent.com/SeeedDocument/Base_Shield_V2/master/img/Base_Shield_v2.png' },
  { name: 'nrf24.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/NRF24L01.png/800px-NRF24L01.png' },
  { name: 'jumper.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Jumper_wires.jpg/800px-Jumper_wires.jpg' },
  { name: 'led.jpg', url: 'https://raw.githubusercontent.com/SeeedDocument/Grove-Chainable_RGB_LED/master/img/Grove-Chainable_RGB_LED_V2.0.jpg' },
  { name: 'computer.jpg', url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80' },
  { name: 'cable.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/USB_Type-B_plug.jpg/800px-USB_Type-B_plug.jpg' }
];

async function run() {
  for (const item of urls) {
    try {
      await download(item.url, `C:/Users/asus/Documents/GitHub/IoT-Camp/public/images/hardware/${item.name}`);
      console.log(`Success: ${item.name}`);
    } catch (e) {
      console.log(`Fail: ${item.name} - ${e.message}`);
    }
  }
}
run();

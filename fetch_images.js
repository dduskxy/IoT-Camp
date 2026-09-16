const fs = require('fs');
const https = require('https');
const http = require('http');

const items = [
  { file: 'arduino.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Arduino_Uno_-_R3.jpg' },
  { file: 'shield.jpg', url: 'https://raw.githubusercontent.com/SeeedDocument/Base_Shield_V2/master/img/Base_shield_v2.1.jpg' },
  { file: 'nrf24.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/1/15/NRF24L01.jpg' },
  { file: 'jumper.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Jumper_Wires_-_Male_to_Male.jpg' },
  { file: 'led.jpg', url: 'https://raw.githubusercontent.com/SeeedDocument/Grove-Chainable_RGB_LED/master/img/Grove-Chainable_RGB_LED_V2.0.jpg' },
  { file: 'computer.jpg', url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800' },
  { file: 'cable.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/0/07/USB_Type-B_plug.jpg' }
];

async function download(url, filepath) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      }
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307 || res.statusCode === 308) {
        return download(res.headers.location, filepath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed with status code: ${res.statusCode}`));
      }
      const stream = fs.createWriteStream(filepath);
      res.pipe(stream);
      stream.on('finish', () => { stream.close(resolve); });
    });
    req.on('error', reject);
  });
}

async function run() {
  const dir = 'C:/Users/asus/Documents/GitHub/IoT-Camp/public/images/hardware';
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  
  for (const item of items) {
    const p = `${dir}/${item.file}`;
    try {
      await download(item.url, p);
      const stat = fs.statSync(p);
      console.log(`[OK] ${item.file} - ${stat.size} bytes`);
    } catch (e) {
      console.log(`[ERR] ${item.file} - ${e.message}`);
    }
  }
}

run();

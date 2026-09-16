const https = require('https');
const fs = require('fs');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'IoTCampApp/1.0 (test@example.com)' } }, (res) => {
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
  { name: 'nrf24.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/1/15/NRF24L01.jpg' },
  { name: 'jumper.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Jumper_Wires_-_Male_to_Male.jpg' },
  { name: 'cable.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/0/07/USB_Type-B_plug.jpg' },
  { name: 'shield.jpg', url: 'https://raw.githubusercontent.com/SeeedDocument/Base_Shield_V2/master/img/Base_shield_v2.1.jpg' }
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

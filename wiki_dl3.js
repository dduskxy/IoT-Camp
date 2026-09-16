const https = require('https');
const fs = require('fs');

const wikiImages = [
  { name: 'arduino.jpg', file: 'File:Arduino_Uno_-_R3.jpg' },
  { name: 'nrf24.jpg', file: 'File:NRF24L01.jpg' },
  { name: 'jumper.jpg', file: 'File:Jumper_Wires_-_Male_to_Male.jpg' },
  { name: 'cable.jpg', file: 'File:USB_Type-B_plug.jpg' },
  { name: 'shield.jpg', file: 'File:Grove_Base_Shield.jpg' }
];

async function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'IoTApp/1.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 303 || res.statusCode === 308) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error('Failed ' + res.statusCode));
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => { file.close(resolve); });
    }).on('error', reject);
  });
}

async function run() {
  for (const img of wikiImages) {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${img.file}&prop=imageinfo&iiprop=url&format=json`;
    console.log("Checking", img.file);
    await new Promise((resolve) => {
      https.get(url, { headers: { 'User-Agent': 'IoTApp/1.0' } }, res => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', async () => {
          try {
            const json = JSON.parse(data);
            const pages = json.query.pages;
            const page = pages[Object.keys(pages)[0]];
            if (page.imageinfo && page.imageinfo[0].url) {
              const imgUrl = page.imageinfo[0].url;
              console.log(`Downloading ${img.name} from ${imgUrl}`);
              await download(imgUrl, `C:/Users/asus/Documents/GitHub/IoT-Camp/public/images/hardware/${img.name}`);
              console.log(`[OK] ${img.name}`);
            } else {
              console.log(`[NOT FOUND] ${img.file}`);
            }
          } catch(e) { console.log(e); }
          resolve();
        });
      });
    });
  }
}
run();

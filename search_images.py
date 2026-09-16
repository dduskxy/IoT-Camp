from duckduckgo_search import DDGS
import requests
import os
import time

queries = {
    'arduino.jpg': 'Arduino Uno R3 isolated on white background',
    'shield.jpg': 'Grove Base Shield V2 Seeed Studio isolated',
    'nrf24.jpg': 'NRF24L01 wireless module isolated white background',
    'jumper.jpg': 'male to female jumper wires isolated',
    'led.jpg': 'Grove Chainable RGB LED V2.0 seeed',
    'cable.jpg': 'USB Type-B cable isolated'
}

dest_dir = "C:/Users/asus/Documents/GitHub/IoT-Camp/public/images/hardware"
os.makedirs(dest_dir, exist_ok=True)

ddgs = DDGS()

for filename, query in queries.items():
    path = os.path.join(dest_dir, filename)
    print(f"Searching for {query}...")
    try:
        results = ddgs.images(query, max_results=3)
        for res in results:
            url = res['image']
            print(f"  Downloading {url}")
            try:
                response = requests.get(url, timeout=5, headers={'User-Agent': 'Mozilla/5.0'})
                if response.status_code == 200:
                    with open(path, 'wb') as f:
                        f.write(response.content)
                    print(f"  [OK] Saved {filename}")
                    break
            except Exception as e:
                print(f"  [ERR] {e}")
    except Exception as e:
        print(f"Search failed for {filename}: {e}")
    time.sleep(1)


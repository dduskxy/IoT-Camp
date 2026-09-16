from bing_image_downloader import downloader
import os
import shutil

queries = {
    'arduino': 'Arduino Uno R3 board isolated white background',
    'shield': 'Grove Base Shield V2 isolated',
    'nrf24': 'NRF24L01+ wireless module isolated',
    'jumper': 'male to female jumper wires arduino',
    'led': 'Grove Chainable RGB LED V2.0',
    'computer': 'laptop computer isolated on white',
    'cable': 'Arduino USB Type-B cable isolated'
}

base_dir = "C:/Users/asus/Documents/GitHub/IoT-Camp/public/images/hardware"
os.makedirs(base_dir, exist_ok=True)

for name, query in queries.items():
    print(f"Downloading {name}...")
    try:
        downloader.download(query, limit=1, output_dir='temp_images', adult_filter_off=True, force_replace=False, timeout=60, verbose=False)
        downloaded_folder = os.path.join('temp_images', query)
        files = os.listdir(downloaded_folder)
        if files:
            src = os.path.join(downloaded_folder, files[0])
            dst = os.path.join(base_dir, f"{name}.jpg")
            shutil.copy(src, dst)
            print(f"[OK] Saved {name}.jpg")
    except Exception as e:
        print(f"[ERR] {name}: {e}")

try:
    shutil.rmtree('temp_images')
except:
    pass

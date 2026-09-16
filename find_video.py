from bing_image_downloader import downloader
# Just kidding, I will use Python to scrape a free stock video site like coverr.co or pexels
import urllib.request
import json
req = urllib.request.Request("https://api.pexels.com/videos/search?query=abstract+technology+dark&per_page=3", headers={"Authorization": "563492ad6f9170000100000122e2ef0be66d4826b1f24dffcde10972"})
try:
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())
        for video in data['videos']:
            print("Video:", video['id'])
            for file in video['video_files']:
                if file['quality'] == 'hd':
                    print("  URL:", file['link'])
except Exception as e:
    print(e)

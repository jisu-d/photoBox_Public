import base64
import requests
 
from dotenv import load_dotenv
import os

# .env 파일 활성화
load_dotenv()

SERVICE_KEY = os.getenv('IMGBB_API_KEY')


def upload_image_to_imgbb(image_path):
    # 이미지를 base64로 인코딩
    with open(image_path, "rb") as image_file:
        base64_image = base64.b64encode(image_file.read()).decode('utf-8')

    url = "https://api.imgbb.com/1/upload"
    payload = {
        "key": SERVICE_KEY,
        "image": base64_image,  # base64 형식으로 업로드
    }
    
    response = requests.post(url, data=payload)
    
    if response.status_code == 200:
        data = response.json()
        image_url = data['data']['url']
        return image_url
    else:
        return None

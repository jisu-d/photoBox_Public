import subprocess
import time
import re
import os
import requests

import qrcode

def generate_qr_code(url, file_name, output_directory):
    # QR 코드를 생성하여 이미지 파일로 저장

    # # URL 예시
    # url = "https://i.ibb.co/VHcQhFN/7bfd23e1883f.jpg"

    # 정규식 패턴을 사용하여 VHcQhFN 및 7bfd23e1883f 추출
    match = re.search(r'https://i\.ibb\.co/([^/]+)/([^/]+)\.jpg', url)

    if match:
        data1 = match.group(1)
        data2 = match.group(2)
        url = f'https://photo-box-self.vercel.app/?data1={data1}&data2={data2}'
    else:
        print("URL 형식이 맞지 않습니다.")

    
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(url)
    qr.make(fit=True)
    img = qr.make_image(fill='black', back_color='white')

    # 출력 디렉토리 확인 및 생성
    os.makedirs(output_directory, exist_ok=True)
    
    qr_code_path = os.path.join(output_directory, f"{file_name}_qrcode.jpg")
    img.save(qr_code_path)
    
    return qr_code_path


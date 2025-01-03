from fastapi import FastAPI

from overlay_qr_img import overlay_qr_on_image
from print_img import printImgs
from relay import lightingControl

from pydantic import BaseModel

from starlette.middleware.cors import CORSMiddleware

from fastapi.responses import FileResponse
import os

from contextlib import asynccontextmanager


# from get_print_state import getPrintState

origins = [
    "*"
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SelectImg(BaseModel):
    img_num: int
    base64_data: str

class MADE_DATE(BaseModel):
    title: str
    select_imgs: list[SelectImg]

class PRINTOUT_INFO(BaseModel):
    printoutNum: int
    base64_data: str

class LIGHTI_CONTROL_TYPE(BaseModel):
    type: str


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/printImgs")
def read_root(data: PRINTOUT_INFO):
    imgPath =  overlay_qr_on_image(data.base64_data)
    printImgs(data.printoutNum, imgPath)
    return {
        'msg': 'success'
    }

@app.post("/lightingControl")
def read_root(data: LIGHTI_CONTROL_TYPE):
    lightingControl(data.type)
    return {
        'msg': 'success'
    }

# 이미지 파일 경로 설정
IMAGE_DIR = "./save"

@app.get("/image/{image_name}")
async def get_image(image_name: str):
    # 이미지 파일 경로
    file_path = os.path.join(IMAGE_DIR, image_name)

    # 이미지가 존재하는지 확인
    if os.path.exists(file_path):
        # 파일을 클라이언트에게 전달
        return FileResponse(file_path)
    else:
        return {"error": "Image not found"}

# @app.get('/printState')
# async def get_state():
#     print_state = getPrintState('Canon_SELPHY_CP1300_')
#     return {
#         'state': print_state
#     }

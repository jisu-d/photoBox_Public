## 프로젝트 소개
본 프로젝트는 기존 포토부스의 이동의 불편함을 개선하기 위해 기획 및 제작 하였습니다.


## 기능

|start_page|select_design|capture_imgs|
|:--------:|:-----------:|:----------:|
|![select_design](/readme_img//start_page.png)|![select_design](/readme_img///select_design.png)|![select_design](/readme_img//capture_imgs.png)|
|처음 시작 페이지 이므로 화면 중간에 있는 버튼을 클릭하면 사진촬영이 시작됨.|프레임 디자인을 선택하는 페이지 이미지임. 좌우로 움직여 다른 디자인 선택이 가능함|총 6장의 사진을 3초 간격으로 촬영하며, 2초의 대기 시간이 있다.|

|select_imgs|check_made_img|print_wait|
|:---------:|:------------:|:--------:|
|![select_design](/readme_img//select_imgs.png)|![select_design](/readme_img///check_made_img.png)|![select_design](/readme_img//print_wait.png)|
|촬영한 6장의 사진 중 프레임에 합성할 4장의 사진을 선택하는 페이지임.|프레임 디자인을 합성된 이미지를 확인하고 몇장을 인쇄할 것 인지 선택하고 버튼을 클릭하는 페이지임.| 이미지가 인쇄하는 동안 대기하는 페이지임.|


## 기술

### Frontend
<img src="https://img.shields.io/badge/svelteKit-FF3E00?style=flat&logo=svelte&logoColor=white"/>
<img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=flat&logo=tailwindcss&logoColor=white"/>
flowbite

### Backend
<img src="https://img.shields.io/badge/fastapi-009688?style=flat&logo=fastapi&logoColor=white"/>
<img src="https://img.shields.io/badge/opencv-5C3EE8?style=flat&logo=opencv&logoColor=white"/>

### API
- Imgbb

### 배포
- vercel을 사용해 이미지 다운로드 페이지 배포함.
- 라즈베리파이 <img src="https://img.shields.io/badge/raspberrypi-A22846?style=flat&logo=raspberrypi&logoColor=white"/> 를 사용해 기본적으로 Frontend, Backend를 실행함.


## 하드웨어 제작

### 외관 경관


| ![obj_img](/readme_img/obj_img.png) | ![real_picture](/readme_img/real_picture.jpg) |
| :-------------------------: | :--------------: |
| Fusion 360을 사용해 설계함. | 실제 제작된 사진 |

   


### 물품 구매 목록

| 넘버 | 상품명 | 수량 | 용도 | 구매경로 |
|:---: | :----: | :--: | :--: | :------: |
|1|Witrue HD 4K 렌즈 CS 마운트 12MP 5MM|1|이미지 센서 광각렌즈|[링크](https://ko.aliexpress.com/item/1005004817099124.html?spm=a2g0o.order_list.order_list_main.5.44ec140fqnkfDq&gatewayAdapt=glo2kor)|
|2|ZEUSLAP Z10T|1|UI UX 조작을 위한 터치 디스플레이|[링크](https://ko.aliexpress.com/item/1005005927975071.html?spm=a2g0o.order_list.order_list_main.10.44ec140fqnkfDq&gatewayAdapt=glo2kor)|
|3|라즈베리파이5 8GB (Raspberry Pi 5)|1|메인 컴퓨팅 작업을 할 보드|[링크](https://www.eleparts.co.kr/goods/view?no=13323153#goodContent_7)|
|4|라즈베리파이 액티브 쿨러 (Raspberry Pi Active Cooler)|1|라즈베리파이 쿨러|[링크](https://www.eleparts.co.kr/goods/view?no=13535082)|
|5|Raspberry Pi High Quality Camera|1|라즈베리파이와 직접적으로 연결하여 사진을 촬영할 이미지센서|[링크](https://www.eleparts.co.kr/goods/view?no=9471110)|
|6|16mm C-mount lens|1|이미지 센서 망원렌즈|[링크](https://www.eleparts.co.kr/goods/view?no=9546893#goodContent_1)|
|7|라즈베리파이 카메라 케이블 300mm|1|카메라와 라즈베리파이를 연결하는 케이블|[링크](https://www.eleparts.co.kr/goods/view?no=13535083#goodContent_2)|
|8|ULTRA (스마트폰&태블릿전용) MicroSDXC 64GB [SDSQUNR-064G-GN3MN]|1|라즈베리파이 운영체제가 저장될 SD카드|[링크](https://www.eleparts.co.kr/goods/view?no=9736911)|
|9|ULTRA (스마트폰&태블릿전용) MicroSDXC 64GB [SDSQUNR-064G-GN3MN]|1|라즈베리파이 운영체제가 저장될 SD카드|[링크](https://www.eleparts.co.kr/goods/view?no=9736911)|
|10|94x50mm 12V 20W RA 90 CRI LED 조명 패널|2|조명 역할을 해줄 LED패널|[링크](https://ko.aliexpress.com/item/1005002074669678.html?spm=a2g0o.order_detail.order_detail_item.4.6ae05ccdnX7X1e&gatewayAdapt=glo2kor)|
|11|호후 스팀덱 스마트폰 C TO C 90도 직각 미니 젠더 2p|1|터치스크린 C타입 단자에 사용하기 위함.|[링크](https://smartstore.naver.com/amnet/products/8757468455?NaPm=ct%3Dlz70x64p%7Cci%3Dcheckout%7Ctr%3Dppc%7Ctrx%3Dnull%7Chk%3D7aaee4897a0276444902bfbcce34fe559259bffc)|
|12|USB 미니 5핀 케이블 1M C0573|1|이미지 프린터와 라즈베리파이를 연결하기 위함.|[링크](https://smartstore.naver.com/amnet/products/8757468455?NaPm=ct%3Dlz70x64p%7Cci%3Dcheckout%7Ctr%3Dppc%7Ctrx%3Dnull%7Chk%3D7aaee4897a0276444902bfbcce34fe559259bffc)|
|13|3mm 반투명 검정(스모그) [153(mm) x 440(mm)]|2|외관 아크릴 부속품|[링크](https://www.akobigs.com/shop/goods/goods_view.php?inflow=naverCheckout&goodsno=27912&NaPm=ct%3Dlz71bze9%7Cci%3Dcheckout%7Ctr%3Dppc%7Ctrx%3Dnull%7Chk%3D3319a83fb897ac9e5f6eb1270a6aa9d94302d42a)|
|14|3mm 반투명 검정(스모그)[230(mm) x 153(mm)]|2|외관 아크릴 부속품|[링크](https://www.akobigs.com/shop/goods/goods_view.php?inflow=naverCheckout&goodsno=27912&NaPm=ct%3Dlz71bze9%7Cci%3Dcheckout%7Ctr%3Dppc%7Ctrx%3Dnull%7Chk%3D3319a83fb897ac9e5f6eb1270a6aa9d94302d42a)|
|15|3mm 반투명 검정(스모그) [171(mm) x 50(mm)]|2|외관 아크릴 부속품|[링크](https://www.akobigs.com/shop/goods/goods_view.php?inflow=naverCheckout&goodsno=27912&NaPm=ct%3Dlz71bze9%7Cci%3Dcheckout%7Ctr%3Dppc%7Ctrx%3Dnull%7Chk%3D3319a83fb897ac9e5f6eb1270a6aa9d94302d42a)|
|16|2mm 반투명 백색  [79(mm) x 50(mm)]|2|외관 아크릴 부속품|[링크](https://www.akobigs.com/shop/goods/goods_view.php?inflow=naverCheckout&goodsno=27912&NaPm=ct%3Dlz71bze9%7Cci%3Dcheckout%7Ctr%3Dppc%7Ctrx%3Dnull%7Chk%3D3319a83fb897ac9e5f6eb1270a6aa9d94302d42a)|
|17|3mm 반투명 검정(스모그) [230(mm) x 440(mm)]|1|외관 아크릴 부속품|[링크](https://www.akobigs.com/shop/goods/goods_view.php?inflow=naverCheckout&goodsno=27912&NaPm=ct%3Dlz71bze9%7Cci%3Dcheckout%7Ctr%3Dppc%7Ctrx%3Dnull%7Chk%3D3319a83fb897ac9e5f6eb1270a6aa9d94302d42a)|
|18|3mm 반투명 검정(스모그) [230(mm) x 440(mm)] (도면전달)|1|외관 아크릴 부속품|[링크](https://www.akobigs.com/shop/goods/goods_view.php?inflow=naverCheckout&goodsno=25555&NaPm=ct%3Dlz71bj6f%7Cci%3Dcheckout%7Ctr%3Dppc%7Ctrx%3Dnull%7Chk%3D2745a5cd976a8510fc84692e902cd65f79c7b6e8)|
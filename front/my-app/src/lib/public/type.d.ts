
export type FRAME_IMG = {
    title: string;
    src: string;
    style: string;
    cropp_size: string;
    cover: boolean
}[][]


export type USER_INFO = {
    design_num: string;
    capture_imgs: {
        img_num: number
        base64_data: string;
    }[];
    select_imgs_num: number[];
    made_img: string;
    cropp_size: string;
    cover: null | boolean;
    printoutNum: number;
    imgPath: string;
    final_img: string
}

export type MADE_DATE = {
    title: string;
    select_imgs: {
        img_num: number
        base64_data: string;
    }[]
}

export type COLLAGE_IMG_DATE = {
    img_name: string;
    collage_img: string;
}

export type PRINTOUT_INFO = {
    printoutNum: number;
    base64_data: string;
}

export type LIGHTI_CONTROL_TYPE = {
    type:string;
}

export type LIGHTI_CONTROL_MSG = {
    msg:string;
}


export type Frame_info = {
    title: string; // 페이지 제목
    imgs_info: [
        [number, number], [number, number], [number, number], [number, number]
    ][]; // 이미지 정보 배열
}[]
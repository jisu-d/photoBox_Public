<script lang="ts">
    import type { MADE_DATE, Frame_info } from '$lib/public/type';
    import { onMount } from 'svelte';
    import { frame_info } from '$lib/frame_info';
    import { user_data, imgLoding } from '$lib/store'; // user_data 스토어 임포트
  
    export let madeInfo: MADE_DATE;
  
    let imgElement: HTMLImageElement | null = null;
    let canvas: HTMLCanvasElement | null = null;
    let context: CanvasRenderingContext2D | null = null;

    async function drawSelectedImages() {
        for (let index = 0; index < madeInfo.select_imgs.length; index++) {
            const data = madeInfo.select_imgs[index];
            const img = new Image();
            img.src = `data:image/jpeg;base64,${data.base64_data}`;

            const selected = frame_info.find(info => info.title === madeInfo.title);
            
            if (!selected) return;

            await new Promise<void>((resolve) => {
                img.onload = () => {
                    // 좌표를 기준으로 이미지 그리기
                    const [topLeft, topRight, bottomRight, bottomLeft]: [[number, number], [number, number], [number, number], [number, number]] = selected.imgs_info[index];
                    const width = topRight[0] - topLeft[0];
                    const height = bottomLeft[1] - topLeft[1];
                    
                    // 이미지 그리기 (좌상단 좌표, 크기)
                    if (context) {
                        context.drawImage(img, topLeft[0], topLeft[1], width, height);
                    }
                    resolve();
                };
            });
        }
    }
    
    onMount(() => {
        let imgSrc: string = `/frame/${madeInfo.title.split('-')[0]}/${madeInfo.title.split('-')[1]}_cover.png`;
        imgElement = new Image();
        imgElement.src = imgSrc;
  
        imgElement.onload = async () => {
            if (canvas) {
                // 캔버스와 컨텍스트 가져오기
                context = canvas.getContext('2d');
                if (context && imgElement) {
                    // 이미지 로딩이 완료되면 캔버스 크기를 이미지 크기와 동일하게 설정
                    canvas.width = imgElement.width;
                    canvas.height = imgElement.height;

                    // 먼저 네 이미지를 그린 후 PNG 이미지를 그리기
                    await drawSelectedImages();
    
                    // 캔버스에 PNG 이미지를 가장 마지막에 그리기
                    context.drawImage(imgElement, 0, 0);
                    
                    // 캔버스를 base64로 변환
                    const finalImageBase64 = canvas.toDataURL('image/png');
                    
                    // 스토어에 저장 (user_data.final_img에 base64 이미지 저장)
                    const base64Data = finalImageBase64.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
                    $user_data.final_img = base64Data;
                    imgLoding.set(true)
                }
            }
        };
    });
</script>

<canvas bind:this={canvas} class=" hidden"></canvas>

{#if $user_data.final_img == ' '}
    <div class="w-[40%] h-[1608px] items-center flex">
        <div class=" px-16 py-3 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse" style="font-size: 37.5px;">Create image....</div>
    </div>
{:else}
    <img src={'data:image/jpeg;base64,' + $user_data.final_img} alt="" class="w-full">
{/if}
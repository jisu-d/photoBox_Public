<style>
    .captime {
        font-size: 20vh;
        color: white;
    }
    .capchtimer {
        display: none;
    }

    @media (max-aspect-ratio: 1/1) {
        .dynamic-container {
            width: 95%;
            max-width: 70vh;
        }
    }
    @media (min-aspect-ratio: 1/1) {
        .dynamic-container {
            width: 60%;
            max-width: 70vh;
        }
    }

    .text-shadow-black {
        -webkit-text-stroke: 10px black;
    }
</style>

<script lang="ts">
    import Loading from "./Loading.svelte";
    import { browser } from "$app/environment";
    import { onDestroy, onMount } from "svelte";
    import { user_data } from '$lib/store';
    import { goto } from "$app/navigation";

    import type { LIGHTI_CONTROL_TYPE, LIGHTI_CONTROL_MSG } from '$lib/public/type';

    let videoSource: HTMLVideoElement;
    let canvasElement: HTMLCanvasElement;
    let stream: MediaStream;
    let reqNum = 0;
    let status = 0;
    let ctx: CanvasRenderingContext2D;
    const framepath = $user_data.design_num.split('-')[0];
    let camStreame = false;
    let capture: { img_num: number; base64_data: string; }[] = [];
    let captime = 0;
    let cur = 0;
    const TERM = 6000;
    const WAIT = 2000;
    let capchtimer = true;
    let overlayImages: HTMLImageElement[] = [];

    onMount(() => {
        if (browser) {
            preloadOverlayImages();
            cur = Date.now() + TERM;
            status = 1;
            capchtimer = false;
        }
    });

    onDestroy(() => {
        if (!browser) return;
        cancelAnimationFrame(reqNum);
        if (stream) stream.getTracks().forEach(v => stream.removeTrack(v));
    });

    $: if (videoSource && videoSource.paused) {
        navigator.mediaDevices.getUserMedia({ video: { width: { max: 2028 }, height: { max: 1520 } } })
            .then(m => {
                stream = m;
                videoSource.srcObject = m;
                return videoSource.play();
            })
            .then(() => {
                camStreame = true;
                loop();
                cur = Date.now() + TERM;
                status = 1;
                capchtimer = false;
                StartLED();
            });
    }

    async function StartLED() {
        const data: LIGHTI_CONTROL_TYPE = {
            type: 'base'
        };
        try {
            const response = await fetch('http://localhost:8000/lightingControl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const msg = await response.json() as LIGHTI_CONTROL_MSG;
            console.log(msg.msg)
        } catch (err) {
            console.log(err);
        }
    }

    $: if (canvasElement && !ctx && browser) {
        let temp = canvasElement.getContext('2d');
        if (temp) ctx = temp;
    }

    const preloadOverlayImages = () => {
        if (!$user_data.cover) return;
        for (let i = 1; i <= 4; i++) {
            const img = new Image();
            img.src = `/frame/${framepath}/cover_imgs/${i}.png`;
            overlayImages.push(img);
        }
    };

    const update = async () => {
        if (!videoSource || !canvasElement || !ctx) return;

        let value = $user_data.cropp_size;
        let [m, n] = value.split(':').map(Number);
        if (isNaN(m) || isNaN(n) || m < 1 || n < 1) {
            m = 1;
            n = 1;
        }

        let { width, height } = calculateCroppedSize(videoSource.videoWidth, videoSource.videoHeight, m, n);
        if (width === 0 || height === 0) return;

        if (canvasElement.width !== width || canvasElement.height !== height) {
            canvasElement.width = width;
            canvasElement.height = height;
            ctx.setTransform(-1, 0, 0, 1, width, 0);
        }

        ctx.drawImage(videoSource, (videoSource.videoWidth - width) / 2, (videoSource.videoHeight - height) / 2, width, height, 0, 0, width, height);

        // let imageData = ctx.getImageData(0, 0, width, height);
        // //여기에 이미지 보정 넣으면 됨됨
        // ctx.putImageData(imageData, 0, 0);

        if ($user_data.cover && overlayImages.length > 0) {
            const overlayImage = overlayImages[(capture.length % 4)];
            ctx.save();
            ctx.scale(-1, 1);
            ctx.drawImage(overlayImage, -width, 0, width, height);
            ctx.restore();
        }
    };

    const calculateCroppedSize = (W: number, H: number, m: number, n: number) => {
        let newWidth: number;
        let newHeight: number;

        const currentRatio = W / H;
        const targetRatio = m / n;

        if (currentRatio > targetRatio) {
            newWidth = Math.floor(H * targetRatio);
            newHeight = H;
        } else {
            newWidth = W;
            newHeight = Math.floor(W / targetRatio);
        }

        return { width: newWidth, height: newHeight };
    };

    const loop = () => {
        if (capture.length > 7) {
            user_data.set({ ...$user_data, capture_imgs: capture });
            goto('/select_imgs', {
                replaceState: true
            });
            return;
        }

        if (!ctx || !videoSource || videoSource.paused || !canvasElement) {
            reqNum = requestAnimationFrame(loop);
            return;
        }

        if (status === 1) {
            capchtimer = false;
            captime = Math.abs(Math.floor((Date.now() - cur) / 1000));
        } else if (status === 2 || captime - 1 <= 0) {
            capchtimer = true;
        }

        if (status === 2) {
            if (Date.now() - cur <= 0) {
                reqNum = requestAnimationFrame(loop);
                return;
            }

            status = 1;
            cur = Date.now() + TERM;
        }

        update();

        if (status === 1 && Date.now() - cur > 0) {
            canvasElement.toBlob(blob => {
                if (!blob) return;
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                    let base64Data = reader.result as string;
                    base64Data = base64Data.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
                    capture = [...capture, {
                        img_num: (capture.length % 4) + 1,
                        base64_data: base64Data
                    }];
                };
            }, 'image/jpeg');

            cur = Date.now() + WAIT;
            status = 2;
        }

        reqNum = requestAnimationFrame(loop);
    };
</script>



<!-- <div class="relative dynamic-container p-6 bg-white rounded-lg shadow-lg">
    {#if !camStreame}
        <Loading />
    {/if}
    <video bind:this={videoSource} class="hidden"><track kind="captions"></video>
    {#if videoSource}
        <canvas bind:this={canvasElement} class="w-full h-auto rounded-lg shadow-md mb-4"></canvas>
        <div class="font-normal text-gray-700 dark:text-gray-400 text-center">
            {6 - capture.length > 1 ? 6 - capture.length : 'Last'} Chance
        </div>
        <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-white text-4xl font-bold captime" class:capchtimer>{Math.max(captime - 1, 0)}</div>
        </div>
    {/if}
</div> -->

<div class=" w-full h-full bg-backgroundcolor-black flex flex-col items-center justify-start">
    {#if !camStreame}
        <Loading />
    {/if}
    <video bind:this={videoSource} class="hidden"><track kind="captions"></video>
    {#if videoSource}
        <!-- <canvas bind:this={canvasElement} class="w-full absolute top-1/2 -translate-y-1/2"></canvas>
        <div class="text-[5vw] -translate-y-1/2 translate-x-1/flex flex-col items-center justify-center2 font-normal text-white absolute bottom-5 right-1/2">
            {6 - capture.length > 1 ? 6 - capture.length : 'Last'} chance
        </div> -->
        <div class="h-[calc(15%/2)] text-white flex items-center justify-start w-full">
            <span class="text-6xl pl-9">{capture.length} / 8</span>
        </div>
        <div class="h-[85%] w-full">
            <canvas bind:this={canvasElement} class=" h-full"></canvas>
        </div>
        <div class="font-normal text-white h-[calc(15%/2)] pt-6">
            <span class="text-3xl">총 여덟 장의 사진을 촬영합니다.</span>
        </div>

        <div class="absolute inset-0 flex items-center justify-center grow-0">
            <div class="text-white text-shadow-black text-4xl font-bold captime" class:capchtimer>{Math.max(captime - 1, 0)}</div>
        </div>
    {/if}
</div>

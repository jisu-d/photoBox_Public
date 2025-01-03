<script lang="ts">
    import { onMount } from "svelte";

    let videoStream: MediaStream | null = null;
    let videoRef: HTMLVideoElement | null = null;

    // 뿌연 효과 활성화 여부

    onMount(() => {
        if (typeof window !== "undefined") {

            // 웹캠 시작
            startWebcam();
        }
    });

    async function startWebcam(): Promise<void> {
        try {
            videoStream = await navigator.mediaDevices.getUserMedia({
                video: { width: 1280, height: 720 }, // 고해상도 비디오
                audio: false,
            });

            if (videoRef) {
                videoRef.srcObject = videoStream;
            }
        } catch (error) {
            console.error("웹캠을 시작할 수 없습니다:", error);
        }
    }

</script>

<style>
    html, body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .container {
        position: relative;
        width: 100%;
        height: 100%;
    }

    video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        /* display: none; 비디오 요소는 화면에 표시되지 않음 */
    }
</style>

<div class="container">
    <video autoplay playsinline bind:this={videoRef}></video>
</div>

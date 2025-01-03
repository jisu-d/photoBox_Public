<script lang="ts">
    import BackgrounVideo_svelte from "./BackgrounVideo.svelte";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    const pageTransitionTime = 60; // 페이지 이동 대기 시간 (초)
    let pageTransitionTime_count = pageTransitionTime; // 남은 시간 카운트
    let interval: NodeJS.Timeout; // 인터벌을 저장할 변수

    onMount(() => {
        // 페이지 이동 카운트다운 시작
        interval = setInterval(() => {
            if (pageTransitionTime_count > 1) {
                pageTransitionTime_count -= 1;
            } else {
                clearInterval(interval); // 카운트가 끝나면 인터벌 중지
            }
        }, 1000);

        // 페이지 이동 실행
        setTimeout(() => {
            goto("/start_page", {
                replaceState: true,
            });
        }, pageTransitionTime * 1000);
    });

    // 뿌연 효과 활성화 여부
    let isBlurred: boolean = true;

    function toggleBlur(): void {
        isBlurred = !isBlurred;
    }
</script>

<a
    href=""
    on:click={toggleBlur}
    class="absolute p-10 max-w-[85vw] bg-[rgba(0,0,0,0.5)] rounded-2xl
           hover:bg-[rgba(0,0,0,0.7)] backdrop-blur-md z-10"
>
    <h5 class="mb-7 text-[4vh] font-bold tracking-tight text-white">
        Img printing.... Please wait
    </h5>
    <div class="flex justify-between">
        <p class="font-normal text-gray-300 dark:text-gray-400 text-[1.5vh]">
            클릭하시면 뿌연 효과가 {isBlurred ? "삭제" : "실행"}됩니다!
        </p>
        <p class="font-normal text-gray-300 dark:text-gray-400 text-[1.5vh]">
            처음화면 이동까지 {pageTransitionTime_count}초
        </p>
    </div>
</a>
<div
    class="backdrop-blur-md h-full w-full z-[9] absolute"
    class:blurred-visible={isBlurred}
    class:blurred={!isBlurred}
></div>

<BackgrounVideo_svelte />

<style>
    button {
        position: absolute;
        bottom: 20px;
        left: 20px;
        padding: 10px 20px;
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        z-index: 10;
    }

    button:hover {
        background-color: rgba(0, 0, 0, 0.9);
    }

    .blurred {
        opacity: 0;
        visibility: hidden;
        transition:
            opacity 0.5s ease,
            visibility 0.5s ease;
    }

    .blurred-visible {
        opacity: 1;
        visibility: visible;
    }
</style>

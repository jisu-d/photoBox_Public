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
        transition: opacity 0.5s ease, visibility 0.5s ease;
    }

    .blurred-visible {
        opacity: 1;
        visibility: visible;
    }
</style>

<a href="/select_design" 
   class="absolute p-10 max-w-[80vw] bg-[rgba(0,0,0,0.5)] rounded-2xl
          hover:bg-[rgba(0,0,0,0.7)] backdrop-blur-md z-10">
    <h5 class="mb-2 text-[4vh] font-bold tracking-tight text-white">Start taking photos</h5>
    <p class="font-normal text-gray-300 dark:text-gray-400 text-[2vh]">
        Take a photo with your friends, apply a cool frame, and print it!
    </p>
</a>
<div class="backdrop-blur-md h-full w-full z-[9] absolute" class:blurred={isBlurred}></div>
<button on:click={toggleBlur}>
    {isBlurred ? "Apply Blur" : "Remove Blur"}
</button>

<BackgrounVideo_svelte/>

<script lang="ts">
    import BackgrounVideo_svelte from './BackgrounVideo.svelte'
    import { user_data, imgLoding } from '$lib/store'
    user_data.set({
        design_num: ' ',
        capture_imgs: [],
        select_imgs_num: [],
        made_img: ' ',
        cropp_size: ' ',
        printoutNum: 1,
        cover: null,
        imgPath: ' ',
        final_img:' '
    })

    imgLoding.set(false)

    // 뿌연 효과 활성화 여부
    let isBlurred: boolean = false;

    function toggleBlur(): void {
        isBlurred = !isBlurred;
    }
</script>
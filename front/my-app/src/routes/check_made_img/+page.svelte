<script lang="ts">
    import { onMount } from 'svelte';
    import UpDownBtn from "./UpDownBtn.svelte";
    import PrintBtn from "./PrintBtn.svelte";
    import MadeImg from "./MadeImg.svelte";
    import { user_data } from '$lib/store';
    import { goto } from '$app/navigation';
    
    onMount(() => {
        if($user_data.select_imgs_num.length !== 4){
            alert('정상적인 접근이 아닙니다.')
            goto('/start_page', {
                replaceState: true
            })
        }
    })
</script>

<div class=" bg-backgroundcolor-black border border-gray-500 rounded-lg shadow-[0_0px_30px_rgba(192,192,192,0.2)] p-8 flex flex-col-reverse w-full mx-[2%] max-w-[60vh] h-full">
    <div>
        <div class="flex space-x-7 items-center">
            <UpDownBtn />
            <PrintBtn />
        </div>
        <p id="helper-text-explanation" class="mt-2 text-[1vh] text-gray-500 dark:text-gray-400">Please enter the number of pages you want to print and press the print button.</p>
    </div>
    <div class=" mb-10 w-full flex justify-evenly">
        <MadeImg />
    </div>
</div>
<script lang="ts">
    import { goto } from '$app/navigation';
    import { user_data, imgLoding } from '$lib/store'
    import type { PRINTOUT_INFO } from '$lib/public/type';

    async function onClick(){
        if ($user_data.printoutNum <= 0) return
        goto('/print_wait', {
            replaceState: true
        });

        const printout_info: PRINTOUT_INFO = {
            printoutNum: $user_data.printoutNum,
            base64_data: $user_data.final_img
        }

        const response = await fetch('http://localhost:8000/printImgs', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(printout_info)
            });
    }
    
</script>


{#if $imgLoding}
    <button type="submit" on:click={onClick} class=" w-3/4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-[1.5vh] py-6">Print now</button>
{:else if !$imgLoding}
    <button type="submit" class=" w-3/4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-[1.5vh] py-6">이미지가 나오면 버튼이 활성화 됩니다.</button>
{/if}
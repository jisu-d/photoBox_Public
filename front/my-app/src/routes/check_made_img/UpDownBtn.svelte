<script>
    import { writable } from 'svelte/store';
    import { user_data } from '$lib/store'

    const max = 5
    const min = 1
    
    function createCount() {
        const { subscribe, update } = writable(1);
        return {
            subscribe,
            increment: () => update((n) => (n < max ? n + min : n)),
            decrement: () => update((n) => (n > min ? n - min : n)),
        };
    }
    
    const count = createCount();;
    $: user_data.set({ ...$user_data, printoutNum: $count})
</script>

<!-- <form class="h-full">
    <div class="relative flex items-center h-full">
        <button type="button" on:click={count.decrement} id="decrement-button" data-input-counter-decrement="quantity-input" class="bg-gray-100  hover:bg-gray-200 border border-gray-300 rounded-s-lg py-11 px-5">
            <svg class="w-5 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
            </svg>
        </button>
        <input type="text" bind:value={$count} id="quantity-input" data-input-counter aria-describedby="helper-text-explanation" class="bg-gray-50 text-center border-y-[1px] border-gray-300 text-gray-900 text-[1.5vh] py-6 " required />
        <button type="button" on:click={count.increment} id="increment-button" data-input-counter-increment="quantity-input" class="bg-gray-100  hover:bg-gray-200 border border-gray-300 rounded-e-lg py-9 px-5">
            <svg class="w-5 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
            </svg>
        </button>
    </div>
</form> -->


<form class="h-full">
    <div class="relative flex items-center h-full">
        <button type="button" on:click={count.decrement} id="decrement-button" data-input-counter-decrement="quantity-input" class="bg-backgroundcolor-black  hover:bg-[#171717] border border-gray-300 rounded-s-lg py-[2.8rem] px-8">
            <svg class="w-5 invert text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
            </svg>
        </button>
        <input type="text" bind:value={$count} id="quantity-input" data-input-counter aria-describedby="helper-text-explanation" class="bg-backgroundcolor-black text-center border-y-[1px] border-gray-300 text-gray-900 text-[1.5vh] py-6 text-white " required />
        <button type="button" on:click={count.increment} id="increment-button" data-input-counter-increment="quantity-input" class="bg-backgroundcolor-black  hover:bg-[#171717] border border-gray-300 rounded-e-lg pt-[2.2rem] pb-[2.27rem] px-8">
            <svg class="w-5 invert text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
            </svg>
        </button>
    </div>
</form>
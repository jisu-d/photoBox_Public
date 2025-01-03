<script lang="ts">
	import { writable } from 'svelte/store';
	import type { FRAME_IMG } from '$lib/public/type';
	import { user_data } from '$lib/store';
	import { frameimg } from './frame_imgs';
	import { onMount } from 'svelte';

	const selectedImage = writable<string | null>(null);

	// 현재 슬라이드 인덱스 상태
	const currentIndex = writable(0);
	const totalItems = frameimg.length;

	function handleImageClick(croppSize: string, title: string, cover: boolean) {
		user_data.set({ ...$user_data, design_num: title, cropp_size: croppSize, cover: cover });
		selectedImage.set(title);
	}

	let container: HTMLDivElement;

	function scrollLeft() {
		container.scrollBy({ left: -container.offsetWidth, behavior: 'smooth' });
		updateCurrentIndex();
	}

	function scrollRight() {
		container.scrollBy({ left: container.offsetWidth, behavior: 'smooth' });
		updateCurrentIndex();
	}

	function updateCurrentIndex() {
		const index = Math.round(container.scrollLeft / container.offsetWidth);
		currentIndex.set(index);
	}

	onMount(() => {
		container.addEventListener('scroll', () => {
			updateCurrentIndex();
		});
	});
</script>

<style>
	#container {
		width: 100%;
		overflow: auto;
		scroll-snap-type: x mandatory;
		-ms-overflow-style: none;
		scrollbar-width: none;
		white-space: nowrap;
		position: relative;
	}

	#container::-webkit-scrollbar {
		display: none;
	}

	.item {
		display: inline-flex;
		width: 100%;
		height: 100%;
		align-items: center;
		justify-content: center;
		scroll-snap-align: start;
	}

	.selected {
		border: 2.5px solid red;
		z-index: 1;
		transform: translateY(-5px);
	}

	.dots {
		position: fixed;
		bottom: 23%;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		gap: 5px;
		z-index: 3;
	}

	.dot {
		width: 10px;
		height: 10px;
		background-color: #333;
		border-radius: 50%;
	}

	.dot.active {
		background-color: #ddd;
	}

	.scroll-button {
		position: fixed;
		font-size: 35px;
		top: 50%;
		transform: translateY(-50%);
		background-color: rgba(0, 0, 0, 0.5);
		color: white;
		border: none;
		padding: 20px;
		cursor: pointer;
		z-index: 3;
	}

	.scroll-button.left {
		left: 10px;
	}

	.scroll-button.right {
		right: 10px;
	}
</style>

<div id="container" class="h-90 tall:h-3/5" bind:this={container}>
    {#each frameimg as img}
        <div class="item">
			{#each img as ele}
				<img 
					src={ele.src} 
					style={ele.style}
					class:selected={$selectedImage === ele.title}
					on:click={() => handleImageClick(ele.cropp_size, ele.title, ele.cover)}
				>
			{/each}
        </div>
    {/each}

	<!-- 왼쪽/오른쪽 스크롤 버튼 -->
	<button class="scroll-button left" on:click={scrollLeft}>❮</button>
	<button class="scroll-button right" on:click={scrollRight}>❯</button>

	<!-- 현재 위치를 표시하는 점 UI -->
	<div class="dots">
		{#each { length: totalItems } as _, i}
			<div class:active={$currentIndex === i} class="dot"></div>
		{/each}
	</div>
</div>

<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	
	let data1: string | null;
	let data2: string | null;
	let imageUrl: string = '';
	let errorMessage: string = '';
	let downloadLink: HTMLAnchorElement | null = null;
	
	// 쿼리 파라미터에서 값을 가져오기
	$: data1 = $page.url.searchParams.get('data1');
	$: data2 = $page.url.searchParams.get('data2');
	
	// 이미지 URL 설정
	$: if (data1 && data2) {
	  imageUrl = `https://i.ibb.co/${data1}/${data2}.jpg`;
	}
	
	// 이미지 유효성 검사
	function checkImage(url: string) {
	  return new Promise((resolve) => {
		const img = new Image();
		img.onload = () => resolve(true);
		img.onerror = () => resolve(false);
		img.src = url;
	  });
	}
	
	onMount(async () => {
	  if (imageUrl) {
		const isValidImage = await checkImage(imageUrl);
		if (!isValidImage) {
		  errorMessage = '잘못되었습니다';
		  imageUrl = ''; // 유효하지 않은 이미지일 때 비워주기
		}
	  }
	});
	
	// 이미지 다운로드
	function downloadImage() {
	  if (!imageUrl) return;
  
	  fetch(imageUrl)
		.then(response => response.blob())
		.then(blob => {
		  const url = window.URL.createObjectURL(blob);
		  if (downloadLink) {
			downloadLink.href = url;
			downloadLink.download = 'image.jpg'; // 저장할 파일명
			downloadLink.click();
		  }
		  window.URL.revokeObjectURL(url); // 메모리에서 URL 해제
		})
		.catch(error => console.error('이미지 다운로드 실패', error));
	}
  </script>


<div class="flex flex-col	">
	{#if errorMessage}
		<p>{errorMessage}</p>
	{:else if imageUrl}
		<img src={imageUrl} alt="이미지" class="w-[95vw]">
		<button on:click={downloadImage} type="button" class=" text-white mt-4  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none font-medium rounded-full text-sm text-lg px-10 py-2.5 tall:text-4xl tall:px-16 tall:py-6 tall:rounded-xl focus:outline-none">이미지 다운로드</button>
		<!-- 숨겨진 다운로드 링크 -->
		<a bind:this={downloadLink} style="display: none;" href=""></a>
	{/if}
</div>
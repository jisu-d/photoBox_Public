<script lang="ts">
    import type { MADE_DATE, COLLAGE_IMG_DATE } from '$lib/public/type';
    import { writable } from 'svelte/store';
    import { user_data } from '$lib/store';

    import { onMount } from 'svelte';

    import Collage_img from './Collage_img.svelte'

    const madeInfo: MADE_DATE = {
        title: $user_data.design_num,
        select_imgs: [
            $user_data.capture_imgs[$user_data.select_imgs_num[0]],
            $user_data.capture_imgs[$user_data.select_imgs_num[1]],
            $user_data.capture_imgs[$user_data.select_imgs_num[2]],
            $user_data.capture_imgs[$user_data.select_imgs_num[3]]
        ],
    }

    madeInfo.select_imgs.sort((a, b) => {
        if (a.img_num === b.img_num) {
            // img_num이 동일하면 원래 순서를 유지
            return 0;
        }
        return a.img_num - b.img_num; // img_num 기준으로 오름차순 정렬
    });


</script>

<style>
</style>

<Collage_img madeInfo={madeInfo}/>

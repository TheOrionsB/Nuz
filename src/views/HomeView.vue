<template>
    <div class="flex flex-col space-y-10">
        <HeadingItemVue/>
        <div class="flex flex-row justify-evenly px-[5%]">
            <SellingBulletsVue/>
            <HomeCTAVue/>
        </div>
    </div>
</template>

<script setup>
import HeadingItemVue from '@/components/Home/HeadingItem.vue';
import HomeCTAVue from '@/components/Home/HomeCTA.vue';
import SellingBulletsVue from '@/components/Home/SellingBullets.vue';
</script>
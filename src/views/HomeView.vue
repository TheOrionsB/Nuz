<template>
    <div class="flex flex-col space-y-10">
        <HeadingItemVue />
        <div class="flex flex-col justify-start px-[5%] qhd:px-[10%] lg:flex lg:flex-row lg:justify-evenly">
            <SellingBulletsVue />
            <HomeCTAVue />
        </div>
        <div class="flex flex-col justify-start px-[5%] qhd:px-[10%] lg:flex lg:flex-col lg:justify-evenly">
            <UnsignedShortenerVue />
        </div>
    </div>
</template>

<script setup>
import HeadingItemVue from '@/components/Home/HeadingItem.vue';
import HomeCTAVue from '@/components/Home/HomeCTA.vue';
import SellingBulletsVue from '@/components/Home/SellingBullets.vue';
import UnsignedShortenerVue from '@/components/Home/UnsignedShortener.vue';
</script>
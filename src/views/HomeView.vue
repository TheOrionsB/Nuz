<template>
    <div class="flex flex-col pt-10 h-full space-y-10 mt-12 qhd:mt-12">
        <HeadingItemVue />
        <div class="flex flex-col justify-start px-[5%] lg:flex lg:flex-row lg:justify-evenly">
            <SellingBulletsVue />
            <HomeCTAVue />
        </div>
        <div class="flex flex-col justify-start px-[5%] lg:flex lg:flex-col lg:justify-evenly">
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
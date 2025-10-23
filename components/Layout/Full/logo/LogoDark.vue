<script setup lang="ts">
import { RouterLink } from 'vue-router';
import logodark from '/images/logos/providerid.png';
</script>
<template>
    <div class="logo d-flex text-center justify-center">
        <NuxtLink to="/">
            <img :src="logodark" alt="home" width="70%" />
        </NuxtLink>
    </div>
</template>

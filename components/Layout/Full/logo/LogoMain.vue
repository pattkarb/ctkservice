<script setup lang="ts">
import { RouterLink } from 'vue-router';
import logoMain from '/images/logos/hospital.png';

</script>
<template>
    <div class="logo logo-hide-sm d-flex text-center justify-center p-0 m-0">
        <NuxtLink to="/" class="text-primary links" style="letter-spacing: -1.5px;">
            <img :src="logoMain" alt="home" width="30px" />
            <span class="text-success">C</span>tk<span class="text-warning" style="font-size: 1.5rem; font-weight: 900;">@</span>service
        </NuxtLink>
    </div>
</template>

<style scoped>
.logo-hide-sm {
    display: none !important;
}
@media (min-width: 768px) {
    .logo-hide-sm {
        /* ใช้ display: flex ตามที่โค้ดเดิมระบุ */
        display: flex !important; 
    }
}
</style>
<template>
    <div class="login-div">
        <div class="login-right">
            <img class="login-img" src="/images/providerid.png" alt="logo" />
            <button @click="CallProvider" class="button-provider">Login with Provider iD</button>
            <hr/>
            <span class="login-span">ระบบการ Login เข้าใช้งาน Application Ctk@Service</span>
            <span class="login-span2">ผ่านระบบ ProvideriD กระทรวงสาธารณสุข </span>
        </div>      

    </div>
</template>

<script setup>

import { onMounted, ref } from 'vue';
import { useRuntimeConfig } from '#app';

const config = useRuntimeConfig();

let health_link = "https://moph.id.th";
let client_id = config.public.clientId;
let redirect_uri = ref(''); // ใช้ ref เพื่อเก็บค่าที่กำหนดบน client

// 💡 ใช้ onMounted เพื่อกำหนดค่าที่ต้องใช้ window
onMounted(() => {
    // ตรงนี้เรารับประกันได้ว่า Object 'window' มีอยู่จริง
    redirect_uri.value = `${window.location.origin}/provider/callback`;
});

let response_type = "code";

function CallProvider() {
    // ตรวจสอบ redirect_uri ว่ามีค่าแล้ว
    if (redirect_uri.value) {
        window.location.href = `${health_link}/oauth/redirect?client_id=${client_id}&redirect_uri=${redirect_uri.value}&response_type=${response_type}`;
    } else {
        console.error("Redirect URI not set yet (still running on server or not mounted).");
    }
}
</script>

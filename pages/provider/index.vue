<template>
    <div class="login-div">
        <div class="login-right">
            <img src="/images/providerid.png" alt="logo" width="80%" height="150px"/>
            <button @click="CallProvider" class="button-provider">ลงชื่อเข้าใช้</button>
            <button @click="$router.push('/thaid')" class="button-td">
                <img src="/images/thaid.png" alt="logo" width="45px" height="45px"/>
                <span class="text-primary">ลงชื่อเข้าใช้ด้วย THAID</span>
            </button>
            <hr />
            <span class="login-or">หรือ</span>
            <span>หากคุณยังไม่มี Provider ID</span>
            <a href="https://provider.id.th/register" target="_blank" rel="noopener" class="button-id">ลงทะเบียน</a>
        </div>      
    </div>
</template>

<script setup>
    import { useRoute } from 'vue-router';
    const config = useRuntimeConfig()
    const route = useRoute();
    useHead({
        title: `ProviderId`,
        meta: [
            { name: 'description', content: 'รายละเอียด Provider' }
        ]
    });

    let health_link = "https://moph.id.th";
    let client_id = config.public.clientId;
    let redirect_uri = `${window.location.origin}/provider/callback`;
    let response_type = "code";
    function CallProvider(){
        window.location.href = `${health_link}/oauth/redirect?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}`;
    }
 

</script>
<style scoped>

</style>

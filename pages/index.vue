<template>
    <div class="container">     
        <h1>Welcome to MainPage</h1>
        <p>This is the home page of the Nuxt 3 application.</p>
        <img src="/images/my.jpg" width="35px" />

        <div>
            <NuxtLink to="/provider/profile">
                    Profiles
            </NuxtLink> 
        </div>

        <div>
            <h4 ref="ptName"></h4>
            ยินดีต้อนรับเข้าสู่ระบบ
            <h5 ref="fullname"></h5>
            <h3 ref="hash_cid"></h3>
        </div>
        <h3 ref="moph_access_token"></h3>
    </div>
</template>

<script setup>
    import { user } from '#build/ui';
    import { ref, onMounted } from 'vue';
    import { useUserStore } from '~/stores/user'
    const userStore = useUserStore();
    const config = useRuntimeConfig()

    useHead({
        title: `MainPage`,
        meta: [
            { name: 'description', content: 'My Nuxt 3 Application MainPage' }
        ]
    });

    const moph_access_token = ref('');
    const ptName = ref('');
    const fullname = ref('');
    const hash_cid = ref('');

    function handleSuccessfulLogin() {
        moph_access_token.value = localStorage.getItem('moph_access_token') || '';
        if (moph_access_token.value) {
            const profile = JSON.parse(localStorage.getItem('provider_profile')) || '{}';
            const organization = profile.organization[0] || {};
            const responseData = {
                username: localStorage.getItem('provider_account_username') || 'abc',
                fullname: profile.title_th + profile.name_th || '',
                moph_access_token: localStorage.getItem('provider_access_token') || '',
                hospital_code: organization.hcode9 || '',
                hash_cid: profile.hash_cid || ''  };
            userStore.login(responseData);
        }
    }

    function loadProfile() {
        if(userStore.isLoggedIn) {
            const decoded = useJwtDecoder(localStorage.getItem('moph_access_token'));
            if(decoded) {
                const user_id = decoded.scopes_detail.id_card;
                
            }
            
        } else {
            console.log('not login!!')
        }
    }

    onMounted(() => {
        handleSuccessfulLogin();
        loadProfile();
    });


</script>
<style scoped>
    
</style>
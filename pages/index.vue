<template>
    <div class="container d-flex flex-column align-items-center">     
        <h1>Welcome to MainPage</h1>
        <p>This is the home page of the Nuxt 3 application.</p>
        <img src="/images/my.jpg" />
        <div>
            <h4 ref="ptName"></h4>
            ยินดีต้อนรับเข้าสู่ระบบ
            <h5 ref="fullname"></h5>
            <h3 ref="hash_cid"></h3>
            <h1 ref="moph_access_token"></h1>
        </div>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente voluptates eos quae, consequatur, consectetur iure iusto provident tenetur labore velit repellendus in perferendis suscipit, magnam numquam quidem at voluptate odit.</p>
    </div>
</template>

<script setup>
    import { user } from '#build/ui';
    import { ref, onMounted } from 'vue';
    import { useUserStore } from '~/stores/user'
    const userStore = useUserStore();

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
        moph_access_token.value = localStorage.getItem('moph_access_token') || null;
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

    onMounted(() => {
        handleSuccessfulLogin();
        ptName.value.innerText = `Login Name: ${userStore.username || ''}`;
        fullname.value.innerText = `Full Name: ${userStore.fullname || ''}`;
        hash_cid.value.innerText = `Hash CID: ${userStore.hash_cid || ''}`;

    });

</script>
<style scoped>
    .container{
        text-align: center;
        margin-top: 50px;
    }
    h1{
        color: #333;
    }
    p{
        color: #666;
        font-size: 18px;
    }
    img{
        margin-top: 20px;
        max-width: 300px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
</style>
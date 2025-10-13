<template>
    <div class="container">     
        <h1>Welcome to MainPage</h1>
        <p>This is the home page of the Nuxt 3 application.</p>
        <img src="/images/my.jpg" />
        <p>
            <h4 ref="ptName"></h4>
            ยินดีต้อนรับเข้าสู่ระบบ
            <h5 ref="fullname"></h5>
        </p>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente voluptates eos quae, consequatur, consectetur iure iusto provident tenetur labore velit repellendus in perferendis suscipit, magnam numquam quidem at voluptate odit.</p>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    useHead({
        title: `MainPage`,
        meta: [
            { name: 'description', content: 'My Nuxt 3 Application MainPage' }
        ]
    });
    const ptName = ref(null);
    const fullname = ref(null);

    onMounted(() => {
        ptName.value.innerText = localStorage.getItem('provider_account_username') || 'Guest User';
        const profile = JSON.parse(localStorage.getItem('provider_profile') || '{}');
        fullname.value.innerText = profile.title_th+profile.name_th || '';
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
<template>
    <div class="container layout-container">
        <header>
            <nav>
                <div class="logo">
                    <img src="/images/hospital.png" width="35px" />
                    <span style="font-size:1.5rem; font-weight: bolder; color:red;">C</span>tk<span style="font-size:1.5rem; font-weight: bolder; color:blue;">@</span>Service
                </div>
                <NuxtLink to="/">Home</NuxtLink> |
                <NuxtLink to="/products/detail">Posts</NuxtLink> |
                <NuxtLink to="/about">About</NuxtLink> |
                <NuxtLink v-if="showLogin" to="/provider">Login</NuxtLink> 
                <NuxtLink v-if="showLogout" @click="logout">Logout</NuxtLink>
            </nav>
        </header>
        <div>
            <slot />
        </div>
        <footer>
            <p style="text-align: center; margin-bottom: 0 20px;">&copy; 2024 MyNuxt3App. All rights reserved.</p>
        </footer>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const showLogin = ref(true)
const showLogout = ref(true)
useHead({
    title: `Ctk@Service`,
    meta: [
        { name: 'description', content: 'My Nuxt 3 Application' }
    ]
});

function logout() {
    localStorage.removeItem('moph_access_token');
    localStorage.removeItem('moph_account_id');
    localStorage.removeItem('moph_expires_in');
    localStorage.removeItem('moph_token_type');
    localStorage.removeItem('provider_access_token');
    localStorage.removeItem('provider_account_id');
    localStorage.removeItem('provider_account_username');
    localStorage.removeItem('provider_expiration_date');
    localStorage.removeItem('provider_expires_in');
    localStorage.removeItem('provider_token_type');
    localStorage.removeItem('provider_profile');

    showLogin.value = true;
    showLogout.value = false;
    window.location.href = '/';
}

onMounted(async () => {
    const expiresIn = localStorage.getItem('provider_expiration_date');
    //console.log('Expiration date from localStorage:', expiresIn);
    if (expiresIn) {
        const expiresTimestamp = new Date(expiresIn).getTime();
        if (Date.now() < expiresTimestamp) {
            showLogin.value = false;
            showLogout.value = true;
        } else {
            showLogin.value = true;
            showLogout.value = false;
        }
    } else {
        showLogin.value = true;
        showLogout.value = false;
    }
});

</script>


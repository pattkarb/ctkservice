<template>
    <div class="layout-container">
        <header>
            <nav>
                <h1 class="logo">Ctk@Service</h1>
                <NuxtLink to="/">Home</NuxtLink> |
                <NuxtLink to="/products/detail">Posts</NuxtLink> |
                <NuxtLink to="/about">About</NuxtLink>
                <NuxtLink v-if="showLogin" to="/provider">Login</NuxtLink> |
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

<style scoped>
.layout-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

header {
    flex-shrink: 0;
}

footer {
    flex-shrink: 0;
    color: #555;
    padding: 5px 0;
    margin-top: auto;
}

nav {
    margin: 5px auto;
    background: #182a60;
    color: white;
    padding: 3px 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

nav a {
    color: white;
    text-decoration: none;
    margin-left: 12px;
    font-size: 18px;
    padding: 10px
}

nav a:hover {
    color: coral;
}

.logo {
    font-size: 24px;
    font-weight: bold;
    margin-right: auto;
    margin-left: 10px;
    color: rgb(238, 231, 237);
}
</style>
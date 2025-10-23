<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRuntimeConfig } from '#app';

const config = useRuntimeConfig();

let health_link = "https://moph.id.th";
let client_id = config.public.ClientId;
let response_type = "code";
let redirect_uri = ref(''); 

function HealthIdLogin() {
   if (redirect_uri.value) {
        window.location.href = `${health_link}/oauth/redirect?client_id=${client_id}&redirect_uri=${redirect_uri.value}&response_type=${response_type}`;
    } else {
        console.error("Redirect URI not set yet (still running on server or not mounted).");
    }
}

onMounted(() => {
    redirect_uri.value = `${window.location.origin}/auth/callback`;
});

</script>

<template>
    <div class="d-flex align-center text-center mb-6">
        <div class="text-h6 w-100 px-5 font-weight-regular auth-divider position-relative">
            <span class="bg-surface px-5 py-3 position-relative text-subtitle-1 text-grey100">Please Login to Ctk@Service</span>
        </div>
    </div>
    <div>
        <v-row class="mb-3 py-5">
            <v-col cols="12 " class="py-5">
                <div class="d-flex flex-wrap align-center w-100 ">
                    
                    <div class="ml-sm-auto">
                        <RouterLink to="/"
                            class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium">
                            Back home?</RouterLink>
                    </div>
                </div>
            </v-col>
            <v-col cols="12">
                <v-btn @click="HealthIdLogin" size="large" rounded="pill" color="success" class="rounded-pill" block type="submit" >
                    Login with Provider iD
                </v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<template>
    <div>กำลังประมวลผลการเข้าสู่ระบบ...</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2'

// import { useRoute } from 'vue-router';

let client_id1 = '0195360c-de27-7758-a20b-67ab4a3085df'
let client_sec1 = 'b9e8684a5b8aad3d49e6387c0a8e8bc70c7ccee2'

let client_id2 = '66f416cd-3945-4ff2-8ef8-ee7b8219d0d0'
let client_sec2 = 'F1vlLszBVL5gzYI5u6WjlAfrBN1G4Msx'

// let redirect_uri = `${window.location.origin}/provider/callback_token/`;
// let url = "https://moph.id.th/api/v1/token"

const route = useRoute();
useHead({
    title: `ProviderId Callback`,
    meta: [
        { name: 'description', content: 'รายละเอียด Provider Callback' }
    ]
});

let code = route.query.code || '';
onMounted(async () => {
    if (code) {
        let redirect_uri = `${window.location.origin}/provider/callback`;
        let url = "https://moph.id.th/api/v1/token"
        let data = {
            client_id: client_id1,
            client_secret: client_sec1,
            code: code,
            grant_type: "authorization_code",
            redirect_uri: redirect_uri,
        }
        try {
            let res = await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'response_type': 'application/json'
                }
            });
            if (res.status === 'success' || res.status === 200) {
                localStorage.setItem('moph_access_token', res.data.data.access_token);
                localStorage.setItem('moph_account_id', res.data.data.account_id);
                localStorage.setItem('moph_expires_in', res.data.data.expires_in);
                localStorage.setItem('moph_token_type', res.data.data.token_type);
                // window.location.href = '/';

                try {
                    let url = "https://provider.id.th/api/v1/services/token"
                    data = {
                        client_id: client_id2,
                        secret_key: client_sec2,
                        token_by: "Health ID",
                        token: res.data.data.access_token,
                    }
                    let provider = await axios.post(url, data, {
                        headers: {
                            'content-type': 'application/json',
                        }
                    });
                    //console.log('Profile data:', provider.data);
                    if (provider.status === 'success' || provider.status === 200) {
                        localStorage.setItem('provider_access_token', provider.data.data.access_token);
                        localStorage.setItem('provider_expires_in', provider.data.data.expires_in);
                        localStorage.setItem('provider_expiration_date', provider.data.data.expiration_date);
                        localStorage.setItem('provider_token_type', provider.data.data.token_type);
                        localStorage.setItem('provider_account_id', provider.data.data.account_id);
                        localStorage.setItem('provider_account_username', provider.data.data.username);
                       
                        try {
                            let url = "https://provider.id.th/api/v1/services/profile"
                            let profile = await axios.get(url, {
                                headers: {
                                    'content-type': 'application/json',
                                    'Authorization': `Bearer ${provider.data.data.access_token}`,
                                    'client-id': client_id2,
                                    'secret-key': client_sec2,
                                }
                            });
                            //console.log('Profile data:', profile.data);
                            if (profile.status === 'success' || profile.status === 200) {
                                localStorage.setItem('provider_profile', JSON.stringify(profile.data.data));
                                await Swal.fire({
                                    icon: 'success',
                                    title: 'เข้าสู่ระบบสำเร็จ',
                                    toast: false,
                                    position: 'buttom-end',
                                    showConfirmButton: true,
                                    timer: 3000,
                                })
                                window.location.href = '/';
                            }
                        } catch (e) {
                            Swal.fire({
                            icon: 'error',
                            title: 'Provider Profile error',
                            toast: true,
                            position: 'bottom-end',
                            showConfirmButton: false,
                            timer: 3000,
                        });
                        }

                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Provider token error',
                            toast: true,
                            position: 'bottom-end',
                            showConfirmButton: false,
                            timer: 3000,
                        })
                    }
                } catch (providerErr) {
                    console.log('Error fetching profile:', providerErr);
                    Swal.fire({
                        icon: 'error',
                        title: 'Provider token error',
                        toast: true,
                        position: 'bottom-end',
                        showConfirmButton: false,
                        timer: 3000,
                    })

                };

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'no token',
                    toast: true,
                    position: 'bottom-end',
                    showConfirmButton: false,
                    timer: 3000,
                })
            }
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: 'no token',
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 3000,
            })
        }

    } else {
        Swal.fire({
            icon: 'error',
            title: 'wrong code',
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
        })
    }
})


</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    font-family: 'Kanit', sans-serif;
    text-shadow: 0cqmax(0 0 5px #000);
    font-size: 18px;
    align-items: center;
    justify-content: center;
}
</style>
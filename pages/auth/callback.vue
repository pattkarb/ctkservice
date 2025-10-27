<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useUserStore } from '~/stores/user'; 
import { useLoadingSwal } from '~/composables/useLoadingSwal';

const userStore = useUserStore();
const config = useRuntimeConfig()

const { 
  showLoading, 
  endLoading, 
  showSuccess, 
  showError 
} = useLoadingSwal();

let client_id1 = config.public.ClientId;
let client_sec1 = config.public.SecretId;

let client_id2 = config.public.ClientId1;
let client_sec2 = config.public.SecretId1;

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
        let redirect_uri = `${window.location.origin}/auth/callback`;
        let url = "https://moph.id.th/api/v1/token"
        let data = {
            client_id: client_id1,
            client_secret: client_sec1,
            code: code,
            grant_type: "authorization_code",
            redirect_uri: redirect_uri,
        }

        //console.log('my===',data)
        showLoading('กำลังส่งข้อมูล...', 'โปรดรอการยืนยันจากเซิร์ฟเวอร์');
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
                                
                                await endLoading(); // รอให้ Loading ปิดก่อน
                                showSuccess('เข้าสู่ระบบสำเร็จ!');
                                
                               
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
            await endLoading(); 
            showError('Login ไม่สำเร็จ', 'ข้อผิดพลาด: ' + err.message);
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

</style>
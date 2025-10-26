<template>
  <v-container class="py-8">
    <div v-if="isLoading" class="text-center">
    </div>
    <v-card v-else-if="profile" class="mx-auto" max-width="800">
      <h2>{{ profile.email }}</h2>
      <h2>{{ profile.name_th }}</h2>
    </v-card>


  </v-container>
  <v-container>
    <pre v-if="data">{{ JSON.stringify(data, null, 2) }}</pre>
  </v-container>
</template>

<script setup lang="ts">
  import { ref, onMounted, reactive } from "vue";
  import Swal from 'sweetalert2';
  import { useAuthStatus } from '~/composables/useAuthStatus';
  import { useJwtDecoder } from '~/composables/userJwtDecoder'; 
  import { useActionApi } from '~/composables/useApi';

  const { isLoggedIn, checkAuthStatus } = useAuthStatus();
  const { decode } = useJwtDecoder();

  const mophProfile = ref<any>(null);
  const profile = ref<any>(null);
  const isLoading = ref(true);
    
  const showLoadingSwal = () => {
    Swal.fire({
        title: 'กำลังโหลดโปรไฟล์...',
        html: 'กรุณารอสักครู่ขณะที่ระบบกำลังดึงข้อมูลผู้ใช้ !!',
        allowOutsideClick: false, // ห้ามผู้ใช้ปิด Modal เอง
        showConfirmButton: false, // ไม่แสดงปุ่ม
        didOpen: () => {
            Swal.showLoading(); // แสดง Spinner
        }
      });
  };

  const API_BASE_URL = 'http://61.19.112.116:9000/api/data';
  const { 
      data, 
      loading, 
      error, 
      selectData
  } = useActionApi(API_BASE_URL);

  const closeLoadingSwal = () => {
    Swal.close();
  };

  watch(isLoading, (newValue) => {
    if (newValue === true) {
        showLoadingSwal();
    } else {
        closeLoadingSwal();
    }
  }, { immediate: true }); 

const fetchOffice = async () => {
    const apiPayload = {
        "mysqlID": "hosoffice",
        "queryText": "SELECT *  FROM hr_person LIMIT 1"
    };
    try {
        const result = await selectData(apiPayload); 
        console.log('ข้อมูลที่ดึงมา:', result);
    } catch (e) {
        console.error("API Call failed:", e);
    }
};


const fetchProfile = async () => {
 isLoading.value = true;
  if (!isLoggedIn) {
    navigateTo("/login");
    return;
  }
  const profileString = localStorage.getItem("provider_profile");
    try {
        profile.value = profileString ? JSON.parse(profileString) : null;
    } catch (e) {
        console.error("Error parsing provider_profile:", e);
    }

  const access_token = localStorage.getItem("moph_access_token") || null;
    if (access_token) {
        const decodeResult = decode(access_token);
        if (decodeResult.status === 'success') {
            mophProfile.value = decodeResult.payload;
        } else {
            console.error('MOPH Token decode failed:', decodeResult.error);
        }
        //console.log('Decoded MOPH Profile:', mophProfile.value);
    }
  
  
  isLoading.value = false;

};

// 3. ฟังก์ชันสำหรับแก้ไขโปรไฟล์ (ตัวอย่าง)
const editProfile = () => {
  alert("ไปยังหน้าแก้ไขโปรไฟล์...");
  // navigateTo('/user/edit');
};

// 4. ตั้งค่า SEO/Title
useHead({
  title: "โปรไฟล์ผู้ใช้งาน | Ctkservice",
  meta: [{ name: "description", content: "แสดงข้อมูลโปรไฟล์ของผู้ใช้งานระบบ" }],
});

onMounted(()=>{
  fetchProfile();
  fetchOffice();
});

</script>

<style scoped>
/* สไตล์สำหรับ Vuetify (ถ้าใช้) */
.v-card-title {
  font-weight: bold;
  font-size: 1.5rem;
}
.v-list-item-icon {
  margin-right: 15px;
}
</style>

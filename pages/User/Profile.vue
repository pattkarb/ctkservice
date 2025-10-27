<template>
  <v-container class="py-8">
    <div v-if="isLoading" class="text-center">
    </div>

    <v-card v-if="office_profile" class="mx-auto" max-width="800">
      <h1>HOSOFFICE</h1>
      <div v-if="imageDataUrl" class="text-center pa-4">
            <img 
              :src="imageDataUrl" 
              alt="HR Profile Image" 
              style="max-width: 100%; height: auto; border-radius: 8px;"
            />
        </div>
      <h2>{{ office_profile.HR_CID }}</h2>
      <h2>{{office_profile.HR_FNAME +" "+ office_profile.HR_LNAME }}</h2>
    </v-card>



    <v-card v-if="moph_profile" class="mx-auto" max-width="800">
      <h1>หมอพร้อม</h1>
      <h2>{{ moph_profile.email }}</h2>
      <h2>{{ moph_profile.name_th }}</h2>
      
    </v-card>


  </v-container>
  
</template>

<script setup lang="ts">
  import { ref, onMounted, reactive } from "vue";
  import Swal from 'sweetalert2';
  import { useAuthStatus } from '~/composables/useAuthStatus';
  import { useJwtDecoder } from '~/composables/userJwtDecoder'; 
  import { useActionApi } from '~/composables/useApi';
  import { useUserStore } from '~/stores/user';
  import { useImage } from '~/composables/useImage';

  const config = useRuntimeConfig()
  const { isLoggedIn, checkAuthStatus } = useAuthStatus();
  const { decode } = useJwtDecoder();

  const moph_profile = ref<any>(null);
  const office_profile = ref<any>(null);
  const isLoading = ref(true);
  const userStore = useUserStore();

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

  const API_BASE_URL = config.public.ApiUrl +  '/api/data';
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
        "queryText": "SELECT *  FROM hr_person WHERE HR_CID="+userStore.ptCID+" LIMIT 1"
    };
    try {
        const result = await selectData(apiPayload); 
        office_profile.value = result.data[0];
        console.log('ข้อมูลที่ดึงมา:', result.data[0]);
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
        moph_profile.value = profileString ? JSON.parse(profileString) : null;
    } catch (e) {
        console.error("Error parsing provider_profile:", e);
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

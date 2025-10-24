<template>
  <v-container class="py-8">
    <div v-if="isLoading" class="text-center">
    </div>
    <v-card v-else-if="profile" class="mx-auto" max-width="800">
      <h2>{{ profile.email }}</h2>
    </v-card>


  </v-container>
</template>

<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import Swal from 'sweetalert2';
  import { useAuthStatus } from '~/composables/useAuthStatus';
  import { useJwtDecoder } from '~/composables/userJwtDecoder'; 

  const { isLoggedIn, checkAuthStatus } = useAuthStatus();

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


const fetchProfile = async () => {
  const { decode } = useJwtDecoder();

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
        mophProfile.value = useJwtDecoder(access_token).value;
        console.log('Decoded MOPH Profile:', mophProfile.value);
    }
  
  console.log('provider =', profile.value)
  isLoading.value = false;
};

// 2. Lifecycle Hook สำหรับการดึงข้อมูล
// ใช้ useAsyncData หรือ onMounted ขึ้นอยู่กับว่าต้องการให้ข้อมูลถูกดึงฝั่ง Server หรือ Client
// ในที่นี้เลือก onMounted เพื่อให้แน่ใจว่า auth state ถูก init แล้ว
onMounted(fetchProfile);

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

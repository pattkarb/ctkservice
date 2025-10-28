<template>
  <v-container v-if="office_profile" class="py-8 Sarabun">
    <v-card class="mx-auto" elevation="4">
      <v-card-title class="bg-primary text-white">
        <v-icon left>mdi-account-circle</v-icon> ข้อมูลผู้ใช้งานระบบ
      </v-card-title>
      <v-row no-gutters>
        <v-col cols="12" md="4" class="pa-4 text-center">
          <div class="user-avatar-container">
            
              <img 
               :src="imageURL" 
                alt="รูปภาพจาก localStorage" 
                style="max-width: 200px; height: auto; border: 1px solid #ccc;"
              >
            
            <v-icon size="120" color="grey lighten-1">mdi-account-circle</v-icon>

            <p class="mt-2 text-subtitle-1 font-weight-bold">
              {{ office_profile.HR_FNAME +" "+ office_profile.HR_LNAME }}
            </p>
          </div>
        </v-col>

        <v-col cols="12" md="8" class="pa-4">
          <v-list dense>
            <v-list-item>
              <v-list-item-icon><v-icon>mdi-email</v-icon></v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold">อีเมล</v-list-item-title>
                <v-list-item-subtitle>{{ userStore.profile?.email || 'N/A' }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item>
              <v-list-item-icon><v-icon>mdi-id-card</v-icon></v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold">เลขบัตรประชาชน (CID)</v-list-item-title>
                <v-list-item-subtitle>{{ userStore.ptCID || 'N/A' }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon><v-icon>mdi-hospital-box</v-icon></v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold">H-CODE ที่ผูกกับระบบ</v-list-item-title>
                <v-list-item-subtitle>{{ userStore.ptHCODE || 'N/A' }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            
            <v-divider></v-divider>

            <v-list-item>
              <v-list-item-icon><v-icon :color="userStore.isMophTokenExpired ? 'error' : 'success'">mdi-shield-check</v-icon></v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold">สถานะ MOPH Token</v-list-item-title>
                <v-list-item-subtitle :class="userStore.isMophTokenExpired ? 'text-red' : 'text-green'">
                  {{ userStore.isMophTokenExpired ? 'หมดอายุแล้ว / ไม่ถูกต้อง' : 'ใช้งานได้' }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

          </v-list>
        </v-col>
      </v-row>
      
      <v-card-actions class="justify-end">
        <v-btn color="error" @click="userStore.logout">
          <v-icon left>mdi-logout</v-icon> Logout
        </v-btn>
      </v-card-actions>
      
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
  import { ref, onMounted, reactive, watch } from "vue";
  import Swal from 'sweetalert2';
  import { useAuthStatus } from '~/composables/useAuthStatus';
  import { useJwtDecoder } from '~/composables/userJwtDecoder'; 
  import { useActionApi } from '~/composables/useApi';
  import { useUserStore } from '~/stores/user';
  import { useImage } from '~/composables/useImage.js';

  const config = useRuntimeConfig()
  const { isLoggedIn, checkAuthStatus } = useAuthStatus();
  const { decode } = useJwtDecoder();

  const moph_profile = ref<any>(null);
  const office_profile = ref<any>(null);
  const isLoading = ref(true);
  const userStore = useUserStore();
  
  const imageBufferArray = ref(null);
  const MIME_TYPE = 'image/jpeg';
  const { imageURL } = useImage(imageBufferArray, MIME_TYPE);

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

const loadImageFromStorage = () => {
  const mophImageString = localStorage.getItem('moph_image');
  if (mophImageString) {
    try {
      let dataToParse = mophImageString.trim();
      let numberArray;
      if (dataToParse.startsWith('[') && dataToParse.endsWith(']')) {
          numberArray = JSON.parse(dataToParse);
      } else {
          numberArray = dataToParse.split(',').map(s => parseInt(s.trim(), 10));
      }
      imageBufferArray.value = numberArray.filter(n => !isNaN(n) && n >= 0 && n <= 255); 
      if (imageBufferArray.value.length === 0) {
          console.error("Conversion failed: Resulting array is empty or contains invalid data.");
      }

    } catch (e) {
      console.error("Error parsing/converting moph_image from localStorage:", e);
      imageBufferArray.value = null;
    }
  } else {
      console.warn("moph_image not found in localStorage.");
      imageBufferArray.value = null;
  }
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
        //console.log('ข้อมูลที่ดึงมา:',result.data[0].HR_IMAGE);
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

watch(imageURL, (newUrl) => {
    console.log('Image URL ถูกอัปเดตเป็น:', newUrl);
    if (newUrl && newUrl.startsWith('blob:')) {
        console.log('SUCCESS: Object URL ถูกสร้างแล้ว!');
    } else if (newUrl && newUrl.startsWith('data:')) {
        console.log('SUCCESS: Data URL ถูกสร้างแล้ว!');
    } else {
        console.log('FAIL: imageURL เป็น null/undefined');
    }
});

onMounted(async ()=>{
  fetchProfile();
  fetchOffice();
  loadImageFromStorage();
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

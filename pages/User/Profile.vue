<template>
  <v-container class="py-8">
    <div v-if="isLoading" class="text-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
      <p class="mt-4">กำลังดึงข้อมูลโปรไฟล์...</p>
    </div>

    <v-card v-else-if="profile" class="mx-auto" max-width="800">
      <v-img
        class="align-end text-white"
        height="150"
        src="https://picsum.photos/800/150"
        cover
      >
        <v-card-title class="pb-1">ข้อมูลผู้ใช้งาน</v-card-title>
      </v-img>

      <div
        class="d-flex justify-center"
        style="margin-top: -60px; margin-bottom: 20px"
      >
        <v-avatar size="100" class="elevation-5">
          <v-img
            :src="profile.photo_url || 'https://via.placeholder.com/100'"
            alt="User Photo"
          ></v-img>
        </v-avatar>
      </div>

      <v-card-text>
        <h2 class="text-h5 text-center mb-4">{{ profile.full_name }}</h2>

        <v-divider class="my-4"></v-divider>

        <v-list density="compact">
          <v-list-item>
            <v-list-item-icon><v-icon>mdi-account</v-icon></v-list-item-icon>
            <v-list-item-title>ชื่อ-นามสกุล:</v-list-item-title>
            <v-list-item-subtitle>{{ profile.full_name }}</v-list-item-subtitle>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon
              ><v-icon>mdi-badge-account</v-icon></v-list-item-icon
            >
            <v-list-item-title>ตำแหน่ง:</v-list-item-title>
            <v-list-item-subtitle>{{
              profile.position || "ไม่ระบุ"
            }}</v-list-item-subtitle>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon
              ><v-icon>mdi-hospital-box</v-icon></v-list-item-icon
            >
            <v-list-item-title>หน่วยงาน/สถานพยาบาล:</v-list-item-title>
            <v-list-item-subtitle>{{
              profile.organization
            }}</v-list-item-subtitle>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon
              ><v-icon>mdi-card-account-details</v-icon></v-list-item-icon
            >
            <v-list-item-title>เลข 13 หลัก (CID):</v-list-item-title>
            <v-list-item-subtitle>{{
              profile.cid || "ไม่มีข้อมูล"
            }}</v-list-item-subtitle>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon><v-icon>mdi-email</v-icon></v-list-item-icon>
            <v-list-item-title>อีเมล:</v-list-item-title>
            <v-list-item-subtitle>{{
              profile.email || "ไม่มีข้อมูล"
            }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn color="secondary" prepend-icon="mdi-pencil" @click="editProfile"
          >แก้ไขโปรไฟล์</v-btn
        >
        <v-btn color="error" prepend-icon="mdi-logout" @click="auth.logout()"
          >ออกจากระบบ</v-btn
        >
      </v-card-actions>
    </v-card>

    <v-alert v-else type="error" border="start" variant="tonal" class="mt-6">
      ไม่สามารถโหลดข้อมูลโปรไฟล์ได้ กรุณาลองใหม่อีกครั้ง
    </v-alert>
  </v-container>
</template>

<script setup lang="ts">

import { ref } from "vue";

const auth = useAuth();

// State สำหรับเก็บข้อมูลโปรไฟล์และสถานะการโหลด
const profile = ref<any>(null);
const isLoading = ref(true);

// 1. ดึงข้อมูลโปรไฟล์เมื่อโหลดหน้า
const fetchProfile = async () => {
  // ต้องมี token เพื่อเรียก API
  if (!auth.isLoggedIn.value) {
    // หากไม่มี token อาจต้อง redirect ไปหน้า login
    navigateTo("/login");
    return;
  }

  // เรียก Nuxt Server API (Backend) ที่จะทำการส่ง Token ไปดึงข้อมูลผู้ใช้จาก MOPH ID หรือ Database
  try {
    const { data } = await useFetch("/api/user/profile", {
      method: "GET",
      // headers: { Authorization: `Bearer ${auth.token.value}` } // อาจจะใส่ใน Server API Middleware แทน
    });

    if (data.value) {
      profile.value = data.value;
    } else {
      // กรณี API ไม่พบข้อมูลผู้ใช้
      throw new Error("User profile data not found.");
    }
  } catch (e) {
    console.error("Error fetching user profile:", e);
    profile.value = null;
  } finally {
    isLoading.value = false;
  }
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

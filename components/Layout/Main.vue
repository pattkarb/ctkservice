<script setup lang="ts">

import { ref, shallowRef, onMounted } from "vue";
import sidebarItems from "@/components/Layout/Full/vertical-sidebar/sidebarItem";
import { Menu2Icon, BellRingingIcon, JsonIcon } from "vue-tabler-icons";
import { useAuthStatus } from '~/composables/useAuthStatus';
import { useUserStore } from '~/stores/user';
import Swal from 'sweetalert2'
import { useJwtDecoder } from '~/composables/userJwtDecoder'; 

const config = useRuntimeConfig()
const sidebarMenu = shallowRef(sidebarItems);
const sDrawer = ref(false);
const userStore = useUserStore();
const { isLoggedIn, checkAuthStatus } = useAuthStatus();

const API_BASE_URL = config.public.ApiUrl +  '/api/data';
const { 
      data, 
      loading, 
      error, 
      selectData
} = useActionApi(API_BASE_URL);

function LoadUserProfile() {
  const { decode } = useJwtDecoder();
  if(!isLoggedIn) {
    return;
  }

  const moph_access_token = localStorage.getItem('moph_access_token');
  const provider_profile_string = localStorage.getItem('provider_profile');
  
  if (!moph_access_token || !provider_profile_string) {
        console.warn('Missing MOPH token or Provider profile data.');
        return;
  }
  
  const decodeItems = decode(moph_access_token);
  
  if (decodeItems.status === 'success') {
    const payload = decodeItems.payload;
    let providerData = null;
    try {
      providerData = JSON.parse(provider_profile_string);
    } catch (e) {
      console.error("Error parsing provider_profile JSON:", e);
      return;
    }
    const hcodeValue = providerData?.organization?.[0]?.hcode9 || null;
    const cidValue = payload.scopes_detail?.id_card || null;

    userStore.setPatientData({ 
      cid: cidValue,
      hashCid: payload.scopes_detail?.hash_id_card || null,
      birthdate: payload.scopes_detail?.birthdate || null,
      hcode: hcodeValue,
        });

  } else {
    console.error('MOPH Token decode failed:', decodeItems.error);
  }   
}

const fetchImage = async () => {
    const apiPayload = {
        "mysqlID": "hosoffice",
        "queryText": "SELECT HR_IMAGE  FROM hr_person WHERE HR_CID="+userStore.ptCID+" LIMIT 1"
    };
    try {
        const result = await selectData(apiPayload); 
        if (result) {
            //console.log('ข้อมูลที่ดึงมา:',JSON.stringify(result.data[0].HR_IMAGE));
            localStorage.setItem('moph_image', JSON.stringify(result.data[0].HR_IMAGE));
            userStore.setMember({
              member:  true,
            });
        } else {
          userStore.setMember({
            member: false,
          });
        }
    } catch (e) {
        console.error("API Call failed:", e);
    }
};


function handleLogout() {
  localStorage.clear();
  Swal.fire({
    icon: 'success',
    title: 'ออกจากระบบ..!',
    showConfirmButton: false, 
    timer: 2500,
  }).then(() => {
    window.location.href = '/'; 
  });
}

function handleLogin() {
  window.location.href = '/auth/login';
}

onMounted (async ()=>{
  LoadUserProfile();
  await fetchImage();
});

</script>

<template>
  <v-navigation-drawer left v-model="sDrawer" app class="leftSidebar bg-containerBg" elevation="10" width="270">
    <div class="pa-5 pl-4">
      <LayoutFullLogoDark />
    </div>
    <perfect-scrollbar class="scrollnavbar bg-containerBg overflow-y-hidden">
      <v-list class="py-4 px-4 bg-containerBg">
        <!---Menu Loop -->
        <template v-for="(item, i) in sidebarMenu">
          <!---Item Sub Header -->
          <LayoutFullVerticalSidebarNavGroup :item="item" v-if="item.header" :key="item.title" />

          <!---If Has Child -->
          <LayoutFullVerticalSidebarNavCollapse class="leftPadding" :item="item" :level="0" v-else-if="item.children" />
          <!---Single Item-->

          <LayoutFullVerticalSidebarNavItem :item="item" v-else class="leftPadding" />
          <!---End Single Item-->
        </template>
        <!-- <Moreoption/> -->
      </v-list>
      <div class="pa-4">
        <v-sheet rounded="md" color="lightprimary" class="position-relative extrabox hide-menu mx-1 px-4 py-3">
          <div class="d-flex align-center">
            <div>
              <h6 class="text-h6 text-10 mb-3">Check Pro Version</h6>
              <v-btn target="_blank"
                href="https://www.wrappixel.com/templates/spike-nuxtjs-admin-template/?ref=376#demos" color="primary"
                class="px-5" rounded="pill" flat>check</v-btn>
            </div>
            <div class="">
              <img src="/images/backgrounds/sidebar-buynow-bg.svg" height="100" width="100" class="px-2 ms-8" />
            </div>
          </div>
        </v-sheet>
      </div>
    </perfect-scrollbar>
  </v-navigation-drawer>
  <div class="container verticalLayout">
    <div class="maxWidth px-xl-0 px-sm-5 px-0">
      <v-app-bar elevation="0" height="50" class="top-header">
        <div class="d-flex align-center justify-space-between w-100">
          <div class="d-flex align-center">
            <v-btn class="hidden-lg-and-up text-muted" @click="sDrawer = !sDrawer" icon variant="flat" size="small"
              style="padding: 0; margin:0;">
              <Menu2Icon size="20" stroke-width="1.5" />
            </v-btn>
            <LayoutFullLogoMain />
          </div>
          <div>
            <LayoutFullVerticalHeaderNotificationDD v-if="isLoggedIn" />
            <LayoutFullVerticalHeaderProfileDD 
                v-if="isLoggedIn" 
                :key="isLoggedIn ? 'logged-in' : 'logged-out'"
            />
            <v-btn v-if="isLoggedIn" color="error" @click="handleLogout">
              Logout
            </v-btn>
            <v-btn v-else color="primary" @click="handleLogin">
              Login
            </v-btn>
          </div>
        </div>
      </v-app-bar>
    </div>
  </div>
</template>

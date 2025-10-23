<script setup lang="ts">
import { ref, shallowRef, onMounted } from "vue";
import sidebarItems from "@/components/Layout/Full/vertical-sidebar/sidebarItem";
import { Menu2Icon, BellRingingIcon } from "vue-tabler-icons";
import { useAuthStatus } from '~/composables/useAuthStatus';
import Swal from 'sweetalert2'

const sidebarMenu = shallowRef(sidebarItems);
const sDrawer = ref(false);
import logo from "/images/logos/hospital.png";
import { useUserStore } from '~/stores/user';
const userStore = useUserStore();

const { isLoggedIn, checkAuthStatus } = useAuthStatus();

function LoadUserProfile() {
  console.log('userlogin')
}

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

</script>

<template>
  <v-navigation-drawer left v-model="sDrawer" app class="leftSidebar bg-containerBg" elevation="10" width="270">
    <div class="pa-5 pl-4">
      <LayoutFullLogoDark />
    </div>
    <!-- ---------------------------------------------- -->
    <!---Navigation -->
    <!-- ---------------------------------------------- -->
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
            <img :src="logo" width="34" class="p-0 m-0" />
            <v-btn class="hidden-lg-and-up text-muted" @click="sDrawer = !sDrawer" icon variant="flat" size="small"
              style="margin-left: -5px;">
              <Menu2Icon size="20" stroke-width="1.5" />
            </v-btn>
          </div>
          <div>
            <LayoutFullVerticalHeaderNotificationDD v-if="isLoggedIn" />
            <v-btn v-if="isLoggedIn" color="error" @click="handleLogout">
              Logout
            </v-btn>
            <v-btn v-else color="primary" @click="handleLogin">
              Login
            </v-btn>
            <LayoutFullVerticalHeaderProfileDD v-if="isLoggedIn" />
          </div>
        </div>
      </v-app-bar>
    </div>
  </div>
</template>

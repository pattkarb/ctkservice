<script setup lang="ts">
import { ref } from "vue";
import { UserIcon, MailIcon, ListCheckIcon } from 'vue-tabler-icons';
import Swal from 'sweetalert2'

const userStore = useUserStore();
const { isLoggedIn, checkAuthStatus } = useAuthStatus();
const isMembers = userStore.isMember;

const hrImageBuffer = ref(null);
const MIME_TYPE = 'image/jpeg'; 
const { imageURL } = useImage(hrImageBuffer, 'image/jpeg');


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

const fetchImage = async () => {
    const mophImageString = localStorage.getItem('moph_image');
    if (mophImageString) {
        const mophImageArray = JSON.parse(mophImageString);
        //console.log('--->', mophImageJson.data)
        const imageData = mophImageArray.data;
        if (Array.isArray(imageData) && imageData.length > 0) {
                console.log('พบ Array of bytes, กำลังส่งไปแปลง...');               
                hrImageBuffer.value = imageData; 
            } else {
                console.error("Data is not a valid Array or is empty.");
                hrImageBuffer.value = null;
            }
    } else {
        console.log("No 'moph_image' found in localStorage.");
        hrImageBuffer.value = null;
    }
};

onMounted (async()=>{ 
    await fetchImage();   
});
</script>
<template>
    <v-menu 
        v-if="isLoggedIn"
        :close-on-content-click="false"
        >
        <template v-slot:activator="{ props }">
            <v-btn class="" variant="text" v-bind="props" icon>
                <v-avatar v-if="isMembers" size="35">
                    <img 
                        :src="imageURL" 
                        height="45" alt="1" />
                </v-avatar>
                <v-avatar v-else size="35">
                    <img src="/images/profile/user-1.jpg" height="35" alt="2" />
                </v-avatar>
            </v-btn>
        </template>
        <v-sheet rounded="xl" width="200" elevation="10" class="mt-2">
            <v-list class="py-0" lines="one" density="compact">
                <v-list-item value="item1" color="primary" to="/User/Profile">
                    <template v-slot:prepend>
                        <UserIcon stroke-width="1.5" size="20"/>
                    </template>
                    <v-list-item-title class="pl-4 text-body-1">My Profile</v-list-item-title>
                </v-list-item>
                <v-list-item value="item2" color="primary">
                    <template v-slot:prepend>
                        <MailIcon stroke-width="1.5" size="20"/>
                    </template>
                    <v-list-item-title  class="pl-4 text-body-1">My Account</v-list-item-title>
                </v-list-item>
                <v-list-item value="item3" color="primary"> 
                    <template v-slot:prepend>
                        <ListCheckIcon stroke-width="1.5"  size="20"/>
                    </template>
                    <v-list-item-title class="pl-4 text-body-1">My Task</v-list-item-title>
                </v-list-item>
            </v-list>
            <div class="pt-4 pb-4 px-5 text-center">
                <v-btn @click="handleLogout" color="primary" variant="outlined" class="rounded-pill" block>Logout</v-btn>
            </div>
        </v-sheet>
    </v-menu>
</template>

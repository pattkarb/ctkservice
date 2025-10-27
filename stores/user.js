import { defineStore } from 'pinia';
import { useJwtDecoder } from '~/composables/userJwtDecoder'; 
import { useTokenExpire } from '~/composables/useTokenExpire';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

export const useUserStore = defineStore('user', {
    
  state: () => ({
    isLoggedIn: false,
    profile: null, 
    mophProfile: null, 
    ptCID: null, 
    ptHashCID: null,
    ptBirthDate:null,
    ptHCODE: null,
  }),

  getters: {
    isMophTokenExpired: (state) => {
        if (!state.mophProfile) return true;
          const { isExpired } = useTokenExpire(state.mophProfile);
        return isExpired.value;
    },
    displayName: (state) => state.profile?.name_th || 'Guest',
  },

  actions: {
    checkAuthAndLoadProfile() {
      const { decode } = useJwtDecoder();
      const profileString = localStorage.getItem("provider_profile");
      try {
          this.profile = profileString ? JSON.parse(profileString) : null;
      } catch (e) {
          this.profile = null;
      }
      const accessToken = localStorage.getItem("moph_access_token");
      if (accessToken) {
        const decodeResult = decode(accessToken);
        if (decodeResult.status === 'success') {
          this.mophProfile = decodeResult.payload;
          
          if (!this.isMophTokenExpired) {
             this.isLoggedIn = true;
             return; 
          }
        }
      }
      
      this.isLoggedIn = false;
      this.mophProfile = null;
      
      this.clearPatientData();
    },

    setPatientData(data) {
        this.ptCID = data.cid || null;
        this.ptHashCID = data.hashCid || null;
        this.ptHCODE = data.hcode || null;
        this.ptBirthDate=data.birthdate || null;
    },

    clearPatientData() {
        this.ptCID = null;
        this.ptHashCID = null;
        this.ptHCODE = null;
        this.ptBirthDate = null;
    },

    logout() {
      localStorage.clear();
      this.isLoggedIn = false;
      this.profile = null;
      this.mophProfile = null;
      this.clearPatientData(); 
      
      const router = useRouter(); 
      router.push('/login');
    },

  },
});
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    username: 'Guest',
    fullname: '',          
    moph_access_token: '', 
    hospital_code: '',     
    hash_cid: '',          
    counter: 0
  }),

  
  getters: {
    authStatus: (state) => state.isLoggedIn ? 'Authenticated' : 'Unauthenticated',
    doubleCounter: (state) => state.counter * 2
  },

  actions: {
      login(userData) {
      this.isLoggedIn = true;  
      this.username = userData.username || 'User'; 
      this.fullname = userData.fullname || '';
      this.moph_access_token = userData.moph_access_token || '';
      this.hospital_code = userData.hospital_code || '';
      this.hash_cid = userData.hash_cid || '';
    },

    logout() {
      this.isLoggedIn = false;
      this.username = 'Guest';
      this.fullname = '';
      this.moph_access_token = '';
      this.hospital_code = '';
      this.hash_cid = '';
      this.counter = 0;
    },

    increment() {
      this.counter++;
    }
  }
})
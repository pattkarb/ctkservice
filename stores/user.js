// stores/user.js
import { defineStore } from 'pinia';
export const useUserStore = defineStore('user', {

  state: () => ({
    profile: null,
    isLoggedIn: false,
  }),

  getters: {
    username: (state) => state.profile ? state.profile.name : 'Guest',
    isAdmin: (state) => state.profile ? state.profile.role === 'admin' : false,
  },

  actions: {
    /**
     * สำหรับเข้าสู่ระบบ (สมมติว่ารับข้อมูลมาแล้ว)
     * @param {object} userData - ข้อมูลผู้ใช้ที่ได้รับจาก API
     */
    login(userData) {
      this.profile = userData;
      this.isLoggedIn = true;
    },

    logout() {
      this.profile = null;
      this.isLoggedIn = false;
    },

    async fetchUserProfile() {
      // สมมติว่านี่คือการเรียก API
      const data = await new Promise(resolve => setTimeout(() => {
          resolve({ id: 101, name: 'Alice', email: 'alice@example.com', role: 'user' });
      }, 500));
      
      this.login(data); // เรียก Action 'login' เพื่ออัปเดต State
    }
  },
});
import { ref } from 'vue';

import { useJwtDecoder } from '~/composables/userJwtDecoder'; 
import { useTokenExpire } from '~/composables/useTokenExpire'; 

export function useAuthStatus() {
    const { decode } = useJwtDecoder();
    const isLoggedIn = ref(false); 

    const checkAuthStatus = () => {
        const access_token = localStorage.getItem("provider_access_token"); 
      
        if (!access_token) {
            isLoggedIn.value = false;
            return; 
        }
        
        const decodeItems = decode(access_token);
        if (decodeItems.status === 'success') {
            const payload = decodeItems.payload;
            
            if (payload && typeof payload.exp === 'number') {
                const { isExpired } = useTokenExpire(payload); 
                if (!isExpired.value) {
                    isLoggedIn.value = true;
                    return;
                }
            }
        } 
        isLoggedIn.value = false;
    };
    
    checkAuthStatus(); 
    return {
        isLoggedIn, 
        checkAuthStatus,
    };
}
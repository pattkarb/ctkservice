import { ref } from 'vue';
import Swal from 'sweetalert2'; 

/**
 * ฟังก์ชันสำหรับแสดง Toast Notification
 * @param {'success'|'error'} icon 
 * @param {string} title 
 */
const showToast = (icon, title) => {
    Swal.fire({
        icon: icon,
        title: title,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        // customClass: { container: 'swal2-toast-container' }
    });
};

export function useActionApi(baseUrl) {
    
    const data = ref(null);
    const loading = ref(false);
    const error = ref(null);

    // Endpoint Suffixes (ตามลักษณะ API ของคุณ)
    const ENDPOINTS = {
        SELECT: '/select',
        INSERT: '/insert',
        UPDATE: '/update',
        DELETE: '/delete',
    };

    const resetStatus = () => {
        loading.value = true;
        error.value = null;
    };

    const executeApiCall = async (endpointSuffix, method, payload) => {
        resetStatus();
        
        const loadingSwal = Swal.fire({
            title: 'กำลังประมวลผล...',
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => Swal.showLoading(),
            toast: true,
            position: 'top-end'
        });

        const config = useRuntimeConfig();
        const apiKey = config.public.ApiKey || 'ctk0011251';
        const url = `${baseUrl}${endpointSuffix}`;
        let successMessage = `ดำเนินการ ${method} สำเร็จ!`;

        try {
            const response = await $fetch(url, {
                method: method,
                body: payload,
                headers: { 'x-api-key': apiKey },
            });
            
            data.value = response;
            loadingSwal.close();
            showToast('success', successMessage);
            
            return response;

        } catch (err) {
            loadingSwal.close();
            const msg = err?.data?.message || err?.message || 'Unknown API Error';
            error.value = `[${method}] Error at ${endpointSuffix}: ${msg}`;
            showToast('error', `เกิดข้อผิดพลาด: ${msg.substring(0, 50)}...`);
            throw new Error(error.value);
        } finally {
            loading.value = false;
        }
    };

    const selectData = (payload) => {
        return executeApiCall(ENDPOINTS.SELECT, 'POST', payload);
    };

    const insertItem = (payload) => {
        return executeApiCall(ENDPOINTS.INSERT, 'POST', payload); 
    };
    
    const updateItem = (payload) => {
        return executeApiCall(ENDPOINTS.UPDATE, 'POST', payload); 
    };

    const deleteItem = (payload) => {
        return executeApiCall(ENDPOINTS.DELETE, 'POST', payload); 
    };
    
    return {
        data,
        loading,
        error,
        selectData,
        insertItem,
        updateItem,
        deleteItem,
    };
}
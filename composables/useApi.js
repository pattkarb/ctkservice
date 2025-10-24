// composables/useApi.js

/**
 * Composable สำหรับจัดการ CRUD Operations ผ่าน API
 * @param {string} url - URL ของ API ที่ต้องการเรียก (e.g., '/api/data')
 * @param {'get' | 'post' | 'put' | 'delete'} method - HTTP Method
 * @param {object} [body=null] - JSON body สำหรับ POST/PUT (e.g., { mysqlID: 'hosxp', queryText: '...' })
 * @param {object} [query=null] - Query parameters สำหรับ GET/DELETE
 * @returns {Promise<object>} - ข้อมูลที่ได้จาก API หรือ throw error
 */
export const callApi = async (
    url: string,
    method: 'get' | 'post' | 'put' | 'delete',
    body: object | null = null,
    query: object | null = null,
    apiKey: string | null = null 
) => {
    
    const config = useRuntimeConfig();
    const apiKey = config.public.ApiKey || 'ctk001251'; // ใช้ค่าเริ่มต้นถ้าไม่มี config

    const headers = {
        'Content-Type': 'application/json',
        'x-api-key': apiKey || useRuntimeConfig().public.ApiKey || '',
        // สามารถเพิ่ม Header สำหรับ Authorization (เช่น JWT) ได้ที่นี่:
        // 'Authorization': `Bearer ${useAuth().token.value}` 
    };

    try {
        const response = await $fetch(url, {
            method: method.toUpperCase(), 
            headers: headers,
            body: body,      
            query: query,    
            requestType: 'json', 
            responseType: 'json',
        });

        return response;

    } catch (error: any) {
        // จัดการข้อผิดพลาดและโยน error ออกไป
        const status = error.response?.status || 500;
        const message = error.data?.message || `API Call failed with status ${status}`;
        
        console.error(`Error during ${method.toUpperCase()} to ${url}:`, error);
        
        throw createError({
            statusCode: status,
            statusMessage: message,
            fatal: false, // ไม่ให้หยุดแอปพลิเคชัน
        });
    }
};
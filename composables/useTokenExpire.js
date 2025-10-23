import { computed, ref } from 'vue';
/**
 * Composable สำหรับตรวจสอบว่า Token หมดอายุแล้วหรือไม่
 * @param {object} decodedPayload - Payload ที่ถอดรหัสแล้ว (ต้องมี property 'exp' เป็น Unix Timestamp)
 */
export function useTokenExpire(decodedPayload) {  
    if (!decodedPayload || typeof decodedPayload.exp !== 'number') {
        return { isExpired: ref(true) };
    }
    const expiryTimestampMs = decodedPayload.exp * 1000;
    const isExpired = computed(() => {
        const currentTimeMs = Date.now();
        return expiryTimestampMs <= currentTimeMs;
    });
    return {
        isExpired,
    };
}
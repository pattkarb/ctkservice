import { ref } from 'vue';

/**
 * Composable สำหรับแปลงข้อมูลรูปภาพ Buffer Array เป็น Base64 Data URL
 * * @param {object | null} bufferData - Object ที่มีโครงสร้าง { type: 'Buffer', data: number[] } หรือ null
 * @param {string} mimeType - ประเภทของไฟล์รูปภาพ (เช่น 'image/jpeg', 'image/png')
 * @returns {{ imageDataUrl: Ref<string|null> }}
 */
export function useImage(bufferData, mimeType = 'image/jpeg') {
    const imageDataUrl = ref(null);
    const convertBufferToBase64 = (bufferData) => {
        if (!bufferData || !bufferData.data || bufferData.type !== 'Buffer' || bufferData.data.length === 0) {
            return null;
        }

        try {
            const buffer = new Uint8Array(bufferData.data);
            let binary = '';
            for (let i = 0; i < buffer.length; i++) {
                binary += String.fromCharCode(buffer[i]);
            }          
            const base64 = btoa(binary);
            return `data:${mimeType};base64,${base64}`;
        } catch (e) {
            console.error("Error converting buffer to Base64:", e);
            return null;
        }
    };
    watch(() => bufferData, (newBufferData) => {
        imageDataUrl.value = convertBufferToBase64(newBufferData);
    }, { immediate: true, deep: true }); 

    return {
        imageDataUrl,
    };
}
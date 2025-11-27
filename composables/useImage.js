import { ref, watch, computed } from 'vue';

export const useImage = (byteArrayRef: Ref<number[] | null>, mimeType: string) => {
    // ใช้ computed เพื่อให้ imageURL อัปเดตเมื่อ byteArrayRef เปลี่ยน
    const imageURL = computed(() => {
        const byteArray = byteArrayRef.value;
        
        if (!byteArray || byteArray.length === 0) {
            return ''; // คืนค่าว่างถ้าไม่มีข้อมูล
        }
        
        try {
            // 1. แปลง Array ของตัวเลข ให้เป็น Typed Array (Uint8Array)
            const uInt8Array = new Uint8Array(byteArray); 
            
            // 2. สร้าง Blob
            const blob = new Blob([uInt8Array], { type: mimeType });
            
            // 3. สร้าง Object URL
            return URL.createObjectURL(blob);
            
        } catch (e) {
            console.error("Error creating Object URL from byte array:", e);
            return '';
        }
    });
    
    // สำคัญ: ต้องดูแลการล้าง Object URL เมื่อ Component ถูก unmount เพื่อป้องกัน Memory Leak
    onUnmounted(() => {
        if (imageURL.value) {
            URL.revokeObjectURL(imageURL.value);
        }
    });

    return { imageURL };
};
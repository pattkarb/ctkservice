import { ref, watch, computed, onUnmounted } from 'vue';
/**
 *   @param {import('vue').Ref<Array<number> | null>} imageByteArrayRef 
 *   @param {string} mimeType 
 *   @returns {object} 
*/
export function useImage(imageByteArrayRef, mimeType = 'image/jpeg') {
    const imageURL = ref(null);
    let objectURL = null;
    const convertBytesToURL = (dataArray, type) => {
        if (!dataArray || dataArray.length === 0) {
            imageURL.value = null;
            return;
        }
        const byteArray = new Uint8Array(dataArray);
        const blob = new Blob([byteArray], { type: type });
        if (objectURL) {
            URL.revokeObjectURL(objectURL);
        }
        objectURL = URL.createObjectURL(blob);
        imageURL.value = objectURL;
    };
    watch(imageByteArrayRef, (newByteArray) => {
        if (Array.isArray(newByteArray) && newByteArray.length > 0) {
            convertBytesToURL(newByteArray, mimeType);
        } else {
            imageURL.value = null;
        }
    }, { immediate: true });
    onUnmounted(() => {
        if (objectURL) {
            URL.revokeObjectURL(objectURL);
            objectURL = null;
        }
    });

    return {
        imageURL,
    };
}
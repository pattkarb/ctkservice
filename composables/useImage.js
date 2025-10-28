import { ref, watch, onUnmounted } from 'vue';

export function useImage(imageBufferData, mimeType = 'image/jpeg') {
    const imageURL = ref(null);
    let objectURL = null;

    const convertBufferToURL = (dataArray, type) => {
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
    watch(() => imageBufferData, (newData) => {
        const dataArray = newData && newData.type === 'Buffer' 
                          ? newData.data 
                          : Array.isArray(newData) 
                              ? newData 
                              : null;                            
        if (dataArray) {
            convertBufferToURL(dataArray, mimeType);
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
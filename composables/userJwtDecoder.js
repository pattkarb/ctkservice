export function useJwtDecoder() {

    /**
     * ฟังก์ชันสำหรับถอดรหัส JWT Payload ออกมาเป็น Object พร้อมสถานะ
     * @param {string} token - JWT (Header.Payload.Signature)
     * @returns {{ status: 'success'|'error', payload: object|null, error: string|null }} - ผลลัพธ์พร้อมสถานะ
     */
    const decode = (token) => {
        if (!token) {
            return {
                status: 'error',
                payload: null,
                error: 'Token is empty or null.',
            };
        }

        try {
            const base64Url = token.split('.')[1];
            if (!base64Url) {
                throw new Error("Invalid JWT format: Payload part is missing.");
            }
            let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            while (base64.length % 4) {
                base64 += '=';
            }
            let jsonPayload = '';
            if (typeof window !== 'undefined' && window.atob) {
                jsonPayload = decodeURIComponent(
                    window.atob(base64).split('').map(function(c) {
                        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    }).join('')
                );
            } else {
                throw new Error('Unsupported environment for decoding.');
            }
            const payload = JSON.parse(jsonPayload);
            return {
                status: 'success',
                payload: payload,
                error: null,
            };

        } catch (e) {
            return {
                status: 'error',
                payload: null,
                error: 'Decoding failed: ' + e.message,
            };
        }
    };  
    return {
        decode,
    };
}
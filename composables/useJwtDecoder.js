/**
 * Composable สำหรับถอดรหัส (Decode) JWT Token 
 * โดยไม่ต้องใช้ Library ภายนอก (Client-side only)
 * @param {string} token - JWT Token ที่ต้องการถอดรหัส
 * @returns {object|null} - Payload Object หรือ null หากเกิดข้อผิดพลาด
 */
export const useJwtDecoder = (token) => {
    // 💡 การถอดรหัส JWT ต้องรันบน Client-side เท่านั้น เพราะมีการใช้ window.atob()
    if (!process.client) {
        console.warn("JWT Decoder is skipped during Server-Side Rendering (SSR).");
        return null;
    }

    if (!token || typeof token !== 'string') {
        return null;
    }

    try {
        // 1. แยก Token ออกเป็นส่วน Header, Payload, Signature
        const [header, payloadBase64, signature] = token.split('.');

        // ตรวจสอบความถูกต้องของโครงสร้าง
        if (!payloadBase64) {
            return null;
        }

        // 2. แปลง Base64Url (ใช้สำหรับ JWT) ให้เป็น Base64 มาตรฐาน
        let base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');

        // 3. ถอดรหัส Base64 เป็น String
        // (เฉพาะในสภาพแวดล้อม Browser เท่านั้น)
        const jsonPayload = decodeURIComponent(
            window.atob(base64)
                .split('')
                .map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join('')
        );

        // 4. แปลง JSON String เป็น JavaScript Object และส่งคืน
        return JSON.parse(jsonPayload);

    } catch (error) {
        console.error("JWT Decode Error:", error);
        return null;
    }
};
/**
 * Composable จัดการ User ดึงข้อมูลจาก HosOffice API
 **/
export const userManage = (cid) => {
    if (!cid || typeof token !== 'string') {
        return null;
    }

    try {
        

        
        return JSON.parse(jsonPayload);

    } catch (error) {
        console.error("User Manage:", error);
        return null;
    }
};
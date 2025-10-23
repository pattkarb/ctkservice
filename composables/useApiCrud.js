import { ref, reactive, toRefs } from 'vue';
import axios from 'axios';

/**
 * Composable สำหรับการจัดการ CRUD ผ่าน API
 * @param {string} baseUrl
 */
export function useApiCrud(baseUrl) {
  
  // สถานะที่ Component จะสามารถติดตามได้
  const data = ref(null); // ใช้เก็บข้อมูลรายการ (Array หรือ Object)
  const loading = ref(false); // สถานะ Loading
  const error = ref(null); // ข้อความ Error ที่เกิดขึ้น

  /**
  * C (Create): สร้างข้อมูลใหม่
  * @param {object} payload - ข้อมูลที่จะส่งไปสร้าง
  * @returns {Promise<object>} ข้อมูลที่ถูกสร้างขึ้น
  */
  const createItem = async (payload) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.post(baseUrl, payload);
      // ถ้าต้องการอัปเดตรายการที่ถูกดึงมาแล้วด้วย ให้เพิ่ม response.data ใน data.value
      return response.data;
    } catch (err) {
      error.value = err.message || 'Error creating item.';
      throw err; // โยน Error ขึ้นไปเพื่อให้ Component จัดการต่อ
    } finally {
      loading.value = false;
    }
  };

  /**
   * R (Read): ดึงข้อมูลทั้งหมด
   */
  const fetchAll = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get(baseUrl);
      data.value = response.data; // อัปเดตข้อมูลรายการ
    } catch (err) {
      error.value = err.message || 'Error fetching data.';
    } finally {
      loading.value = false;
    }
  };

  /**
   * U (Update): อัปเดตข้อมูลตาม ID
   * @param {number|string} id - ID ของข้อมูลที่ต้องการอัปเดต
   * @param {object} payload - ข้อมูลที่จะส่งไปอัปเดต
   * @returns {Promise<object>} ข้อมูลที่ถูกอัปเดต
   */
  const updateItem = async (id, payload) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.put(`${baseUrl}/${id}`, payload);
      
      // อัปเดตรายการใน data.value ถ้ามี (ตัวอย่างการอัปเดตแบบง่าย)
      if (data.value && Array.isArray(data.value)) {
          const index = data.value.findIndex(item => item.id === id);
          if (index !== -1) {
              data.value[index] = response.data;
          }
      }
      return response.data;
    } catch (err) {
      error.value = err.message || 'Error updating item.';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  /**
   * D (Delete): ลบข้อมูลตาม ID
   * @param {number|string} id - ID ของข้อมูลที่ต้องการลบ
   */
  const deleteItem = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      await axios.delete(`${baseUrl}/${id}`);
      
      // ลบรายการออกจาก data.value ถ้ามี
      if (data.value && Array.isArray(data.value)) {
          data.value = data.value.filter(item => item.id !== id);
      }
    } catch (err) {
      error.value = err.message || 'Error deleting item.';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // ส่งคืนสถานะและฟังก์ชันทั้งหมด
  return {
    data,
    loading,
    error,
    createItem,
    fetchAll,
    updateItem,
    deleteItem,
  };
}
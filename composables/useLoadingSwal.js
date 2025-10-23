import Swal from 'sweetalert2'; 
export function useLoadingSwal() {

  /**
   * เปิด SweetAlert2 Loading Popup
   * @param {string} title - หัวข้อที่ต้องการแสดง
   * @param {string} html - ข้อความย่อย (Optional)
   */
  const showLoading = (title = 'กำลังประมวลผล...', html = 'กรุณารอสักครู่') => {
    Swal.fire({
      title: title,
      html: html,
      allowOutsideClick: false, 
      didOpen: () => {
        Swal.showLoading(); 
      },
      showConfirmButton: false, 
      showCancelButton: false   
    });
  };

  /**
   * ปิด SweetAlert2 Loading Popup
   * @returns {Promise}
   */
  const endLoading = () => {
    return Swal.close();
  };

  /**
   * แสดง Popup แจ้งเตือนความสำเร็จ
   * @param {string} title 
   */
  const showSuccess = (title = 'เสร็จสมบูรณ์!') => {
    Swal.fire({
      icon: 'success',
      title: title,
      timer: 2000,
      showConfirmButton: false
    });
  };
  
  /**
   * แสดง Popup แจ้งเตือนข้อผิดพลาด
   * @param {string} title 
   * @param {string} text 
   */
  const showError = (title = 'เกิดข้อผิดพลาด', text = 'ไม่สามารถดำเนินการได้') => {
    Swal.fire({
      icon: 'error',
      title: title,
      text: text,
      confirmButtonText: 'ตกลง'
    });
  };

  return { 
    showLoading, 
    endLoading, 
    showSuccess,
    showError
  };
}
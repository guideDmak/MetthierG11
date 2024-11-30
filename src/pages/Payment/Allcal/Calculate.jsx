export function calculateFee(seconds) {
    const MINUTE_SECONDS = 60;
    const HOUR_SECONDS = 60 * MINUTE_SECONDS;
  
    const totalHours = Math.floor(seconds / HOUR_SECONDS);
    const remainingSeconds = seconds % HOUR_SECONDS;
  
    let fee = 0;
  
    if (totalHours === 0 && remainingSeconds > 0) {
      fee = 10; // หากเวลาไม่ถึงชั่วโมง ค่าบริการคือ 10 บาท
    } else {
      fee = 30; // ชั่วโมงแรก 30 บาท
      if (totalHours > 1) {
        fee += (totalHours - 1) * 20; // ชั่วโมงถัดไป ชั่วโมงละ 20 บาท
      }
      if (remainingSeconds > 0) {
        fee += 20; //เวลาเหลือไม่ถึงชั่วโมงคิดเพิ่ม 20 บาท
      }
    }
  
    return fee;
  }
  
  export function calculateDiscount(fee) {
    if (fee > 100) {
      return fee * 0.1; // ส่วนลด 10%
    }
    return 0;
  }
  
  // คำนวณยอดรวมค่าบริการสุทธิ
  export function calculateTotal(fee, discount) {
    return fee - discount; // ส่วนลด
  }
  
  // คํานวณเวลา
  export function secondsToString(seconds) {
    const MINUTE_SECONDS = 60;
    const HOUR_SECONDS = 60 * MINUTE_SECONDS;
    const DAY_SECONDS = 24 * HOUR_SECONDS;
  
    // const days = Math.floor(seconds / DAY_SECONDS); /*ปัดทศนิยมลง */
    const hours = Math.floor((seconds % DAY_SECONDS) / HOUR_SECONDS);
    const minute = Math.floor((seconds % HOUR_SECONDS) / MINUTE_SECONDS);
    const secs = seconds % MINUTE_SECONDS;
  
    if (hours > 0) {
      return `${hours}h ${minute}m ${secs}s`;
    } else if (minute > 0) {
      return `${minute}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  }
  
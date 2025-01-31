export const formatDateRange = (dateString: string) => {
    // แยกวันที่และช่วงเวลา
    const [datePart, timeRange] = dateString.split(" ");

    // แยกเวลาเริ่มและเวลาสิ้นสุด
    const [startTime, endTime] = timeRange.split("-");

    // สร้าง Date object สำหรับเวลาเริ่มต้น เพื่อใช้ format วัน
    const validDateString = `${datePart}T${startTime}:00`;
    const date = new Date(validDateString);

    // แปลงวันที่เป็นรูปแบบภาษาไทย
    const formattedDate = date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // คืนค่าในรูปแบบที่ต้องการ
    return `${formattedDate} ${startTime} - ${endTime} น.`;
  };
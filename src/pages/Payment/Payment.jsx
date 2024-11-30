import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  calculateFee,
  calculateDiscount,
  calculateTotal,
} from "./Allcal/Calculate";

import "./Payment.css";
import Button from "react-bootstrap/Button";

function Payment() {
  const navigate = useNavigate();

  const [running] = useState(true);
  const [seconds, setSeconds] = useState(1 * 60);

  useEffect(() => {
    let interval = null;
    if (running) {
      interval = setInterval(() => {
        setSeconds(seconds + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [running, seconds]);

  function secondsToString(seconds) {
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

  const fee = calculateFee(seconds); // ค่าบริการ
  const discount = calculateDiscount(fee); // ส่วนลด
  const total = calculateTotal(fee, discount); // ยอดรวม

  return (
    <div>
      {/* <div className='container'>
            <div className="payhead">
                <h4>การชำระเงิน</h4>
            </div></div> */}
      <div className="Payment-container">
        <div className="table-container">
          <table className="loca-table">
            {/* ระบุ อาคาร ลานจอด */}
            <thead>
              <tr>
                <th align="center" colSpan={3}>
                  อาคาร A
                </th>
                <th align="center">ลานจอด A</th>
              </tr>
            </thead>
          </table>

          <table className="payment-table">
            {/* รายละเอียดการจอด และปุ่มส้ม */}
            <tbody className="table-body">
              <tr>
                <td align="center">
                  ค่าบริการ <br /> <p id="engsize">Parking Fee</p>
                </td>
                <td align="center">:</td>
                <td align="center">{fee} บาท</td>
              </tr>
              <tr>
                <td align="center">
                  ส่วนลด <br /> <p id="engsize">Discount</p>
                </td>
                <td align="center">:</td>
                <td align="center">{discount.toFixed(2)} บาท</td>
              </tr>
              <tr bgcolor="#473366">
                <td align="center" id="total-A">
                  ยอดชำระ <br /> <p id="engsize">Total Amount</p>
                </td>
                <td align="center" id="total-A">
                  :
                </td>
                <td align="center" id="total-A">
                  {total.toFixed(2)} บาท
                </td>
              </tr>
              <tr>
                <td colSpan={2} align="center" id="btgrey">
                  เลขที่บัตร
                </td>
                <td align="center" id="btgrey">
                  11234
                </td>
              </tr>
              <tr>
                <td colSpan={2} align="center" id="btgrey">
                  วันที่/เวลาเข้า
                </td>
                <td align="center" id="btgrey">
                  11/06/2024
                </td>
              </tr>
              <tr>
                <td colSpan={2} align="center" id="btgrey">
                  วันที่/เวลาปัจจุบัน
                </td>
                <td align="center" id="btgrey">
                  11/06/2024
                </td>
              </tr>
              <tr>
                <td colSpan={2} align="center" id="btgrey">
                  เวลาที่ใช้
                </td>
                <td align="center" id="btgrey">
                  {secondsToString(seconds)}
                </td>
              </tr>
              <tr>
                <td colSpan={2} align="center" id="btgrey">
                  สิทธิ์ส่วนลด
                </td>
                <td align="center" id="btgrey">
                  ตลอดวัน
                </td>
              </tr>
            </tbody>
            <tfoot className="table-foot">
              <tr>
                <td colSpan={3} align="center" id="coverfoot">
                  <Button
                    variant="warning"
                    className="bbbtttnnn"
                    onClick={() =>
                      navigate("/showqr", {
                        state: { total }, // ส่งข้อมูลไปยังหน้า QR
                      })
                    }
                  >
                    ดำเนินการชำระเงิน
                  </Button>
                </td>
              </tr>
            </tfoot>
          </table>
          <Button
            variant="outline-danger"
            onClick={() =>
              navigate("/unsucc", {
                state: { total }, // ส่งข้อมูลไปยังหน้า
              })
            }
          ></Button>
        </div>
      </div>
    </div>
  );
}

export default Payment;

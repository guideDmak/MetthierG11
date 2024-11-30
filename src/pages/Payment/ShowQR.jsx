import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Qrs from '../../assets/Payment/QRFM.jpg';

import "./ShowQR.css";
import Button from "react-bootstrap/Button";

function ShowQR() {
  const navigate = useNavigate();
  const location = useLocation();
  const { total } = location.state || {}; // รับค่าที่ส่งมาจากหน้า Payment

  return (
    <div className="container">
      <div className="showqr-container">
        <table className="showqr-table">
          <thead>
            <tr>
              <th className="Qrshow" colSpan={2}>
                <img src={Qrs} alt="QRcode" />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="totaltotaltotal" colSpan={2}>
                {total.toFixed(2)} บาท
              </td>
            </tr>
            <tr>
              <td align="center">ทะเบียน</td>
              <td align="center">กก1234</td>
            </tr>
            <tr>
              <td align="center">เลขอ้างอิง</td>
              <td align="center">1234567</td>
            </tr>
            <tr>
              <td align="center">เวลา</td>
              <td align="center">11:24</td>
            </tr>
            <tr>
              <td className="download" align="right">
                ดาวน์โหลด
              </td>
              <td align="left" className="download">
                <a href="src/assets/Payment/QRFM.jpg" download="QRFM.jpg">
                  <i
                    className="bi bi-download"
                    style={{ cursor: "pointer", fontSize: "1.5rem" }}
                  ></i>
                </a>
              </td>
              {/* <td className="download" align="right">ดาวน์โหลด</td>
              <td align="left" className="download"><i className="bi bi-download"></i></td> */}
            </tr>
          </tbody>
          {/* button */}
          <tfoot className="table-foot">
            <tr>
              <td colSpan={3} align="center" id="coverfoot">
                <Button
                  variant="warning"
                  className="bbbtttnnn"
                  onClick={() => navigate("/succ", { state: { total } })}
                >
                  ดำเนินการชำระเงิน
                </Button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default ShowQR;

import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import "./Succ.css";
import Button from "react-bootstrap/Button";

function Succ() {
  const navigate = useNavigate();
  const location = useLocation();
  const { total = 0 } = location.state || {};

return (
  <div className="container" style={{ marginTop: "100px" }}>
      <div className="succ-container">
        <div className="success-message">
          <i className="bi bi-check-circle-fill"></i>
          <h2>ชำระเงินเสร็จสิ้น</h2>
        </div>
        <table className="showcheck-table">
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
            </tr>
          </tbody>
          <tfoot className="table-foot">
            <tr>
              <td colSpan={2} align="center">
                <Button
                  variant="warning"
                  className="bbbtttnnn"
                  onClick={() => navigate("/home")}
                >
                  กลับสู่หน้าหลัก
                </Button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
);

}

export default Succ;

import './forget.css';
import react from 'react';
import BottomImage from "../../assets/bottom.png";
import { useNavigate } from "react-router-dom"; // ใช้ useNavigate
import MetthierLogo from "../../assets/Metthier Master Logo.png";

function Forget() {
    const navigate = useNavigate(); // เรียกใช้ useNavigate

    const handleGoToLogin = () => {
      navigate("/"); 
    };
    return (           
        <div className="body" >
          <center>
        <div className="register-container">
          <div className="logo">
          <img
            className="Metthier-logo"
            src={MetthierLogo}
            alt="Metthier Logo"
            style={{ width: "190px" }}
          />
          </div>
          <form className="register-form">

            <div className="form-group">
              <label htmlFor="phone">เบอร์โทรศัพท์</label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="เบอร์โทรศัพท์"
              />
            </div>

            <button type="submit" className="submit-btn">
              รับ&nbsp;OTP
            </button>
            
            <div className="form-group">
              <label htmlFor="confirm-password" style={{ marginTop: "10px" }}>ยืนยันOTP</label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                placeholder="ยืนยันรหัสผ่าน"
              />
            </div>
            <button type="submit" className="submit-btn" >
              ยืนยัน&nbsp;OTP
            </button>
  
            {/* ปุ่มเข้าสู่ระบบ */}
            <button
              type="button"
              className='link-text'
              onClick={handleGoToLogin} 
            >
              กลับไปเข้าสู่ระบบ
            </button>
          </form>
        </div>
        <div className="Bottom-space">
          <img
            className="Line-Logo"
            src={BottomImage}
            alt="Bottom logo"
            style={{ width: "100%",marginTop: "200px" }}
          />
        </div>
        </center>
      </div>
    );
  }

export default Forget;
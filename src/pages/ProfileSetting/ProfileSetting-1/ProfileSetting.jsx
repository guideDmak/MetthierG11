import React from "react";
import "./ProfileSetting.css";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../../data/UserContext";

function ProfileSetting({ onLogout, currentUser }) {
  const navigate = useNavigate();
  const { logout, user } = useUserContext();
  
  // Use context user data if available, otherwise use passed props
  const userData = user || currentUser;

  const handleLogout = () => {
    // Call the logout function from context
    logout();
    
    // Call the onLogout prop function
    onLogout();
    
    // Navigate to login page
    navigate('/');
  };

  return (
    <div className="container d-flex flex-column align-items-center">
      <div className="space-br"></div>

      <h3 className="section-title">ตั้งค่าบัญชี</h3>

      <div className="settings-container">
        <Link to="/editprofile" className="setting-item">
          <div className="setting-icon">
            <i className="bi bi-person-fill"></i>
          </div>
          <div className="setting-text">
            <h5>แก้ไขข้อมูลส่วนตัว</h5>
            <p>แก้ไขชื่อหรือข้อมูลส่วนตัวของคุณ</p>
          </div>
          <div className="setting-arrow">
            <i className="bi bi-chevron-right"></i>
          </div>
        </Link>

        <Link to="/editpassword" className="setting-item">
          <div className="setting-icon">
            <i className="bi bi-shield-lock-fill"></i>
          </div>
          <div className="setting-text">
            <h5>เปลี่ยนรหัสผ่าน</h5>
            <p>เปลี่ยนรหัสผ่านของคุณ</p>
          </div>
          <div className="setting-arrow">
            <i className="bi bi-chevron-right"></i>
          </div>
        </Link>

        <Link to="/changecar" className="setting-item">
          <div className="setting-icon">
            <i className="bi bi-car-front-fill"></i>
          </div>
          <div className="setting-text">
            <h5>เปลี่ยนแปลงข้อมูลรถ</h5>
            <p>เพิ่มหรือแก้ไขข้อมูลรถของคุณ</p>
          </div>
          <div className="setting-arrow">
            <i className="bi bi-chevron-right"></i>
          </div>
        </Link>

        <div className="setting-item" onClick={handleLogout}>
          <div className="setting-icon logout-icon">
            <i className="bi bi-box-arrow-right"></i>
          </div>
          <div className="setting-text">
            <h5 className="logout-text">ออกจากระบบ</h5>
            <p>ออกจากบัญชีของคุณ</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSetting;
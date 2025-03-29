import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
import MetthierLogo from "../../assets/Metthier Master Logo.png";
import { useUserContext } from "../../data/UserContext";
import BottomImage from "../../assets/bottom.png";

function Register() {
  const { register, error } = useUserContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState("");

  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    first_name: "",
    last_name: "",
    phone_number: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    
    const { username, password, confirmPassword, first_name, last_name, phone_number } = form;

    // ตรวจสอบความถูกต้องของข้อมูล
    if (password !== confirmPassword) {
      setLocalError("รหัสผ่านไม่ตรงกัน");
      return;
    }

    // ตรวจสอบข้อมูลที่จำเป็น
    if (!username || !password || !first_name || !last_name || !phone_number) {
      setLocalError("กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await register({
        username,
        password,
        first_name,
        last_name,
        phone_number
      });
      
      if (result) {
        alert("ลงทะเบียนสำเร็จ กรุณาเข้าสู่ระบบ");
        navigate("/"); // ย้อนกลับไปหน้าล็อกอิน
      }
    } catch (err) {
      console.error("Registration error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="body">
      <center>
      <div className="register-container">
        <div className="Logo">
          <img
            src={MetthierLogo}
            alt="Metthier logo"
            className="Metthier logo"
            style={{ width: "190px" }}
          />
        </div>
        
        {(localError || error) && (
          <div className="error-message">
            {localError || error}
          </div>
        )}
        
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">ชื่อผู้ใช้งาน</label>
            <input
              type="text"
              id="username"
              className="register-input-naja"
              name="username"
              placeholder="ชื่อผู้ใช้งาน"
              value={form.username}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="first_name">ชื่อ</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              placeholder="ชื่อ"
              value={form.first_name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="last_name">นามสกุล</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              placeholder="นามสกุล"
              value={form.last_name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone_number">เบอร์โทรศัพท์</label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              placeholder="เบอร์โทรศัพท์"
              value={form.phone_number}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">รหัสผ่าน</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="รหัสผ่าน"
              value={form.password}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">ยืนยันรหัสผ่าน</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="ยืนยันรหัสผ่าน"
              value={form.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? "กำลังดำเนินการ..." : "ลงทะเบียน"}
          </button>

          {/* ปุ่มเข้าสู่ระบบ */}
          <button
            type="button"
            className="link-text"
            onClick={() => navigate("/")}
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
          style={{ width: "100%" }}
        />
      </div>
      </center>
    </div>
  );
}

export default Register;
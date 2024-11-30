import React,{ useState } from "react";
import { useNavigate } from "react-router-dom"; // ใช้ useNavigate
import "./register.css";
import MetthierLogo from "../../assets/Metthier Master Logo.png";
import { useUserContext } from "../../data/UserContext";
import BottomImage from "../../assets/bottom.png";
import { useUserData } from "../../data/users";

function Register() {
  const { addUser, users } = useUserContext();
  const navigate = useNavigate(); // เรียกใช้ useNavigate

  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "Member",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password, confirmPassword, phone, role } = form;

    // ตรวจสอบความถูกต้องของข้อมูล
    if (password !== confirmPassword) {
      setError("รหัสผ่านไม่ตรงกัน");
      return;
    }
    if (users.some(user => user.username === username)) {
      setError("ชื่อผู้ใช้งานนี้ถูกใช้แล้ว");
      return;
    }

    // เพิ่มผู้ใช้ใหม่
    addUser({
      id: users.length + 1,
      username,
      password,
      phone,
      role,
    });

    navigate("/"); // ย้อนกลับไปหน้าล็อกอิน
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
            />
          </div>
          <div className="form-group">
            <label>ฐานะ</label>

            
            <div className="form-radio-group">
              <center></center>
              <label>
                <input type="radio" name="role" value="Member"
                checked={form.role === "Member"}
                onChange={handleInputChange}/>
                Member
              </label>
              <label>
                <input type="radio" name="role" value="Visitor" 
                  checked={form.role === "Visitor"}
                  onChange={handleInputChange}
                />
                Visitor
              </label>
            </div>


          </div>
          <div className="form-group">
            <label htmlFor="phone">เบอร์โทรศัพท์</label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="เบอร์โทรศัพท์"
              value={form.phone}
              onChange={handleInputChange}
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
            />
          </div>
          <button type="submit" className="submit-btn">
            ลงทะเบียน
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
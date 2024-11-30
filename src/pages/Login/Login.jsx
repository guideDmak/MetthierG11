import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../data/UserContext"; // ใช้ Context API
import "./Login.css";
import { useUserData } from "../../data/users";

import MetthierLogo from "../../assets/Metthier Master Logo.png";
import LineLogo from "../../assets/Line Logo.png";
import BottomImage from "../../assets/bottom.png";

function Login({ onLogin }) {
 // ดึงฟังก์ชัน verifyUser จาก context
  const [userInput, setUserInput] = useState("Saksom");
  const [password, setPassword] = useState("12345");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { verifyUser } = useUserContext();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = verifyUser(userInput, password);
    if (user) {
      onLogin(user); // บันทึกข้อมูลผู้ใช้
      navigate("/home"); // ไปยังหน้า home
    } else {
      setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <div className="Login-container">
      <div className="Login-space"></div>
      <center>
        <img
          className="Metthier-logo"
          src={MetthierLogo}
          alt="Metthier Logo"
          style={{ width: "190px", marginTop: "10px" }}
        />
      </center>
      {error && <p className="error-message">{error}</p>}

      <Form onSubmit={handleLogin}>
        <Form.Group className="form-group" controlId="userOrPhone">
          <Form.Label className="form-label">ชื่อบัญชีผู้ใช้ หรือ เบอร์โทรศัพท์</Form.Label>
          <Form.Control
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="form-group" controlId="password">
          <Form.Label className="form-label">รหัสผ่าน</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <div className="links-container">
          <Link to="/register">
            <button type="submit" className="link-text">ลงทะเบียน</button>
          </Link>
          <Link to="/forget">
            <button type="submit" className="link-text">ลืมรหัสผ่าน</button>
          </Link>
        </div>

        <button type="submit" className="login-button">
          เข้าสู่ระบบ
        </button>

        <div className="separator">เข้าสู่ระบบด้วยวิธีอื่น</div>

        <center>
          <button className="line-button">
            <img
              className="Line-Logo"
              src={LineLogo}
              alt="Line logo"
              style={{ width: "40px", paddingRight: "5px" }}
            />
            เข้าสู่ระบบด้วย Line
          </button>
        </center>
      </Form>

      <div className="Bottom-space">
        <img className="Line-Logo" src={BottomImage} alt="Bottom logo" style={{ width: "100%", marginTop: "5rem"}} />
      </div>
    </div>
  );
}

export default Login;
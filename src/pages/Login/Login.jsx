import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../data/UserContext"; // ใช้ Context API
import "./Login.css";

import MetthierLogo from "../../assets/Metthier Master Logo.png";
import LineLogo from "../../assets/Line Logo.png";
import BottomImage from "../../assets/bottom.png";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { login, error } = useUserContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const user = await login(username, password);
      
      if (user) {
        onLogin(user); // บันทึกข้อมูลผู้ใช้
        navigate("/home"); // ไปยังหน้า home
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
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
          <Form.Label className="form-label">ชื่อบัญชีผู้ใช้</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="form-group" controlId="password">
          <Form.Label className="form-label">รหัสผ่าน</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <div className="links-container">
          <Link to="/register">
            <button type="button" className="link-text">ลงทะเบียน</button>
          </Link>
          <Link to="/forget">
            <button type="button" className="link-text">ลืมรหัสผ่าน</button>
          </Link>
        </div>

        <button type="submit" className="login-button" disabled={isLoading}>
          {isLoading ? "กำลังดำเนินการ..." : "เข้าสู่ระบบ"}
        </button>

        <div className="separator">เข้าสู่ระบบด้วยวิธีอื่น</div>

        <center>
          <button type="button" className="line-button">
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
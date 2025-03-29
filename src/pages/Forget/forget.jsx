import React, { useState } from 'react';
import './forget.css';
import { useNavigate } from "react-router-dom";
import MetthierLogo from "../../assets/Metthier Master Logo.png";
import BottomImage from "../../assets/bottom.png";
import { useUserContext } from "../../data/UserContext";

function Forget() {
    const navigate = useNavigate();
    const { requestPasswordReset, verifyOTP, resetPassword, error } = useUserContext();
    
    const [phone_number, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [resetToken, setResetToken] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [localError, setLocalError] = useState("");
    const [step, setStep] = useState(1); // 1: รับเบอร์โทร, 2: ยืนยัน OTP, 3: ตั้งรหัสผ่านใหม่

    const [receivedOtp, setReceivedOtp] = useState('');
    
    const handleRequestOTP = async (e) => {
      e.preventDefault();
      if (!phone_number) {
        setLocalError("กรุณากรอกเบอร์โทรศัพท์");
        return;
      }

      setIsLoading(true);
      setLocalError("");
      
      try {
        const result = await requestPasswordReset(phone_number);
        console.log("OTP Request Response:", result); // แสดงค่าในคอนโซลเพื่อดูโครงสร้างข้อมูล
        
        if (result && result.reset_token) {
          setResetToken(result.reset_token);
          
          // เก็บค่า OTP จาก API response
          if (result.otp) {
            setReceivedOtp(result.otp.toString());
            console.log("Received OTP:", result.otp);
          }
          
          setStep(2); // ไปขั้นตอนยืนยัน OTP
        }
      } catch (err) {
        console.error("Password reset request error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    const handleVerifyOTP = async (e) => {
      e.preventDefault();
      if (!otp) {
        setLocalError("กรุณากรอกรหัส OTP");
        return;
      }

      setIsLoading(true);
      setLocalError("");
      
      try {
        const result = await verifyOTP(resetToken, otp);
        if (result && result.can_reset_password) {
          setStep(3); // ไปขั้นตอนตั้งรหัสผ่านใหม่
        }
      } catch (err) {
        console.error("OTP verification error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    const handleResetPassword = async (e) => {
      e.preventDefault();
      
      if (!newPassword || !confirmPassword) {
        setLocalError("กรุณากรอกรหัสผ่านให้ครบ");
        return;
      }
      
      if (newPassword !== confirmPassword) {
        setLocalError("รหัสผ่านไม่ตรงกัน");
        return;
      }

      setIsLoading(true);
      setLocalError("");
      
      try {
        const result = await resetPassword(resetToken, newPassword);
        if (result) {
          alert("รีเซ็ตรหัสผ่านสำเร็จ กรุณาเข้าสู่ระบบ");
          navigate("/");
        }
      } catch (err) {
        console.error("Password reset error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    const handleGoToLogin = () => {
      navigate("/"); 
    };

    return (           
        <div className="body">
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
              
              {(localError || error) && (
                <div className="error-message">
                  {localError || error}
                </div>
              )}
              
              {step === 1 && (
                <form className="register-form" onSubmit={handleRequestOTP}>
                  <div className="form-group">
                    <label htmlFor="phone_number">เบอร์โทรศัพท์</label>
                    <input
                      type="text"
                      id="phone_number"
                      name="phone_number"
                      placeholder="เบอร์โทรศัพท์"
                      value={phone_number}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className="submit-btn" disabled={isLoading}>
                    {isLoading ? "กำลังดำเนินการ..." : "รับ OTP"}
                  </button>
                  
                  <button
                    type="button"
                    className='link-text'
                    onClick={handleGoToLogin} 
                  >
                    กลับไปเข้าสู่ระบบ
                  </button>
                </form>
              )}
              
              {step === 2 && (
                <form className="register-form" onSubmit={handleVerifyOTP}>
                  {receivedOtp && (
                    <div style={{ 
                      marginBottom: "20px", 
                      padding: "15px", 
                      backgroundColor: "#d1ecf1", 
                      color: "#0c5460", 
                      borderRadius: "5px", 
                      textAlign: "center",
                      border: "1px solid #bee5eb"
                    }}>
                      <strong>รหัส OTP ของคุณคือ:</strong>
                      <div style={{ 
                        fontSize: "24px", 
                        fontWeight: "bold", 
                        margin: "10px 0", 
                        letterSpacing: "3px",
                        color: "#0056b3"
                      }}>
                        {receivedOtp}
                      </div>
                      <div style={{ fontSize: "12px", marginTop: "5px" }}>
                        (รหัสนี้แสดงเฉพาะในโหมดทดสอบเท่านั้น)
                      </div>
                    </div>
                  )}
                  
                  <div className="form-group">
                    <label htmlFor="otp">ยืนยัน OTP</label>
                    <input
                      type="text"
                      id="otp"
                      name="otp"
                      placeholder="กรอกรหัส OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                  </div>
                  
                  <button type="submit" className="submit-btn" disabled={isLoading}>
                    {isLoading ? "กำลังดำเนินการ..." : "ยืนยัน OTP"}
                  </button>
                  
                  <button
                    type="button"
                    className='link-text'
                    onClick={() => setStep(1)} 
                  >
                    ย้อนกลับ
                  </button>
                </form>
              )}
              
              {step === 3 && (
                <form className="register-form" onSubmit={handleResetPassword}>
                  <div className="form-group">
                    <label htmlFor="new-password">รหัสผ่านใหม่</label>
                    <input
                      type="password"
                      id="new-password"
                      name="new-password"
                      placeholder="รหัสผ่านใหม่"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="confirm-password">ยืนยันรหัสผ่านใหม่</label>
                    <input
                      type="password"
                      id="confirm-password"
                      name="confirm-password"
                      placeholder="ยืนยันรหัสผ่านใหม่"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <button type="submit" className="submit-btn" disabled={isLoading}>
                    {isLoading ? "กำลังดำเนินการ..." : "บันทึกรหัสผ่านใหม่"}
                  </button>
                </form>
              )}
            </div>
            
            <div className="Bottom-space">
              <img
                className="Line-Logo"
                src={BottomImage}
                alt="Bottom logo"
                style={{ width: "100%", marginTop: "200px" }}
              />
            </div>
          </center>
        </div>
    );
}

export default Forget;
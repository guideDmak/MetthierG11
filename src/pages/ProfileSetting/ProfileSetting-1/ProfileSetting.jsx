
import "./ProfileSetting.css";
import { useNavigate } from 'react-router-dom';
import Logo from "../metthierLOGO.png";
import { Link } from "react-router-dom";
import imgMal from '../../../assets/ProfilePicture/man.jpg'
import imgGal from '../../../assets/ProfilePicture/girl.jpg'

function Profile({onLogout, currentUser}) {
  const navigate = useNavigate();

  const ProfileEditClick = () => {
    navigate('/EditProfile'); // เปลี่ยนเส้นทางไปหน้า EditProfile
  };
  const handleLogout = () => {
    onLogout(); // รีเซ็ตสถานะผู้ใช้
    navigate("/"); // กลับไปที่หน้าล็อกอิน
  };

  const isVisitor = currentUser?.role === "Visitor";

  return (
    <>
      <img alt="Logo" style={{maxWidth:"50%", height:"auto",marginBottom:"7rem"}}/>
      <div style={{display:"flex", justifyContent:"center", alignItems:"center",color:"rgba(71, 51, 102, 1)"}}><p style={{fontSize:"20px"}}>โปรไฟล์</p></div>
      <div className="App">
      <center >
        <div className="member" >{currentUser?.role || "ไม่ระบุ"}</div>
        <div className="Big-container">
 
          <div className="container-Profile">

            <div className="img-Profile-1">
              {!isVisitor && (
                <div>
                  <img className="Img-Real" 
                  src={imgMal} alt="Profile image" />
                </div>
              )}
              {isVisitor && (
                <div>
                  <img className="Img-Real" 
                  src={imgGal} alt="Profile image" />
                </div>
              )}
            </div>

            <p>
              <span style={{color:"rgba(71, 51, 102, 1)", fontSize:"15px"}}>ชื่อ : </span>
              <span style={{color:"rgba(253, 110, 43, 1)", fontSize:"15px"}}>{currentUser?.name || "ไม่ระบุ"}</span>
            </p>
            <p>
              <span style={{color:"rgba(71, 51, 102, 1)", fontSize:"15px"}}>เบอร์โทรศัพท์ : </span>
              <span style={{color:"rgba(253, 110, 43, 1)", fontSize:"15px"}}>{currentUser?.phone || "ไม่ระบุ"}</span>
            </p>
              {currentUser?.role === "Member" && (
            <p>
              <span style={{color:"rgba(71, 51, 102, 1)", fontSize:"15px"}}>เลขที่บัตร : </span>
              <span style={{color:"rgba(253, 110, 43, 1)", fontSize:"15px"}}>{currentUser?.memberID || "12345"}</span>
            </p>
              )}
            <p>
              <span style={{color:"rgba(71, 51, 102, 1)", fontSize:"15px"}}>หมายเลขทะเบียนรถ : </span>
              <span style={{color:"rgba(253, 110, 43, 1)", fontSize:"15px"}}>{currentUser?.license || "ไม่ระบุ"}</span>
            </p>
            <Link to={'/EditProfile'}>
              <button 
              onClick={ProfileEditClick} 
              style={{marginBottom:"10px", color:"rgba(71, 51, 102, 1)", backgroundColor:"white", border:"none", borderRadius:'5px', width:"52px", height:"26px", boxShadow:"0px 1px 2px rgba(0, 0, 0, 0.25)"}}>
                Edit
              </button>
            </Link>
          </div>

          <Link to={'/ChangeCar'}>
            <button className="large-button">เปลี่ยนรถ</button>
          </Link>
          <br />
          <Link to={'/EditPassword'}>
            <button className="large-button">เปลี่ยนรหัสผ่าน</button>
          </Link>
          <br />
          <button className="large-button" 
          style={{marginBottom:"10px",}} 
          onClick={handleLogout}>Log out</button>
        </div>
        </center>
      </div>
    </>
  );
}

export default Profile;

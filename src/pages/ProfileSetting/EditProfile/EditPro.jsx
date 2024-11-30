import React from "react";
import "./EditPro.css";
import Logo1 from "../metthierLOGO.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import imgMal from '../../../assets/ProfilePicture/man.jpg'
import imgGal from '../../../assets/ProfilePicture/girl.jpg'

function EditPro({ currentUser }) {
  const navigate = useNavigate();

  const handleSave = () => {
    navigate("/"); // เปลี่ยนไปที่หน้าแรกหลังจากบันทึกข้อมูล
  };

  const isVisitor = currentUser?.role === "Visitor";

  return (
    <><center >
      <img alt="Logo" style={{ maxWidth: "50%", height: "auto", marginBottom: "7rem" }} />
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "rgba(71, 51, 102, 1)" }}><p style={{ fontSize: "20px" }}>แก้ไขโปรไฟล์</p></div>
      
      <div className="Can-go-back">
        <Link to={"/profilesetting"}><button className="go-back" style={{ color: "White", }}> ย้อนกลับ </button></Link>
      </div>
      
      <div className="Big-edit-profile-container">
        <div className="edit-profile-container">
          <div className="img-Profile-2" >
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
          </div >
          <form style={{ textAlign: "center" }}>
            <label>
              <p>ชื่อ:</p>
              <input type="text" name="name" defaultValue="" />
            </label>
            <br />
            <label>
              <p>เบอร์โทรศัพท์:</p>
              <input type="text" name="phone" />
            </label>
            <br />

            {currentUser?.role === "Member" && (
              <label>
                <p>เลขที่บัตร:</p>
                <input type="text" name="idNumber" />

              </label>

            )}


            <label>
              <p>หมายเลขทะเบียนรถ:</p>
              <input style={{ marginBottom: "20px" }} type="text" name="carNumber" />
            </label>
            <br />
            <Link to={"/profilesetting"}><button type="submit" style={{ width: "60%", marginBottom: "125px" }}>บันทึกการเปลี่ยนแปลง</button></Link>
          </form>
        </div>
      </div>
      </center>
    </>
  );
}

export default EditPro;

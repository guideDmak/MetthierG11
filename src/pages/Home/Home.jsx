import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { useUserContext } from "../../data/UserContext";

import imgMal from '../../assets/ProfilePicture/man.jpg'
import imgGal from '../../assets/ProfilePicture/girl.jpg'
import CarGirl from '../../assets/history/car1.png'

function Home({ currentUser }) {
  const { user } = useUserContext();
  const [latestAppointment, setLatestAppointment] = useState(null);
  
  // Use context user data if available, otherwise use passed props
  const userData = user || currentUser;

  useEffect(() => {
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    if (appointments.length > 0) {
      setLatestAppointment(appointments[appointments.length - 1]); // ดึงนัดหมายล่าสุด
    }
  }, []);

  // Check if user is a member (role_id = 1)
  const isMember = userData?.role_id === 1;

  return (
    <div className="container d-flex flex-column align-items-center">
      <div className="space-br"></div>

      {/* Profile Section */}
      <h3 className="section-title">โปรไฟล์</h3>
      <div className="profile-container mt-4">
        <div>
          <img
            src={isMember ? imgMal : imgGal}
            alt="Profile image"
            style={{ width: "130px", height: "160px", objectFit:"cover" }}
          />
        </div>
        
        <div className="profile-info" style={{ position: "relative" }}>
          <div className="userstatus-Big">
            <div className='userstatus1' align='center'>
              <b>{isMember ? "Member" : "Visitor"}</b>
            </div>
          </div>
          <br />
          <div className="infostatus">
            <p>
              ชื่อ: <span>{userData?.first_name || "ไม่ระบุ"}</span>
            </p>
            <p>
              นามสกุล: <span>{userData?.last_name || "ไม่ระบุ"}</span>
            </p>
            <p>
              เบอร์โทรศัพท์: <span>{userData?.phone_number || "ไม่ระบุ"}</span>
            </p>
            <p>
              หมายเลขทะเบียน: <span>{userData?.license || "ไม่ระบุ"}</span>
            </p>

            {/* Member ID (Visitor ไม่มี) */}
            {isMember && (
              <p>
                หมายเลขบัตร: <span>{userData?.id || "ไม่ระบุ"}</span>
              </p>
            )}
          </div>

          <Link to="/editprofile">
            <i
              className="bi bi-pencil-square"
              style={{
                fontSize: "23px",
                color: "#f47b20",
                float: "right",
              }}
            ></i>
          </Link>
        </div>
      </div>

      {/* Parking Status */}
      <h3 className="section-title">สถานะการจอด</h3>

      <div className="profile-container mt-4">
        <div>
          <img
            src={CarGirl}
            alt="Car Image"
            style={{ width: "150px", height: "100px" }}
          />
          <div className="tabeinrot" align='center'>
            <p><span>{userData?.license || "ไม่ระบุ"}</span></p>
          </div>
        </div>
        <div className="profile-info">
          <p style={{ fontSize: "30px" }}>
            ลานจอด : <span>A</span>
          </p>
          <p>
            เวลาที่จอด: <span>1 ชม 20 น.</span>
          </p>
          <p>
            วันที่จอด: <span>17 พ.ย. 67</span>
          </p>

          {/* Payment (Member cannot use) */}
          {!isMember && (
            <>
              <Link to={"/payment"}>
                <button className="btn-custom-warning w-100% mt-2">ชำระเงิน</button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Appointment Details */}
      <h3 className="section-title">รายการนัดหมาย</h3>
      <div className="appointment-details">
        {latestAppointment ? (
          <>
            <p>ชื่อ: <span>{latestAppointment.name}</span></p>
            <p>หมายเลขทะเบียน: <span>{latestAppointment.carNumber}</span></p>
            <p>วันที่นัดหมาย: <span>{latestAppointment.date}</span></p>
          </>
        ) : (
          <p style={{ textAlign: "center" }}>ไม่มีข้อมูลการนัดหมาย</p>
        )}

        {/* Appointment (Member only) */}
        {isMember && (
          <>
            <Link to={"/historyapm"}>
              <button className="btn-custom-warning w-100 mt-2">ประวัติการนัดหมาย</button>
            </Link>

            <Link to={"/appointment"}>
              <button className="btn-custom-primary w-100">เพิ่มการนัดหมาย</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
import React from 'react';
import './EditPassword.css';
import Logo2 from "../metthierLOGO.png";
import { Link, useNavigate } from "react-router-dom";

function EditPassword() {
    const navigate = useNavigate();

    const handleSave = () => {
    navigate("/"); // เปลี่ยนไปที่หน้าแรกหลังจากบันทึกข้อมูล
    };
    return (
        <>
            <img  alt="Logo" style={{maxWidth:"50%", height:"auto",marginBottom:"7rem"}}/>
            <div style={{display:"flex", justifyContent:"center", alignItems:"center",color:"rgba(71, 51, 102, 1)"}}><p style={{fontSize:"20px"}}>แก้ไขรหัสผ่าน</p></div>
            <div className='Can-go-back'>
            <Link to={"/profilesetting"}><button className="go-back" style={{color:"White",}}> ย้อนกลับ </button></Link>
            </div>
            <div className='App-Editpass'>
                <div className='Big-container-Editpass'>
                    <div>
                    <form>
                        <label>
                            <p style={{marginTop:"50px"}}>เปลี่ยนเบอร์มือถือ</p>
                            <input type="text" name="name" defaultValue="" />
                        </label>
                        <br />
                        <label>
                            <p>เปลี่ยนรหัสผ่าน</p>
                            <input type="text" name="phone" defaultValue="" />
                        </label>
                        <br />
                        <label>
                            <p>ใส่รหัสผ่านใหม่อีกครั้ง</p>
                            <input style={{marginBottom:"20px"}} type="text" name="name" defaultValue="" />
                        </label>
                        <br />
                        <Link to={"/profilesetting"}><button type="submit" onClick={handleSave}>บันทึกการเปลี่ยนแปลง</button></Link>
                    </form>
                    </div>
                </div>

            </div>
        </>
    );
}

export default EditPassword;
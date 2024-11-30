import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap"; // ใช้ Card จาก react-bootstrap
import './HistoryAPM.css';

const HistoryAPM = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
        setAppointments(storedAppointments);
    }, []);

    const handleClearHistory = () => {
        localStorage.removeItem("appointments");
        setAppointments([]); // ลบประวัติทั้งหมด
    };

    const handleDeleteAppointment = (index) => {
        // ลบการนัดหมายที่เลือก
        const updatedAppointments = appointments.filter((_, i) => i !== index);
        setAppointments(updatedAppointments);
        localStorage.setItem("appointments", JSON.stringify(updatedAppointments)); // อัปเดต localStorage
    };

    return (
        <div className="container mt-5">
            <center>
                <h4 className="nutmai-heeader mb-4">ประวัติการนัดหมาย</h4>
            </center>

            {appointments.length === 0 ? (
                <center><p>ไม่มีประวัติการนัดหมาย</p></center>
            ) : (
                <div className="row">
                    {appointments.map((appointment, index) => (
                        <div className="" key={index}>
                            <Card className="list-nut">
                                <Card.Body>
                                    <div>
                                        <p className="infolanjod">
                                            <strong>ชื่อ :</strong> <span class="saisee">{appointment.name}</span> <br />
                                            <strong>หมายเลขทะเบียนรถ :</strong> <span class="saisee">{appointment.carNumber}</span> <br />
                                            <strong>วันที่นัดหมาย :</strong> <span class="saisee">{appointment.date}</span> <br />
                                            <strong>เหตุผลที่เข้านัดหมาย :</strong> <span class="saisee">{appointment.reason}</span>
                                        </p>
                                    </div>
                                </Card.Body>

                                {/* ไอคอนถังขยะสำหรับลบ */}
                                <Button
                                    variant="danger"
                                    className="deletehis-button position-absolute top-0 end-0 m-2"
                                    onClick={() => handleDeleteAppointment(index)}
                                >
                                    <i className="bi bi-trash"></i> {/* ใช้ไอคอนถังขยะ */}
                                </Button>
                            </Card>
                        </div>
                    ))}
                </div>
            )}

            <center>
                <Button variant="danger" className="delete-all-button mt-3" onClick={handleClearHistory}>
                    ลบประวัติการนัดหมายทั้งหมด
                </Button>
            </center>
            <br />
        </div>
    );
};

export default HistoryAPM;

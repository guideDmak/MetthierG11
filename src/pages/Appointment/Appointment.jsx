import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import './Appointment.css'; // เพิ่มไฟล์ CSS ของคุณ

const Appointment = () => {
  const [formData, setFormData] = useState({
    name: "",
    carNumber: "",
    phone: "",
    reason: "",
    date: "",
  });

  const [showModal, setShowModal] = useState(false); // State สำหรับควบคุม Modal
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    appointments.push(formData);
    localStorage.setItem("appointments", JSON.stringify(appointments));
    setShowModal(true); // เปิด Modal
  };

  const handleModalClose = () => {
    setShowModal(false);
    setFormData({
      name: "",
      carNumber: "",
      phone: "",
      reason: "",
      branch: "ลานจอด A",
      date: "",
    }); // รีเซ็ตฟอร์ม
  };

  return (
    <div className="box-nutmai mt-5">
      <div className="nutmai-heeader mb-4" align="center">
        <h4>นัดหมาย</h4>
      </div>

      <div className="box-nutmaiinput">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              ชื่อ
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="กรอกชื่อ"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="carNumber" className="form-label">
              หมายเลขทะเบียนรถ
            </label>
            <input
              type="text"
              className="form-control"
              id="carNumber"
              placeholder="กรอกหมายเลขทะเบียนรถ"
              value={formData.carNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              เบอร์โทรศัพท์
            </label>
            <input
              type="number"
              className="form-control"
              id="phone"
              placeholder="กรอกเบอร์โทรศัพท์"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="reason" className="form-label">
              เหตุผลที่เข้านัดหมาย
            </label>
            <textarea
              className="form-control"
              id="reason"
              rows="3"
              placeholder="กรอกเหตุผล"
              value={formData.reason}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              วันที่นัดหมาย
            </label>
            <input
              type="date"
              className="form-control"
              id="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div><br />
          <button type="submit" className="btn btn-warning w-100 mb-3" id="oknutmai">
            ยืนยันการนัดหมาย
          </button>
        </form>
        <button
          className="btn btn-secondary w-100"
          id="checknuthis"
          onClick={() => navigate("/historyapm")}
        >
          ตรวจสอบประวัติการนัดหมาย
        </button>
      </div>


      {/* Modal แสดงข้อความยืนยัน */}
      <Modal show={showModal} onHide={handleModalClose} centered className="success-modal">
        <Modal.Header>
          <Modal.Title className="nutsuccess">นัดหมายสำเร็จ</Modal.Title>
        </Modal.Header>
        <Modal.Body className="nutsuccess-message">
          การนัดหมายของคุณถูกบันทึกเรียบร้อยแล้ว
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleModalClose}
            className="nutsuccess-button"
          >
            ปิด
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default Appointment;

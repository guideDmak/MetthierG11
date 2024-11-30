import React, { useState } from "react";
import './ChangeCar.css';
import LoGo from '../metthierLOGO.png';
import { Link, useNavigate } from "react-router-dom";

function ChangeCar() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [cars, setCars] = useState([]); // Store added cars
  const [carDetails, setCarDetails] = useState({ license: "", model: "" });
  const [inUseCars, setInUseCars] = useState([]); // Track cars marked as "in use"

  const handleSave = () => {
    navigate("/");
  };

  const handleShow = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (carDetails.license && carDetails.model) {
      setCars((prevCars) => [...prevCars, { ...carDetails, inUse: false }]); // Add new car to the list with "inUse" property
      setCarDetails({ license: "", model: "" }); // Reset form
      setShowModal(false); // Close modal
    }
  };

  const toggleCarInUse = (index) => {
    const currentlyInUse = inUseCars.length;
    if (cars[index].inUse || currentlyInUse < 1) {
      // Toggle "in use" status
      const updatedCars = cars.map((car, i) =>
        i === index ? { ...car, inUse: !car.inUse } : car
      );
      setCars(updatedCars);

      // Update the list of cars "in use"
      if (cars[index].inUse) {
        setInUseCars((prev) => prev.filter((i) => i !== index));
      } else {
        setInUseCars((prev) => [...prev, index]);
      }
    }
  };

  const handleDeleteCar = (index) => {
    setCars((prevCars) => prevCars.filter((_, i) => i !== index)); // Remove car from the list
    setInUseCars((prev) => prev.filter((i) => i !== index)); // Remove from in-use if deleted
  };

  return (
    <>
      <img  alt="LoGO" style={{ maxWidth: "50%", height: "auto" ,marginBottom:"7rem"}} />
      <div style={{display:"flex", justifyContent:"center", alignItems:"center",color:"rgba(71, 51, 102, 1)"}}><p style={{fontSize:"20px"}}>เปลี่ยนรถ</p></div>
      <div className="Can-go-back">
        <Link to={"/profilesetting"}>
          <button
          className="go-back"
          style={{ color: "White" }}
        >
          ย้อนกลับ
        </button>
        </Link>
      </div>
      <div className="App-ChangeCar">
        <div className="Big-container-ChangeCar">
          <div className="PushCar">
            <button onClick={handleShow} className="AddCar">
              เพิ่มรถ
            </button>
          </div>
          <div className="InCar">
            {cars.length > 0 ? (
              cars.map((car, index) => (
                <div key={index} className="DynamicCarDiv">
                  <div className="toggle-switch">
                    <input
                      type="checkbox"
                      id={`toggle-${index}`}
                      checked={car.inUse}
                      onChange={() => toggleCarInUse(index)}
                    />
                    <label className="slider" htmlFor={`toggle-${index}`}></label>
                  </div>
                  <h3>รถคันที่ {index + 1}</h3>
                  <p>เลขทะเบียน: {car.license}</p>
                  <p>รุ่นรถ: {car.model}</p>
                  <button
                    className="DeleteCarButton"
                    onClick={() => handleDeleteCar(index)}
                  >
                    ลบรถ
                  </button>
                </div>
              ))
            ) : (
              <p>ยังไม่มีข้อมูลรถ</p>
            )}
          </div>
          <Link to={"/profilesetting"}><button type="submit" className="ButtonSave">บันทึก</button></Link>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>เพิ่มรถ</h2>
            <form onSubmit={handleFormSubmit}>
              <label>
                เลขทะเบียนรถ:
                <input
                  type="text"
                  name="license"
                  placeholder="กรอกเลขทะเบียนรถ"
                  value={carDetails.license}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label>
                รุ่นรถ:
                <input
                  type="text"
                  name="model"
                  placeholder="กรอกรุ่นรถ"
                  value={carDetails.model}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <button type="button" onClick={handleClose}>
                ยกเลิก
              </button>
              <button type="submit">บันทึก</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ChangeCar;

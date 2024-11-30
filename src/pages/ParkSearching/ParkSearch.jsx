import './ParkSearch.css';
import { useState, useEffect } from 'react';
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import img1 from '../img/3381.jpg';
import img2 from '../img/2305.jpg';
import img3 from '../img/14318.jpg';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { LocationPark } from '../../data/Locationpark';
import Modal from 'react-bootstrap/Modal';

function ParkSearch() {
  // ====================Bootstrap====================
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // เก็บข้อมูลลานจอดที่เลือก
  const handleClose = () => setShow(false);
  const handleShow = (item) => {
    setSelectedItem(item);  // เก็บข้อมูลของลานที่เลือก
    setShow(true);
  };
  // ====================Bootstrap====================

  // ====================DATA====================
  const [parkingData, setParkingData] = useState([]);
  const [Listpark, setListpark] = useState([]);

  useEffect(() => {
    const initialData = LocationPark().map(() => ({
      count: 0,
      text: 'คำนวณ',
      isDisabled: false,
    }));
    setParkingData(initialData);
    setListpark(LocationPark());
  }, []);
  // ====================DATA====================

  // ====================DATE====================
  const [maxDate, setMaxDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 7);
    setMaxDate(maxDate.toISOString().split('T')[0]);
  }, []);
  // ====================DATE====================

  // ====================RandomBotton====================
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [text1, setText1] = useState('คำนวณ');
  const [count1, setCount1] = useState(0);

  const handleButtonClick = (index) => {
    const randomNum = Math.floor(Math.random() * 25);
    setParkingData((prevData) =>
      prevData.map((item, i) =>
        i === index
          ? { ...item, count: randomNum, text: `${randomNum}/25`, isDisabled: true }
          : item
      )
    );
  };
  // ====================RandomBotton====================
  useEffect(() => {
    const initialData = LocationPark().map(() => {
      const randomNum = Math.floor(Math.random() * 25);
      return {
        count: randomNum,
        text: `${randomNum}/25`,
      };
    });
    setParkingData(initialData);
    setListpark(LocationPark());
  }, []);
  // ====================MinTime====================
  const [time1, setTime1] = useState('');
  const [time2, setTime2] = useState('');
  const handleTime1Change = (event) => {
    setTime1(event.target.value);
  };

  const handleTime2Change = (e) => {
    const selectedTime = e.target.value;
    if (time1 && selectedTime < time1) {
      alert('คุณเลือกเวลาไม่ถูกต้อง');
    } else {
      setTime2(selectedTime);
    }
  };
  // ====================Mintime====================

  return (
    <div style={{ marginBottom: '100px', marginTop: '150px' }}>
      <div className='searchhead' style={{ textAlign: 'center' }}>
        <h4>ค้นหาลานจอด</h4>
      </div>

      <div className="carousel-container" style={{ borderRadius: '10px', overflow: 'hidden' }}>
        <Carousel>
          <Carousel.Item>
            <img className="carousel-img" src={img1} alt="Second slide" />
            <Carousel.Caption className="carousel-caption">
              <span className="carousel-text">
                <h3>ลาน&nbsp;1</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </span>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="carousel-img" src={img2} alt="Second slide" />
            <Carousel.Caption>
              <span className="carousel-text">
                <h3>ลาน&nbsp;2</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </span>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="carousel-img" src={img3} alt="Third slide" />
            <Carousel.Caption className="carousel-caption">
              <span className="carousel-text">
                <h3>ลาน&nbsp;3</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                </p>
              </span>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      <div className="DateSer" style={{ textAlign: 'center', }}>
        <div className="GridDate" style={{ width: '130px' }}>
          <Form.Control
            type="text"
            placeholder="Date"
            onFocus={(e) => (e.target.type = 'date')}
            onBlur={(e) => (e.target.type = 'text')}
            max={maxDate} // กำหนดวันที่สูงสุด
          />
        </div>

        <div className="GridDate">
          <div>
            <Form.Control
              type="text"
              placeholder="time"
              value={time1}
              onFocus={(e) => (e.target.type = 'time')}
              onBlur={(e) => (e.target.type = 'text')}
              onChange={handleTime1Change}
            />
          </div>
          <span style={{ paddingLeft: '0.5rem' }}>-</span>
          <div style={{ paddingLeft: '0.5rem' }}>
            <Form.Control
              type="text"
              placeholder="time"
              value={time2}
              onFocus={(e) => (e.target.type = 'time')}
              onBlur={(e) => (e.target.type = 'text')}
              onChange={handleTime2Change}
            />
          </div>
        </div>
      </div>

      {Listpark.map((item, index) => (
        <div className="ParkCar-containner" key={index} style={{ width: '100%' }}>
          <div className="Console-containner">
            <div className="Parking-containner">
              <div className="Parking-inner">
                <img
                  className="carousel-img"
                  src={item.img}
                  alt="Parking location"
                  style={{ height: '150px', margin: '0.2rem', borderRadius: '5px' }}
                />
              </div>
              <div className="Location">
                <span>
                  <b>{item.name}</b>
                </span>
              </div>
              <div className="Text">
                <span>มีที่จอด</span>
                <span>
                  <p>ประมาณ</p>
                </span>
              </div>
              <div className="Button-Park" >
                <Button className='Bootstrap-Button' onClick={() => handleShow(item)} style={{ width: '130px' ,textAlign: 'left',justifyContent: 'center'}}>
                  <span >ข้อมูลลานจอด</span>
                </Button>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>ข้อมูลลานจอด </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <span>{selectedItem ? selectedItem.description : ""}</span>
                  </Modal.Body>
                  <Modal.Footer style={{ justifyContent: 'center' }}>
                    <Button onClick={handleClose} variant="secondary">
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
              <div className="Button-Park" style={{ margin: '0.2rem' }}>
                <div className="RandomResult" style={{ margin: '0.2rem' ,textAlign: 'right',justifyContent: 'center'}}>
                <div style={{ textAlign: 'right' }} className={parkingData[index]?.count < 19 ? 'Buttoning' : 'ReButtoning'}
                  style={{
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    width: '73px',
                    textAlign: 'center',
                    padding: '5px',
                    }}
                >
                  {parkingData[index]?.text}
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ParkSearch;
import './History.css';
import React, { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import Carpro1 from '../../assets/history/car1.png';
import Carpro2 from '../../assets/history/car3.png';

function History({ currentUser }) {
    const [showMemberHistory, setShowMemberHistory] = useState(true);
    const [selectedMonth, setSelectedMonth] = useState("พฤศจิกายน"); // State สำหรับเดือนที่เลือก
    const [showModal, setShowModal] = useState(false); // State สำหรับควบคุม Modal

    const handleSelectMonth = (month) => {
        setSelectedMonth(month);
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    // ตรวจสอบบทบาทว่าเป็น Visitor หรือ Member
    const isVisitor = currentUser?.role === "Visitor";

    return (
        <div className='container'>
            <div className="History" style={{marginTop: '4rem'}}>
                <h4>ประวัติการจอด</h4>
            </div>
            <div className='menu'>
                <div className="menu-row">
                    {!isVisitor && (
                        <div>
                            <label className="small-toggle">
                                <input
                                    type="checkbox"
                                    checked={!showMemberHistory}
                                    onChange={() => setShowMemberHistory(!showMemberHistory)}
                                />
                                <span className="slider round"></span>
                            </label> &nbsp; &nbsp;
                            <b className='filter'>ONLY VISITOR</b>
                        </div>
                    )}
                    
                    <div className='monthselect'>
                        <Dropdown onSelect={handleSelectMonth}>
                            <Dropdown.Toggle id="dropdown-basic">
                                เดือน | {selectedMonth}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="พฤศจิกายน">พฤศจิกายน</Dropdown.Item>
                                <Dropdown.Item eventKey="ตุลาคม">ตุลาคม</Dropdown.Item>
                                <Dropdown.Item eventKey="กันยายน">กันยายน</Dropdown.Item>
                                <Dropdown.Item eventKey="สิงหาคม">สิงหาคม</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>

            {/* แสดงข้อมูล Member ถ้าผู้ใช้ไม่ใช่ Visitor */}
            {!isVisitor && showMemberHistory &&(
                <div className='memberHistory'>
                    <div className="formember">
                        <h1>Member</h1>
                    </div>
                    <div className='list-item'>
                        <div className='role1' align='center'>
                            <b>Member</b>
                        </div>
                        <div className='car'>
                            <img src={Carpro1} alt="CarImage" width="140" height="100" />
                            <div className='info'>
                                <div>ลานจอด : อาคาร A ชั้น 3 C4</div>
                                <div>วันที่จอด : 8 {selectedMonth} 2567</div>
                                <div>เวลาที่เข้าจอด : 8.08 น.</div>
                                <div>เวลาที่ออก : 16.30 น.</div>
                            </div>
                            <div className='plate'>
                                <p>กก1234</p>
                            </div>
                        </div>
                    </div>
                    <div className='list-item'>
                        <div className='role1' align='center'>
                            <b>Member</b>
                        </div>
                        <div className='car'>
                            <img src={Carpro1} alt="CarImage" width="140" height="100" />
                            <div className='info'>
                                <div>ลานจอด : อาคาร A ชั้น 3 C4</div>
                                <div>วันที่จอด : 7 {selectedMonth} 2567</div>
                                <div>เวลาที่เข้าจอด : 8.00 น.</div>
                                <div>เวลาที่ออก : 16.20 น.</div>
                            </div>
                            <div className='plate'>
                                <p>กก1234</p>
                            </div>
                        </div>
                    </div>
                    <div className='list-item'>
                        <div className='role1' align='center'>
                            <b>Member</b>
                        </div>
                        <div className='car'>
                            <img src={Carpro1} alt="CarImage" width="140" height="100" />
                            <div className='info'>
                                <div>ลานจอด : อาคาร A ชั้น 3 C4</div>
                                <div>วันที่จอด : 6 {selectedMonth} 2567</div>
                                <div>เวลาที่เข้าจอด : 7.50 น.</div>
                                <div>เวลาที่ออก : 16.00 น.</div>
                            </div>
                            <div className='plate'>
                                <p>กก1234</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* แสดงข้อมูล Visitor */}
            <div className="forvisitor">
                <h1>Visitor</h1>
            </div>
            <div className='list-item'>
                <div className='role2' align='center'>
                    <b>Visitor</b>
                </div>
                <div className='car'>
                    <img src={Carpro2} alt="CarImage" width="140" height="100" />
                    <div className='info'>
                        <div>ลานจอด : อาคาร A ชั้น 3 A1</div>
                        <div>วันที่จอด : 8 {selectedMonth} 2567</div>
                        <div>เวลาที่เข้าจอด : 8.30 น.</div>
                        <div>เวลาที่ออก : 16.30 น.</div>
                    </div>
                    <button className='pay' onClick={toggleModal}>
                        ข้อมูลการชำระเงิน
                    </button>
                    <div className='plate'>
                        <p>ออ5678</p>
                    </div>
                </div>
            </div>

            {/* Modal สำหรับแสดงข้อมูลการชำระเงิน */}
            {showModal && (
                <div className='modal-overlay'>
                    <div className='modal-content'>
                        <p className='message-popup'>Visitor ทำการชำระเงินเรียบร้อยแล้ว</p>
                        <center>
                            <button className='modal-close' onClick={toggleModal}>ปิด</button>
                        </center>
                    </div>
                </div>
            )}
        </div>
    );
}

export default History;

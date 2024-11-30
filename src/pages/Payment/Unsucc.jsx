// import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";

// import "./Unsucc.css";
// import Button from "react-bootstrap/Button";

// function Unsucc() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { total = 0} = location.state || {};

//   return (
//     <div className="container">
//       <div className="succ-container">
//         <h1>Unsucc pic</h1>
//         <div className="succ-table">
//           <table className="showqr-table">
//             <thead>
//               <tr>
//                 <th rowSpan={3}>{total.toFixed(2)} บาท</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td></td>
//               </tr>
//               <tr>
//                 <td>ทะเบียน</td>
//                 <td align="left">กก1234</td>
//               </tr>
//               <tr>
//                 <td>เลขอ้างอิง</td>
//                 <td align="left">1234567</td>
//               </tr>
//               <tr>
//                 <td>เวลา</td>
//                 <td align="left">11:24</td>
//               </tr>
//               <tr>
//                 <td>ดาวน์โหลด</td>
//                 <td align="left">ไอคอน</td>
//               </tr>
//             </tbody>
//             <tfoot className="table-foot">
//               <tr id="coverfoot">
//                 <td colSpan={3} align="center">
//                   <Button
//                     variant="warning"
//                     className="button"
//                     onClick={() => navigate("/home")}
//                   >
//                     กลับสู่หน้าหลัก
//                   </Button>
//                 </td>
//               </tr>
//             </tfoot>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Unsucc;


import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import "./Unsucc.css";
import Button from "react-bootstrap/Button";

function Unsucc() {
  const navigate = useNavigate();
  const location = useLocation();
  const { total = 0 } = location.state || {};

  return (
    <div className="Ucontainer">
      <div className="unsucc-container">
        <div className="error-message">
          <i className="bi bi-x-circle-fill"></i>
          <h2>ชำระเงินล้มเหลว</h2>
        </div>
        <table className="showcheck-table">
          <tbody>
            <tr>
              <td className="totaltotaltotal" colSpan={2}>
                {total.toFixed(2)} บาท
              </td>
            </tr>
            <tr>
              <td align="center">ทะเบียน</td>
              <td align="center">กก1234</td>
            </tr>
            <tr>
              <td align="center">เลขอ้างอิง</td>
              <td align="center">1234567</td>
            </tr>
            <tr>
              <td align="center">เวลา</td>
              <td align="center">11:24</td>
            </tr>
          </tbody>
          <tfoot className="table-foot">
            <tr>
              <td colSpan={2} align="center">
                <Button
                  variant="warning"
                  className="bbbtttnnn"
                  onClick={() => navigate("/home")}
                >
                  กลับสู่หน้าหลัก
                </Button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default Unsucc;

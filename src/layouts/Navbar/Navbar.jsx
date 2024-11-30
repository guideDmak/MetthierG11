import { Link } from "react-router-dom";
import "./Navbar.css";
import "../../data/users";

function Navbar({ tab, setTab, currentUser }) {
  return (
    <div className="navbar-container">
      <Link to="/home">
        <button
          type="button"
          className={`navbar-button ${tab === "home" ? "active" : ""}`}
          onClick={() => setTab("home")}
        >
          <i className="bi bi-house-door-fill"></i>
          <p>หน้าหลัก</p>
        </button>
      </Link>

      <Link to="/parksearch">
        <button
          type="button"
          className={`navbar-button ${tab === "parksearch" ? "active" : ""}`}
          onClick={() => setTab("parksearch")}
        >
          <i className="bi bi-search"></i>
          <p>ค้นหา</p>
        </button>
      </Link>

      <Link to="/history">
        <button
          type="button"
          className={`navbar-button ${tab === "history" ? "active" : ""}`}
          onClick={() => setTab("history")}
        >
          <i className="bi bi-clock-history"></i>
          <p>ประวัติ</p>
        </button>
      </Link>

      {/* เงื่อนไขแสดงเมนูชำระเงิน */}
      {currentUser?.role === "Visitor" && (
        <Link to="/payment">
          <button
            type="button"
            className={`navbar-button ${tab === "payment" ? "active" : ""}`}
            onClick={() => setTab("payment")}
          >
            <i className="bi bi-credit-card-fill"></i>
            <p>ชำระเงิน</p>
          </button>
        </Link>
      )}

      {currentUser?.role === "Member" && (
        <Link to="/appointment">
          <button
            type="button"
            className={`navbar-button ${tab === "payment" ? "active" : ""}`}
            onClick={() => setTab("payment")}
          >
            <i className="bi bi-person-badge"></i>
            <p>นัดหมาย</p>
          </button>
        </Link>
      )}

      <Link to="/profilesetting">
        <button
          type="button"
          className={`navbar-button ${tab === "profilesetting" ? "active" : ""}`}
          onClick={() => setTab("profilesetting")}
        >
          <i className="bi bi-person-circle"></i>
          <p>ตั้งค่า</p>

        </button>
      </Link>


    </div>
  );
}

export default Navbar;
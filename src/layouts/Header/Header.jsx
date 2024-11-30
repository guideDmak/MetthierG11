import "./Header.css";
import { Link } from "react-router-dom";
import LogoH from "../../assets/Metthier Master Logo.png"

function Header({ tab, setTab }) {
  return (
    <section className="header-container">
      <div className="header-content">
        <center>
          <img
            className="Metthier-logo"
            src={LogoH}
            alt="Carlie Anglemire"
          />
        </center>

        <Link to="/scanqr">
          <button
            type="button"
            className={`scan-button ${tab === "scan" ? "active" : ""}`}
            onClick={() => setTab("scan")}
          >
            <i className="bi bi-qr-code-scan"></i>
          </button>
        </Link>
      </div>
    </section>
  );
}

export default Header;

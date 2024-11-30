import { Outlet } from "react-router-dom";

import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
// import Footer from "../Footer/Footer";

import "./Layout.css";

function Layout({ tab, setTab, currentUser }) {
  return (
    <div>
      <Header />
      <Navbar tab={tab} setTab={setTab} currentUser={currentUser} />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
}

export default Layout;

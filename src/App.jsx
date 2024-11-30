import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "./App.css";
import { UserProvider } from "./data/UserContext";

import { HashRouter, Routes, Route, Navigate,BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";

import Layout from "./layouts/Layout/Layout";
import Home from "./pages/Home/Home";
import ParkSearch from "./pages/ParkSearching/ParkSearch";
import History from "./pages/HistoryParking/History";

import ProfileSetting from "./pages/ProfileSetting/ProfileSetting-1/ProfileSetting";
import EditProfile from "./pages/ProfileSetting/EditProfile/EditPro";
import EditPassword from "./pages/ProfileSetting/EditPassword/EditPassword";
import ChangeCar from "./pages/ProfileSetting/ChangeCar/ChangeCar";

import Appointment from "./pages/Appointment/Appointment";
import HistoryAPM from "./pages/HistoryAPM/HistoryAPM";

import Payment from "./pages/Payment/Payment";
import ShowQR from "./pages/Payment/ShowQR";
import Unsucc from "./pages/Payment/Unsucc";
import Succ from "./pages/Payment/Succ";


import ScanQR from "./pages/ScanQR/Scan";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/register";
import Forget from "./pages/Forget/forget";

const App = () => {
  const [tab, setTab] = useState("home");
  const [currentUser, setCurrentUser] = useState(null); // Stores current user

  useEffect(() => {
    setTab("home");
  }, []);

  // Handles user login
  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  // Handles user logout
  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <BrowserRouter>
      <UserProvider>  
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login onLogin={handleLogin} />} />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute currentUser={currentUser}>
              <Layout tab={tab} setTab={setTab} currentUser={currentUser} />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<Home currentUser={currentUser} />} />
          <Route path="/parksearch" element={<ParkSearch />} />
          <Route path="/history" element={<History currentUser={currentUser} />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/showqr" element={<ShowQR />} />
          <Route path="/unsucc" element={<Unsucc />} />
          <Route path="/succ" element={<Succ />} />
          
          <Route
            path="/profilesetting"
            element={<ProfileSetting onLogout={handleLogout} currentUser={currentUser} />}
          />
          <Route path="/editprofile" element={<EditProfile currentUser={currentUser} />} />
          <Route path="/editpassword" element={<EditPassword />} />
          <Route path="/changecar" element={<ChangeCar />} />

          <Route path="/appointment" element={<Appointment />} />
          <Route path="/historyapm" element={<HistoryAPM />} />

          <Route path="/scanqr" element={<ScanQR />} />
          
        </Route>
        
        {/* Fallback Route */}
        <Route path="/register" element={<Register />}  />
        <Route path="/forget" element={<Forget/>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

// Reusable ProtectedRoute Component
function ProtectedRoute({ children, currentUser }) {
  return currentUser ? children : <Navigate to="/" />;
}

export default App;
  
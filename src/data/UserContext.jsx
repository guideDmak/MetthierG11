import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// API base URL
const API_URL = 'http://localhost:3000';

// Create context
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Configure axios with token
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Try to get user data if token exists
      getUserData();
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Get user data if we have a token
  const getUserData = async () => {
    if (!token) return;
    
    try {
      setLoading(true);
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser && storedUser.id) {
        const response = await axios.get(`${API_URL}/users/${storedUser.id}`);
        setUser(response.data);
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
      logout(); // Token might be invalid
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (username, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post(`${API_URL}/users/login`, { username, password });
      
      const { token: newToken, user: userData } = response.data;
      
      // Save to state
      setToken(newToken);
      setUser(userData);
      
      // Save to localStorage
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return userData;
    } catch (err) {
      setError(err.response?.data?.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Register user
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post(`${API_URL}/users/register`, userData);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'เกิดข้อผิดพลาดในการลงทะเบียน');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  };

  // Request password reset
  const requestPasswordReset = async (phone_number) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post(`${API_URL}/users/forgot-password`, { phone_number });
      console.log("Password reset API response:", response.data); // เพิ่ม log เพื่อดูข้อมูลที่ได้รับ
      
      // ตรวจสอบค่า OTP ที่ได้รับ
      if (response.data && response.data.otp) {
        console.log("OTP received from API:", response.data.otp);
      }
      
      return response.data;
    } catch (err) {
      console.error("Password reset request error:", err.response?.data);
      setError(err.response?.data?.message || 'เกิดข้อผิดพลาดในการขอรีเซ็ตรหัสผ่าน');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const verifyOTP = async (reset_token, otp) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post(`${API_URL}/users/verify-reset-otp`, { reset_token, otp });
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'รหัส OTP ไม่ถูกต้องหรือหมดอายุ');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (reset_token, new_password) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post(`${API_URL}/users/reset-password`, { reset_token, new_password });
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'เกิดข้อผิดพลาดในการรีเซ็ตรหัสผ่าน');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Get all users (admin only)
  const getAllUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/users/list`);
      return response.data.users;
    } catch (err) {
      console.error('Error fetching users:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        login,
        register,
        logout,
        requestPasswordReset,
        verifyOTP,
        resetPassword,
        getAllUsers
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
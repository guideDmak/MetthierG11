import mysql from "mysql2/promise";
import crypto from "crypto";

const config = {
  host: "localhost",
  user: "AdminSMP",
  password: "AdminSMP",
  database: "Smart_Parking",
};

const pool = mysql.createPool(config);

// Utility function for database queries
const query = async (sql, params) => {
  try {
    const [rows] = await pool.query(sql, params);
    return rows;
  } catch (error) {
    console.error("❌ MySQL Query Error:", error);
    throw error;
  }
};

// User Registration
export const registerUser = async ({ 
  username, 
  password, 
  first_name, 
  last_name, 
  phone_number 
}) => {
  try {
    const sql = `
      INSERT INTO users 
      (username, password, first_name, last_name, phone_number, role_id) 
      VALUES (?, SHA2(?, 256), ?, ?, ?, 2)
    `;
    const params = [username, password, first_name, last_name, phone_number];
    
    const [result] = await pool.execute(sql, params);
    
    if (result.affectedRows > 0) {
      return { 
        id: result.insertId, 
        username, 
        first_name, 
        last_name, 
        phone_number 
      };
    }
    
    return null;
  } catch (error) {
    console.error("❌ Registration Error:", error);
    throw error;
  }
};

// User Login
export const loginUser = async ({ username, password }) => {
  try {
    const sql = `
      SELECT * FROM users 
      WHERE username = ? AND password = SHA2(?, 256)
    `;
    const params = [username, password];
    
    const users = await query(sql, params);
    
    if (users.length === 0) {
      return null;
    }
    
    const user = users[0];
    
    // Update last login time
    await pool.execute(
      'UPDATE users SET last_login = NOW() WHERE user_id = ?', 
      [user.user_id]
    );
    
    return {
      id: user.user_id,
      username: user.username,
      role_id: user.role_id,
      first_name: user.first_name,
      last_name: user.last_name
    };
  } catch (error) {
    console.error("❌ Login Error:", error);
    throw error;
  }
};

// Initiate Password Reset
export const initiatePasswordReset = async (phone_number) => {
  try {
    // Find user by phone number
    const userSql = 'SELECT user_id FROM users WHERE phone_number = ?';
    const [users] = await pool.query(userSql, [phone_number]);
    
    if (users.length === 0) {
      return null;
    }
    
    const user_id = users[0].user_id;
    
    // Generate reset token
    const reset_token = crypto.randomBytes(32).toString('hex');
    
    // Insert reset request
    const insertSql = `
      INSERT INTO password_reset_requests 
      (user_id, phone_number, request_token, expires_at) 
      VALUES (?, ?, ?, DATE_ADD(NOW(), INTERVAL 1 HOUR))
    `;
    const [result] = await pool.execute(insertSql, [user_id, phone_number, reset_token]);
    
    // Generate and insert OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpSql = `
      INSERT INTO otp_verification 
      (request_id, otp_code, expires_at) 
      VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 15 MINUTE))
    `;
    await pool.execute(otpSql, [result.insertId, otp]);
    
    return { reset_token, otp };
  } catch (error) {
    console.error("❌ Password Reset Initiation Error:", error);
    throw error;
  }
};

// Verify OTP for Password Reset
export const verifyPasswordResetOTP = async (reset_token, otp) => {
  try {
    const sql = `
      SELECT pr.*, ov.otp_code, ov.expires_at AS otp_expires_at, ov.is_verified
      FROM password_reset_requests pr
      JOIN otp_verification ov ON pr.request_id = ov.request_id
      WHERE pr.request_token = ? AND ov.otp_code = ?
      AND pr.expires_at > NOW() 
      AND ov.expires_at > NOW()
    `;
    
    const [results] = await pool.query(sql, [reset_token, otp]);
    
    if (results.length === 0) {
      return null;
    }
    
    // Mark OTP as verified
    await pool.execute(`
      UPDATE otp_verification 
      SET is_verified = TRUE, verified_at = NOW() 
      WHERE request_id = ?
    `, [results[0].request_id]);
    
    return results[0];
  } catch (error) {
    console.error("❌ OTP Verification Error:", error);
    throw error;
  }
};

// Reset Password
export const resetPassword = async (reset_token, new_password) => {
  try {
    // Find the verified reset request
    const findSql = `
      SELECT user_id FROM password_reset_requests 
      WHERE request_token = ? 
      AND status = 'completed'
    `;
    const [requests] = await pool.query(findSql, [reset_token]);
    
    if (requests.length === 0) {
      return false;
    }
    
    const user_id = requests[0].user_id;
    
    // Update user password
    const updateSql = `
      UPDATE users 
      SET password = SHA2(?, 256) 
      WHERE user_id = ?
    `;
    const [result] = await pool.execute(updateSql, [new_password, user_id]);
    
    // Mark reset request as used
    await pool.execute(`
      UPDATE password_reset_requests 
      SET status = 'completed' 
      WHERE request_token = ?
    `, [reset_token]);
    
    return result.affectedRows > 0;
  } catch (error) {
    console.error("❌ Password Reset Error:", error);
    throw error;
  }
};

// ฟังก์ชันสำหรับการยืนยันผู้ใช้
export const verifyUser = async (user_id) => {
  try {
    // อัพเดทสถานะผู้ใช้เป็น member (role_id = 1)
    const sql = `
      UPDATE users 
      SET role_id = 1 
      WHERE user_id = ?
    `;
    
    const [result] = await pool.execute(sql, [user_id]);
    
    if (result.affectedRows === 0) {
      return null;
    }
    
    // ดึงข้อมูลผู้ใช้ที่อัพเดทแล้ว
    const [user] = await pool.query(
      'SELECT user_id, username, first_name, last_name, role_id FROM users WHERE user_id = ?', 
      [user_id]
    );
    
    return user[0];
  } catch (error) {
    console.error("❌ User Verification Error:", error);
    throw error;
  }
};

// ฟังก์ชันสำหรับการดึงข้อมูลผู้ใช้
export const getUserById = async (user_id) => {
  try {
    const sql = `
      SELECT user_id, username, first_name, last_name, phone_number, role_id, created_at, last_login 
      FROM users 
      WHERE user_id = ?
    `;
    
    const users = await query(sql, [user_id]);
    
    if (users.length === 0) {
      return null;
    }
    
    return users[0];
  } catch (error) {
    console.error("❌ Get User Error:", error);
    throw error;
  }
};

// ฟังก์ชันสำหรับดึงรายชื่อผู้ใช้ทั้งหมด
export const getAllUsers = async () => {
  try {
    const sql = `
      SELECT u.user_id, u.username, u.first_name, u.last_name, u.phone_number, 
             r.role_name, u.created_at, u.last_login 
      FROM users u
      JOIN roles r ON u.role_id = r.role_id
      ORDER BY u.user_id
    `;
    
    const users = await query(sql);
    return users;
  } catch (error) {
    console.error("❌ Get All Users Error:", error);
    throw error;
  }
};
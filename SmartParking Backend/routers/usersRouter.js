import { Router } from "express";
import jwt from "jsonwebtoken";
import {
  registerUser,
  loginUser,
  initiatePasswordReset,
  verifyPasswordResetOTP,
  resetPassword,
  verifyUser,
  getUserById,
  getAllUsers
} from "../controllers/userController.js";

const usersRouter = Router();
const JWT_SECRET = "your_jwt_secret_key_here"; // Replace with a strong secret key

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Middleware ตรวจสอบว่าเป็น member หรือไม่
const isMember = (req, res, next) => {
  // ตรวจสอบว่าผู้ใช้เป็น member (role_id = 1)
  if (req.user.role_id !== 1) {
    return res.status(403).json({ message: "เฉพาะ member เท่านั้นที่สามารถเข้าถึงได้" });
  }
  next();
};

// เส้นทางสำหรับดูรายชื่อผู้ใช้ทั้งหมด (เฉพาะ member)
usersRouter.get("/list", authenticateToken, isMember, async (req, res) => {
  try {
    const users = await getAllUsers();
    
    res.status(200).json({
      count: users.length,
      users
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: "เกิดข้อผิดพลาดขณะดึงรายชื่อผู้ใช้", 
      error: error.message 
    });
  }
});

// User Registration Route
usersRouter.post("/register", async (req, res) => {
  try {
    console.log("Request Body:", req.body); // เพิ่มการแสดงข้อมูลเพื่อตรวจสอบ
    
    const { 
      username, 
      password, 
      first_name, 
      last_name, 
      phone_number 
    } = req.body;

    console.log("Extracted values:", { username, password, first_name, last_name, phone_number });
    
    // ตรวจสอบข้อมูลที่จำเป็น
    if (!username || !password || !first_name || !last_name || !phone_number) {
      return res.status(400).json({ 
        message: "กรุณากรอกข้อมูลให้ครบทุกช่อง", 
        required_fields: ["username", "password", "first_name", "last_name", "phone_number"],
        received_data: { username, password, first_name, last_name, phone_number }
      });
    }

    const newUser = await registerUser({
      username, 
      password, 
      first_name, 
      last_name, 
      phone_number
    });

    if (!newUser) {
      return res.status(400).json({ message: "การลงทะเบียนล้มเหลว" });
    }

    res.status(201).json({
      message: "ลงทะเบียนผู้ใช้สำเร็จ",
      user: {
        id: newUser.id,
        username: newUser.username,
        first_name: newUser.first_name,
        last_name: newUser.last_name
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์ขณะลงทะเบียน", 
      error: error.message 
    });
  }
});



// User Login Route
usersRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await loginUser({ username, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user.id, 
        username: user.username, 
        role_id: user.role_id 
      }, 
      JWT_SECRET, 
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: "Login successful",
      user,
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: "Server error during login", 
      error: error.message 
    });
  }
});

// Initiate Password Reset Route
usersRouter.post("/forgot-password", async (req, res) => {
  try {
    const { phone_number } = req.body;

    const resetData = await initiatePasswordReset(phone_number);

    if (!resetData) {
      return res.status(404).json({ message: "Phone number not found" });
    }

    res.status(200).json({
      message: "Password reset initiated",
      reset_token: resetData.reset_token,
      // In a real app, OTP would be sent via SMS, not returned
      otp: resetData.otp 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: "Server error during password reset initiation", 
      error: error.message 
    });
  }
});

// Verify OTP for Password Reset
usersRouter.post("/verify-reset-otp", async (req, res) => {
  try {
    const { reset_token, otp } = req.body;

    const verificationResult = await verifyPasswordResetOTP(reset_token, otp);

    if (!verificationResult) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    res.status(200).json({
      message: "OTP verified successfully",
      can_reset_password: true
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: "Server error during OTP verification", 
      error: error.message 
    });
  }
});

// Reset Password Route
usersRouter.post("/reset-password", async (req, res) => {
  try {
    const { reset_token, new_password } = req.body;

    const resetResult = await resetPassword(reset_token, new_password);

    if (!resetResult) {
      return res.status(400).json({ message: "Password reset failed" });
    }

    res.status(200).json({
      message: "Password reset successful"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: "Server error during password reset", 
      error: error.message 
    });
  }
});

// เส้นทางสำหรับยืนยันผู้ใช้ (เฉพาะ member)
usersRouter.post("/verify/:userId", authenticateToken, isMember, async (req, res) => {
  try {
    const { userId } = req.params;
    
    const verifiedUser = await verifyUser(userId);
    
    if (!verifiedUser) {
      return res.status(404).json({ message: "ไม่พบผู้ใช้" });
    }
    
    res.status(200).json({
      message: "ยืนยันผู้ใช้เป็น member สำเร็จ",
      user: verifiedUser
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: "เกิดข้อผิดพลาดขณะยืนยันผู้ใช้", 
      error: error.message 
    });
  }
});

// เส้นทางสำหรับดูข้อมูลผู้ใช้ตาม ID
usersRouter.get("/:userId", authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;
    
    // ถ้าไม่ใช่ member และดูข้อมูลของคนอื่น จะไม่อนุญาต
    if (req.user.role_id !== 1 && parseInt(userId) !== req.user.id) {
      return res.status(403).json({ message: "ไม่มีสิทธิ์เข้าถึงข้อมูลของผู้ใช้อื่น" });
    }
    
    const user = await getUserById(userId);
    
    if (!user) {
      return res.status(404).json({ message: "ไม่พบผู้ใช้" });
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: "เกิดข้อผิดพลาดขณะดึงข้อมูลผู้ใช้", 
      error: error.message 
    });
  }
});

export default usersRouter;
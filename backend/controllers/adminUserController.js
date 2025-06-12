import adminUserModel from "../models/adminUser.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await adminUserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, error: { message: "Invalid email or password" } });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: { message: "Invalid email or password" } });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: { name: user.name, email: user.email }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: { message: "Server error" } });
  }
};

export { login };

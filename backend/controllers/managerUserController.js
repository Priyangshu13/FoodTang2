import managerUserModel from "../models/managerUser.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await managerUserModel.findOne({ email });
  if (user) {
    return res.status(409).json({ message: "User already exists", success: false });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new managerUserModel({ name, email, password: hashedPassword });
  await newUser.save();

  res.status(201).json({ message: "Signup successful", success: true });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await managerUserModel.findOne({ email });
  if (!user) {
    return res.status(409).json({ message: "Invalid email or password", success: false });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(409).json({ message: "Invalid email or password", success: false });
  }

  const jwtToken = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
  res.status(200).json({ message: "Login successful", success: true, jwtToken });
};

export { signup, login };

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';
import { connectDB } from './config/db.js';
import Admin from './models/adminUser.js'; // make sure this matches your model path

config(); // Load .env

const createAdmin = async () => {
  try {
    await connectDB();
    console.log('✅ Connected to DB');
    const name = 'priyangshu'; // You can change this to your desired admin name
    const email = 'priyangshudas.21@nshm.edu.in';
    const plainPassword = 'Priyangshu@13'; // Use a strong password in production

    const existing = await Admin.findOne({ email });
    if (existing) {
      console.log('⚠️ Admin already exists');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const newAdmin = new Admin({
      name,          
      email,
      password: hashedPassword,
      role: 'admin', 
});

    await newAdmin.save();
    console.log('✅ Admin created successfully');
  } catch (err) {
    console.error('❌ Error:', err);
  } finally {
    mongoose.disconnect();
  }
};

createAdmin();

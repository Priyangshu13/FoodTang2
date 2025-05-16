import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AdminUserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const AdminUserModel = mongoose.model('AdminUser', AdminUserSchema);

export default AdminUserModel;

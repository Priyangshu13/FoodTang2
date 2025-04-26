import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const managerUserSchema = new Schema({
  name: {
    type: String,
    required: true, // fixed typo
  },
  email: {
    type: String,
    required: true, // fixed typo
    unique: true    // good practice
  },
  password: {
    type: String,
    required: true, // fixed typo
  }
});

const managerUserModel = mongoose.model('ManagerUser', managerUserSchema);

export default managerUserModel;

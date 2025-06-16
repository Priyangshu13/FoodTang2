import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    enum: ['Kolkata', 'Durgapur', 'Asansol']
  },
  personCount: {
    type: Number,
    required: true,
    min: 1
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true // Store as "HH:mm"
  },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'confirmed', 'cancelled']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;

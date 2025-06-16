import express from 'express';
import {
  createBooking,
  getAllBookings,
  updateBooking,
  deleteBooking
} from '../controllers/bookingcontroller.js';

const router = express.Router();

router.post('/', createBooking);
router.get('/', getAllBookings);
router.put('/:id', updateBooking);
router.delete('/:id', deleteBooking);

export default router;

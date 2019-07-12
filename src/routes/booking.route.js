import { Router } from 'express';

import bookingCtrl from '../controllers/booking.ctrl';
import auth from '../middlewares/auth';
import bodyValidation from '../middlewares/validation/body.validation';

const router = Router();

router
  .post(
    '/bookings',
    [auth.authenticate, bodyValidation],
    bookingCtrl.addBooking,
  )
  .get(
    '/bookings',
    [auth.authenticate],
    bookingCtrl.getAll,
  )
  .delete(
    '/bookings/:booking_id',
    [auth.authenticate],
    bookingCtrl.deleteABooking,
  );

export default router;

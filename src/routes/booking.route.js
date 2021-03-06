import { Router } from 'express';

import bookingCtrl from '../controllers/booking.ctrl';
import auth from '../middlewares/auth';
import bodyValidation from '../middlewares/validation/body.validation';
import paramValidation from '../middlewares/validation/param.validation';

const router = Router();

router
  .post(
    '/bookings',
    [auth.authenticate, bodyValidation],
    bookingCtrl.addBooking,
  )
  .get('/bookings', [auth.authenticate], bookingCtrl.getAll)
  .delete(
    '/bookings/:booking_id', [auth.authenticate, paramValidation],
    bookingCtrl.deleteABooking,
  )
  .put(
    '/bookings/:booking_id',
    [auth.authenticate, paramValidation, bodyValidation],
    bookingCtrl.changeSeat,
  );

export default router;

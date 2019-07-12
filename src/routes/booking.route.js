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
  );

export default router;

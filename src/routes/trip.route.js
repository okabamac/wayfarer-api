import { Router } from 'express';

import tripCtrl from '../controllers/trip.ctrl';
import auth from '../middlewares/auth';
import bodyValidation from '../middlewares/validation/bodyValidation';


const router = Router();

router
  .post('/create', [auth.authenticate, auth.isAdmin, bodyValidation], tripCtrl.addTrip);

export default router;

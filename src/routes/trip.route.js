import { Router } from 'express';

import tripCtrl from '../controllers/trip.ctrl';
import auth from '../middlewares/auth';
import bodyValidation from '../middlewares/validation/body.validation';
import paramValidation from '../middlewares/validation/param.validation';


const router = Router();

router
  .post('/trips', [auth.authenticate, auth.isAdmin, bodyValidation], tripCtrl.addTrip)
  .get('/trips', [auth.authenticate, paramValidation, bodyValidation], tripCtrl.getAll);

export default router;

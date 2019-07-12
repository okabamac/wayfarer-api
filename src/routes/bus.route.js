import { Router } from 'express';

import busCtrl from '../controllers/bus.ctrl';
import auth from '../middlewares/auth';
import bodyValidation from '../middlewares/validation/body.validation';
import paramValidation from '../middlewares/validation/param.validation';

const router = Router();

router
  .post(
    '/buses',
    [auth.authenticate, auth.isAdmin, bodyValidation],
    busCtrl.addBus,
  )
  .get('/buses', [auth.authenticate], busCtrl.getAll)
  .get('/buses/:bus_id', [auth.authenticate, paramValidation], busCtrl.getOne);

export default router;

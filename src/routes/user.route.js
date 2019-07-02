import { Router } from 'express';

import userCtrl from '../controllers/user.ctrl';
import bodyValidation from '../middlewares/validation/bodyValidation';

const router = Router();

router
  .post('/auth/signup', [bodyValidation], userCtrl.add)
  .post('/auth/signin', [bodyValidation], userCtrl.login);

export default router;

import { Router } from 'express';
import LoginController from '../controller/LoginController';

const router = Router();

router.get('/login', LoginController.index);

export default router;

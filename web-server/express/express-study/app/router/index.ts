import { Router } from 'express';
import LoginController from '../controller/LoginController';

const router = Router();

router.post('/login/:userName', LoginController.index);

export default router;

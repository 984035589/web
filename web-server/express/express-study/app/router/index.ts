import { Router } from 'express';
import LoginController from '../controller/LoginController';
import AdminController from '../controller/AdminController';
import ValidateMiddleware from '../middleware/ValidateMiddleware';
import { adminRules } from '../../common/validator-rules';

const router = Router();

router.post('/login', ValidateMiddleware(adminRules), LoginController.index);
router.post('/admin', AdminController.addAdmin);

export default router;

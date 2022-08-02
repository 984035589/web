import { Router } from 'express';
import LoginController from '../controller/LoginController';
import AdminController from '../controller/AdminController';
import ViewController from '../controller/ViewController';
import ValidateMiddleware from '../middleware/ValidateMiddleware';
import AuthMiddleware from '../middleware/AuthMiddleware';
import { adminRules } from '../../common/validator-rules';

const router = Router();

router.get('/', ViewController.index);
router.get('/login', ViewController.login);
router.get('/register', ViewController.register);
router.post('/api/login', ValidateMiddleware(adminRules), LoginController.index);

router.use(AuthMiddleware);
router.post('/admin', ValidateMiddleware(adminRules), AdminController.addAdmin);

export default router;

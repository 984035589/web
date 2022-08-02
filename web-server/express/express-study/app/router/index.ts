import { Router } from 'express';
import LoginController from '../controller/LoginController';
import AdminController from '../controller/AdminController';
import ViewController from '../controller/ViewController';
import ValidateMiddleware from '../middleware/ValidateMiddleware';
import AuthMiddleware from '../middleware/AuthMiddleware';
import SessionMiddleware from '../middleware/SessionMiddleware';
import { adminRules } from '../../common/validator-rules';

const router = Router();

router.get('/login', ViewController.login);
router.get('/register', ViewController.register);
router.post('/api/login', ValidateMiddleware(adminRules), LoginController.index);
router.get('/api/logout', LoginController.logout);

// router.use(AuthMiddleware); // jwt
router.use(SessionMiddleware); // session
router.get('/', ViewController.index);
router.post('/admin', ValidateMiddleware(adminRules), AdminController.addAdmin);

export default router;

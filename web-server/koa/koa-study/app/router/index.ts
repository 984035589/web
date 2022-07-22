import koaRouter from 'koa-router';
import IndexController from '../controller/IndexController';
import LoginController from '../controller/LoginController';
import AdminController from '../controller/AdminController';
import UploadController from '../controller/UploadController';
import AuthMiddleware from '../middleware/AuthMiddleware';

const router = new koaRouter({ prefix: '/admin' });
router.post('/login', LoginController.index);
router.get('/list', AdminController.pageQuery);
router.post('/upload', UploadController.upload);
router.use(AuthMiddleware);
router.get('/', IndexController.index);
export default router;

import koaRouter from 'koa-router';
import IndexController from '../controller/IndexController';

const router = new koaRouter({ prefix: '/admin' });
router.get('/', IndexController.index);

export default router;

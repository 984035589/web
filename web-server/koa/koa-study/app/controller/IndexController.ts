import { Context } from 'koa';
import AdminService from '../service/AdminService';

class IndexController {
	async index(ctx: Context) {
		const res = await AdminService.getAdmin();
		ctx.body = res;
	}
}

export default new IndexController();

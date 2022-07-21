import { Context } from 'koa';
import AdminService from '../service/AdminService';
import response from '../../utils/response';

class IndexController {
	async index(ctx: Context) {
		const res = await AdminService.getAdminById(5);
		if (res === null) {
			response.error(ctx);
			return;
		}
		response.success(ctx, res);
	}
}

export default new IndexController();

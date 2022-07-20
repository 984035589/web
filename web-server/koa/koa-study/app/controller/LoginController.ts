import { Context } from 'koa';
import { sign } from '../../utils/auth';
import AdminService from '../service/AdminService';
import response from '../../utils/response';

class LoginCOntroller {
	async index(ctx: Context) {
		const admin = AdminService.getAdminById(1);
		if (admin === null) {
			response.error(ctx);
			return;
		}
		const token = sign(admin);
		response.success(ctx, { token });
	}
}

export default new LoginCOntroller();

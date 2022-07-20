import { Context } from 'koa';
import { sign } from '../../utils/auth';
import AdminService from '../service/AdminService';

class LoginCOntroller {
	async index(ctx: Context) {
		const token = sign(AdminService.getAdmin());
		ctx.body = {
			token
		};
	}
}

export default new LoginCOntroller();

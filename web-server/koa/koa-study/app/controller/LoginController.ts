import { Context } from 'koa';
import { sign } from '../../utils/auth';
import AdminService from '../service/AdminService';
import response from '../../utils/response';
import { adminRules } from '../../common/validator-rules';
import { LoginFormModel } from '../../types';
import validate from '../../utils/validate';

class LoginCOntroller {
	async index(ctx: Context) {
		// 校验用户名密码
		const res = await validate<LoginFormModel>(ctx.request.body, adminRules);
		if (res.error) {
			response.error(ctx, res.error);
			return;
		}
		const admin = await AdminService.getAdminByName(res.data.name);
		if (admin === null) {
			response.error(ctx);
			return;
		}
		const token = sign(admin);
		response.success(ctx, { token });
	}
}

export default new LoginCOntroller();

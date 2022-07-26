import { Request, Response, NextFunction } from 'express';
import { adminRules } from '../../common/validator-rules';
import response from '../../utils/response';
import validate, { testValidate } from '../../utils/validate';
import { LoginFormModel } from '../../types';

class LoginController {
	async index(req: Request, res: Response, next: NextFunction) {
		console.log(`-------------------`);
		console.log(req.body);
		// 校验用户名密码
		const data = await validate(req.body, adminRules);
		if (data.error) {
			response.error(res, data.error);
			return;
		}
		// testValidate();
		response.success(res, { userName: req.params.userName, ...req.body });
	}
}

export default new LoginController();

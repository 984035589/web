import { Request, Response, NextFunction } from 'express';
import { adminRules } from '../../common/validator-rules';
import response from '../../utils/response';
import validate from '../../utils/validate';

class LoginController {
	async index(req: Request, res: Response, next: NextFunction) {
		response.success(res, { userName: req.params.userName, ...req.body });
	}
}

export default new LoginController();

import { Request, Response, NextFunction } from 'express';
import { sign } from '../../utils/auth';
import response from '../../utils/response';
import AdminService from '../service/AdminService';

class LoginController {
	async index(req: Request, res: Response) {
		const admin = await AdminService.getAdminById(req.params.id as unknown as number);
		if (!admin) {
			return response.error(res, '用户不存在');
		}
		const token = sign(admin);
		response.success(res, { token, ...admin?.toJSON() });
	}
}

export default new LoginController();

import AdminService from '../service/AdminService';
import { Request, Response, NextFunction } from 'express';
import response from '../../utils/response';

class AdminController {
	async addAdmin(req: Request, res: Response, next: NextFunction) {
		const admin = await AdminService.addAdmin(req.body);
		if (!admin) {
			return response.error(res, '添加失败');
		}
		response.success(res, admin);
	}
}

export default new AdminController();

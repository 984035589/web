import { Context } from 'koa';
import paginate from '../../utils/paginate';
import response from '../../utils/response';
import AdminService from '../service/AdminService';
import validate from '../../utils/validate';
import { adminRules, nameRule } from '../../common/validator-rules';
import { createHash } from 'crypto';
import { LoginFormModel } from '../../types';

class AdminController {
	async pageQuery(ctx: Context) {
		const queryStr = new URLSearchParams(ctx.querystring);
		const page: number = Number(queryStr.get('page') as unknown);
		const pageSize: number = Number(queryStr.get('pageSize') as unknown);
		const res = await AdminService.pageQuery({ page, pageSize });
		response.success(ctx, paginate(res.rows, page, pageSize, res.count));
	}

	async addAdmin(ctx: Context) {
		const body = ctx.request.body as LoginFormModel;
		const { data, error } = await validate(body, adminRules);
		if (error) {
			return response.error(ctx, error);
		}
		const last = await AdminService.getAdminByName(data.name);
		if (last) {
			return response.error(ctx, '用户名已经存在');
		}
		data.password = createHash('md5').update(data.password).digest('hex');
		const newAdmin = await AdminService.addAdmin(data);
		if (newAdmin) {
			return response.success(ctx, newAdmin);
		}
		return response.error(ctx, '');
	}

	async deleteAdmin(ctx: Context) {
		const id = ctx.params['id'] as number;
		const rows = await AdminService.deleteById(id);
		if (rows === 0) {
			return response.error(ctx, '用户不存在');
		}
		return response.success(ctx, { id }, '删除成功');
	}

	async updateAdmin(ctx: Context) {
		const id = ctx.params['id'] as number;
		const admin = await AdminService.getAdminById(id);
		if (!admin) {
			return response.error(ctx, '用户不存在');
		}
		const body = ctx.request.body as LoginFormModel;
		const { data, error } = await validate(body, nameRule);
		if (error) {
			return response.error(ctx, error);
		}
		if (data.password) {
			data.password = createHash('md5').update(data.password).digest('hex');
		}
		const [number] = await AdminService.updateById(id, data);
		if (number === 0) {
			return response.error(ctx, '更新失败');
		}
		return response.success(ctx, data);
	}
}

export default new AdminController();

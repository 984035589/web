import { Context } from 'koa';
import paginate from '../../utils/paginate';
import response from '../../utils/response';
import AdminService from '../service/AdminService';

class AdminController {
	async pageQuery(ctx: Context) {
		const queryStr = new URLSearchParams(ctx.querystring);
		const page: number = Number(queryStr.get('page') as unknown);
		const pageSize: number = Number(queryStr.get('pageSize') as unknown);
		const res = await AdminService.pageQuery({ page, pageSize });
		response.success(ctx, paginate(res.rows, page, pageSize, res.count));
	}
}

export default new AdminController();

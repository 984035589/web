import { PageQueryModel } from '../../types';
import Admin from '../model/Admin';

class AdminService {
	getAdminById(id: number) {
		return Admin.findByPk(id);
	}

	pageQuery(params: PageQueryModel) {
		console.log(params);
		return Admin.findAndCountAll({
			limit: params.pageSize,
			offset: (params.page - 1) * params.pageSize
		});
	}
}

export default new AdminService();

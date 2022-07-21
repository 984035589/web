import { PageQueryModel } from '../../types';
import Admin from '../model/Admin';

class AdminService {
	getAdminById(id: number) {
		return Admin.findByPk(id);
	}

	pageQuery(params: PageQueryModel) {
		return Admin.findAndCountAll({
			limit: params.pageSize,
			offset: (params.page - 1) * params.pageSize
		});
	}

	getAdminByName(name: string) {
		return Admin.findOne({
			where: {
				name: name
			}
		});
	}
}

export default new AdminService();

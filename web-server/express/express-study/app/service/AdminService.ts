import { PageQueryModel } from '../../types';
// import setDataValue from '../../utils/setDataValue';
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

	addAdmin(data: any) {
		console.log(`----------------------`);
		console.log(data);
		// const admin = Admin.build(data);
		// setDataValue(admin, data);
		// return admin.save();
		return Admin.create(data);
	}

	deleteById(id: number) {
		return Admin.destroy({ where: { id } });
	}

	updateById(id: number, data: any) {
		return Admin.update(data, { where: { id } });
	}
}

export default new AdminService();

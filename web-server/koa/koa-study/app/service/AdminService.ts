import Admin from '../model/Admin';

class AdminService {
	getAdmin() {
		return Admin.findOne();
	}
}

export default new AdminService();

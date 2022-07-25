import { Request, Response, NextFunction } from 'express';

class LoginController {
	index(req: Request, res: Response, next: NextFunction) {
		res.end('login');
	}
}

export default new LoginController();

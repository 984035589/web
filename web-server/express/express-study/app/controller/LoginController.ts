import { Request, Response, NextFunction } from 'express';

class LoginController {
	index(req: Request, res: Response, next: NextFunction) {
		res.json({ userName: req.params.userName, ...req.body });
	}
}

export default new LoginController();

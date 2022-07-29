import { Request, Response, NextFunction } from 'express';
import { verify } from '../../utils/auth';
import response from '../../utils/response';

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers['authorization'];
	if (token !== undefined && token !== '') {
		const { error } = verify(token);
		if (error !== null) {
			response.error(res, (error as any).message);
			return;
		} else {
			return next();
		}
	}
	response.error(res, 'authorization 不能为空');
	return;
};

export default AuthMiddleware;

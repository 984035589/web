import { Request, NextFunction, Response } from 'express';
import reponse from '../../utils/response';

const SessionMiddleware = (req: Request, res: Response, next: NextFunction) => {
	if (!(req.session as unknown as any).user) {
		reponse.error(res, '用户未登录');
	}
	next();
};

export default SessionMiddleware;

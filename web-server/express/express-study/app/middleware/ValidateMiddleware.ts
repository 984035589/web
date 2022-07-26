import { Request, NextFunction, Response } from 'express';
import response from '../../utils/response';
import validate from '../../utils/validate';
import { Rules } from 'async-validator';

function ValidateMiddleware<T>(rules: Rules) {
	return async (req: Request, res: Response, next: NextFunction) => {
		const data = await validate<T>(req.body, rules);
		if (data.error) {
			response.error(res, data.error);
			return;
		}
		next();
	};
}

export default ValidateMiddleware;

import { Request, NextFunction, Response } from 'express';
import { accessLogger, errorLogger } from '../logger';

const httpLogCommon = (request: Request) => {
	return `Request: method: ${request.method}, path: ${request.path}, query: ${JSON.stringify(request.query)}, ua: ${
		request.headers['user-agent']
	}`;
};

const AccessLogMiddleware = (req: Request, res: Response, next: NextFunction) => {
	accessLogger.info(httpLogCommon(req));
	return next();
};

const ErrorLogMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
	if (err) {
		errorLogger.error(err.message, httpLogCommon(req));
		return res.status(500).send({ code: 1, message: err.message });
	}
	next();
};

const NotFoundLogMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const msg = '路径不存在';
	errorLogger.error(msg, httpLogCommon(req));
	res.status(404).send({ code: 1, msg });
};

export { ErrorLogMiddleware, NotFoundLogMiddleware };

export default AccessLogMiddleware;

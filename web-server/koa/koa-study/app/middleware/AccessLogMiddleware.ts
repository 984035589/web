import { Context, Next } from 'koa';
import { accessLogger } from '../logger';

const AccessLogMiddleware = (ctx: Context, next: Next) => {
	const logStr = `method: ${ctx.method}, path: ${ctx.path}, query: ${JSON.stringify(
		ctx.query
	)}, ua: ${ctx.headers['user-agent']}`;
	accessLogger.info(logStr);
	return next();
};

export default AccessLogMiddleware;

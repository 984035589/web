import { Context, Next } from 'koa';
import { verify } from '../../utils/auth';

const AuthMiddleware = (ctx: Context, next: Next) => {
	const token = ctx.headers['authorization'];
	if (token !== undefined && token !== '') {
		const { error } = verify(token);
		if (error !== null) {
			ctx.body = {
				msg: (error as any).message,
				code: 1
			};
			return;
		} else {
			return next();
		}
	}
	ctx.body = {
		msg: 'authorization 不能为空',
		code: 1
	};
	return;
};

export default AuthMiddleware;

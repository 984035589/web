import { Context } from 'koa';

function success<T>(ctx: Context, data: T, msg: string = 'success', code: number = 0) {
	ctx.body = {
		data,
		msg,
		code
	};
}

function error(ctx: Context, msg: string = 'error', data: {} = {}, code: number = 1) {
	ctx.body = {
		msg,
		data,
		code
	};
}

export default {
	success,
	error
};

import { Response } from 'express';

function success<T>(res: Response, data: T, msg: string = 'success', code: number = 0) {
	res.json({
		data,
		msg,
		code
	});
}

function error(res: Response, msg: string = 'error', data: {} = {}, code: number = 1) {
	res.json({
		data,
		msg,
		code
	});
}

export default {
	success,
	error
};

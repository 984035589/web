import { Context } from 'koa';

class UploadController {
	async upload(ctx: Context) {
		// ctx.req.on('data', (chunk) => {
		// 	console.log(chunk);
		// });
		ctx.request.req.on('data', () => {
			console.log(`-----------`);
		});
		const res = ctx.request.req.read(1024);
		console.log(res);
		// console.log(ctx.request.files, ctx.request.ip);
		ctx.body = 1;
	}
}

export default new UploadController();

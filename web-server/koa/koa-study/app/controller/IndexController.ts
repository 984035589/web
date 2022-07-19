import { Context } from 'koa';

class IndexController {
	async index(ctx: Context) {
		ctx.body = ['1', 2, 3];
	}
}

export default new IndexController();

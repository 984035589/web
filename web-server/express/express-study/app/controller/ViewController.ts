import { Request, Response, NextFunction } from 'express';

class ViewController {
	async index(req: Request, res: Response) {
		res.render('index.art', {
			user: {
				name: 'art',
				tags: ['art', 'template', 'nodejs']
			}
		});
	}
}

export default new ViewController();

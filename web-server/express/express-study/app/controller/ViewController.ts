import { Request, Response, NextFunction } from 'express';

class ViewController {
	index(req: Request, res: Response) {
		res.render('index', {
			user: {
				name: 'art',
				tags: ['art', 'template', 'nodejs']
			}
		});
	}

	login(req: Request, res: Response) {
		res.render('login', {
			isLogin: true
		});
	}

	register(req: Request, res: Response) {
		res.render('login');
	}
}

export default new ViewController();

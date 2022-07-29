import { Express } from 'express';
import path from 'path';

export default function (app: Express) {
	// 模板引擎art
	app.engine('art', require('express-art-template'));
	app.set('view options', {
		debug: process.env.NODE_ENV !== 'production'
	});
	app.set('views', path.join(__dirname)); // 模板目录
	app.set('view engine', 'art');
}

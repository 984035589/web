import dotenv from 'dotenv';
dotenv.config();

import db from './db';
db();

import Koa from 'koa';
import KoaStatic from 'koa-static';
import koaBody from 'koa-body';
import router from './router';
import path from 'path';

import { Server } from 'http';
import AccessLogMiddleware from './middleware/AccessLogMiddleware';

const app = new Koa();

app.use(KoaStatic(path.join(__dirname, '../static')))
	.use(
		koaBody({
			multipart: true,
			formidable: { maxFileSize: 200 * 1024 * 1024 }
		})
	)
	.use(AccessLogMiddleware)
	.use(router.routes());

const run = (port: number): Server => {
	return app.listen(port);
};

export default run;

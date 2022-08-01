import dotenv from 'dotenv';
dotenv.config();

import db from './db';
db();

import express, { Response } from 'express';
import router from './router';
import AccessLogMiddleware, { ErrorLogMiddleware, NotFoundLogMiddleware } from './middleware/LogMiddleware';
import morgan from 'morgan';
import responseTime from 'response-time';
import art from '../views';
import path from 'path';

const app = express();

art(app);
app.use('/static', [express.static(path.join(__dirname, '../public/')), express.static(path.join(__dirname, '../node_modules/vue/'))]);

app.use(
	responseTime((req, res: Response, time) => {
		res.setHeader('x-response-time', time);
	})
)
	.use(morgan('dev'))
	.use(express.json()) // raw
	// .use(formidable()) // form-data
	.use(express.urlencoded({ extended: true })) // x-www-form-urlencoded
	.use(AccessLogMiddleware)
	.use(router)
	.use(ErrorLogMiddleware)
	.use(NotFoundLogMiddleware);

export default function run(port: number) {
	return app.listen(port);
}

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
import session from 'express-session';
import config from './config';
import { createClient } from 'redis';

const RedisStore = require('connect-redis')(session);
let redisClient = createClient({ url: 'redis://@124.220.180.249:6379' });
redisClient.connect().catch(console.error);

const app = express();

app.use(
	session({
		secret: config.session.secret as string,
		resave: false,
		saveUninitialized: true,
		cookie: {
			// secure: true
			maxAge: config.session.maxAge
		},
		name: config.session.name,
		store: new RedisStore({ client: redisClient })
	})
);
art(app);
app.use('/static', [
	express.static(path.join(__dirname, '../public/')),
	express.static(path.join(__dirname, '../node_modules/vue/')),
	express.static(path.join(__dirname, '../node_modules/axios/'))
]);

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

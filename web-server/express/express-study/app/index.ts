import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import router from './router';
import AccessLogMiddleware, { ErrorLogMiddleware, NotFoundLogMiddleware } from './middleware/LogMiddleware';
// import formidable from 'express-formidable';

const app = express();

app.use(express.json()) // raw
	// .use(formidable()) // form-data
	.use(express.urlencoded({ extended: false })) // x-www-form-urlencoded
	.use(AccessLogMiddleware)
	.use(router)
	.use(ErrorLogMiddleware)
	.use(NotFoundLogMiddleware);

export default function run(port: number) {
	return app.listen(port);
}

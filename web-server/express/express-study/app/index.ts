import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import router from './router';

const app = express();

app.get('/hello', (req, res) => {
	res.end('hello express');
});

app.use(router);

export default function run(port: number) {
	return app.listen(port);
}

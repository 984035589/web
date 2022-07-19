import run from '../app';
import request from 'supertest';
import { Server } from 'http';

describe('http', () => {
	let server: Server;
	beforeAll(() => {
		server = run(7878);
	});
	it('GET /admin', () => {
		return request(server)
			.get('/admin')
			.expect(200)
			.then((res) => {
				expect(res.body).toEqual(['1', 2, 3]);
			});
	});
});

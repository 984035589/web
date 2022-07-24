import run from '../app';
import { Server } from 'http';
import request from 'supertest';

describe('api test', () => {
	let server: Server;
	beforeAll(() => {
		server = run(7800);
	});
	it('GET /login', () => {
		request(server).get('/login').expect(200);
	});
});

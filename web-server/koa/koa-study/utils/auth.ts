import jwt from 'jsonwebtoken';
import config from '../app/config';

const JWT_SECRET = config.jwt.jwt_secret as string;

function sign(data: string | Buffer | object) {
	return jwt.sign({ admin: data }, JWT_SECRET, { expiresIn: config.jwt.jwt_expire });
}

function verify(token: string) {
	try {
		const decode = jwt.verify(token, JWT_SECRET);
		return {
			admin: decode,
			error: null
		};
	} catch (err) {
		return {
			admin: null,
			error: err
		};
	}
}

export { sign, verify };

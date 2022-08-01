const config = {
	server: {
		port: process.env.SERVER_PORT
	},
	db: {
		db_host: process.env.DB_HOST,
		db_port: process.env.DB_PORT,
		db_name: process.env.DB_NAME,
		db_user: process.env.DB_USER,
		db_password: process.env.DB_PASSWORD
	},
	log: {
		appenders: {
			error: { type: 'file', filename: 'logs/error.log' },
			access: { type: 'file', filename: 'logs/access.log', pattern: 'yyyy-MM-dd', category: 'http' },
			db: { type: 'file', filename: 'logs/db.log', pattern: 'yyyy-MM-dd' }
		},
		categories: {
			default: { appenders: ['error'], level: 'error' },
			access: { appenders: ['access'], level: 'info' },
			db: { appenders: ['db'], level: 'info' }
		}
	},
	jwt: {
		jwt_secret: process.env.JWT_SECRET,
		jwt_expire: process.env.JWT_EXPIRE
	},
	session: {
		secret: process.env.SESSION_SECRET,
		name: process.env.SESSION_NAME,
		maxAge: 30 * 24 * 60 * 60 * 1000
	},
	domain: {
		name: process.env.DOMAIN_NAME
	}
};

export default config;

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
			cheese: { type: 'file', filename: 'logs/cheese.log' },
			access: { type: 'file', filename: 'logs/access.log', pattern: 'yyyy-MM-dd', category: 'http' },
			db: { type: 'file', filename: 'logs/db.log', pattern: 'yyyy-MM-dd' }
		},
		categories: {
			default: { appenders: ['cheese'], level: 'info' },
			access: { appenders: ['access'], level: 'info' },
			db: { appenders: ['db'], level: 'info' }
		}
	},
	jwt: {
		jwt_secret: process.env.JWT_SECRET,
		jwt_expire: process.env.JWT_EXPIRE
	},
	session: {
		key: 'KOA',
		maxAge: 86400000,
		autoCommit: true,
		overwrite: true,
		httpOnly: true,
		signed: true,
		rolling: false,
		renew: false,
		secure: true,
		sameSite: null
	},
	domain: {
		name: process.env.DOMAIN_NAME
	}
};

export default config;

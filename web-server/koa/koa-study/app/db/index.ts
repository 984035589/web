import { Sequelize } from 'sequelize-typescript';
import config from '../config';
import path from 'path';
import { dbLogger } from '../logger';

const sequelize = new Sequelize(config.db.db_name as string, config.db.db_user as string, config.db.db_password, {
	port: config.db.db_port as unknown as number,
	host: config.db.db_host,
	dialect: 'mysql',
	define: {
		timestamps: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		deletedAt: 'deleted_at'
	},
	logging: (msg) => dbLogger.info(msg),
	models: [path.join(__dirname, '../model/**/*.ts'), path.join(__dirname, '../model/**/*.js')]
});

const db = async () => {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
};

export default db;

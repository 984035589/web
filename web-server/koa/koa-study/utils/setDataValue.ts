import { Model } from 'sequelize-typescript';

/**
 * 真的窒息，直接调用save或者create方法插入的数据库的数据是空
 * @param model
 * @param data
 */
export default function setDataValue<T extends Model>(model: T, data: any) {
	const keys = Object.keys(data);
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		model.setDataValue(key, data[key]);
	}
}

import { Model } from 'sequelize-typescript';
import { PageResModel } from '../types';

function paginate<T extends Model[]>(list: T, page: number = 1, pageSize: number = 10, total: number = 0) {
	return {
		list,
		page,
		pageSize,
		total
	};
}

export default paginate;

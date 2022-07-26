import { Model } from 'sequelize-typescript';

interface PageBaseModel {
	page: number;
	pageSize: number;
}

interface PageResModel<T extends Model[]> extends PageBaseModel {
	list: T;
	total: number;
}

interface PageQueryModel extends PageBaseModel {}

interface LoginFormModel {
	name: string;
	password: string;
}

export { PageResModel, PageQueryModel, LoginFormModel };

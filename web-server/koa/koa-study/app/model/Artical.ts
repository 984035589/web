import { Column, Model, Table } from 'sequelize-typescript';

@Table({ createdAt: false })
export default class Artical extends Model {
	@Column
	name: string = '';
}

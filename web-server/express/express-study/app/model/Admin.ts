import { Table, Model, Column } from 'sequelize-typescript';

@Table({})
export default class Admin extends Model {
	@Column
	name: string = '';

	@Column({})
	password: string = '';
}

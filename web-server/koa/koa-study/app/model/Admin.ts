import { Table, Model, Column, NotNull } from 'sequelize-typescript';
import moment from 'moment';

@Table({})
export default class Admin extends Model {
	@Column
	name: string = '';

	@Column({})
	password: string = '';
}

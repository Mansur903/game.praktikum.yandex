import {DataType, Model, Table, Column, PrimaryKey} from 'sequelize-typescript'

@Table({
	tableName: 'users'
})
export class User extends Model {
	@PrimaryKey
	@Column(DataType.INTEGER)
	user_id!: number

	@Column(DataType.STRING)
	avatar!: string

	@Column(DataType.STRING)
	display_name!: string

	@Column(DataType.STRING)
	login!: string
}

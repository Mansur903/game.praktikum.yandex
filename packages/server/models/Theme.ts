import {
	AllowNull,
	PrimaryKey,
	Column,
	Model,
	Table,
	AutoIncrement,
	DataType,
	Unique,
	Index
} from 'sequelize-typescript'
@Table({
	timestamps: false,
	paranoid: true,
	tableName: 'theme'
})
export class Theme extends Model<Theme> {
	@AutoIncrement
	@PrimaryKey
	@Column(DataType.INTEGER)
	override id!: number

	@AllowNull(false)
	@Unique
	@Index
	@Column(DataType.STRING)
	theme!: string

	@Column(DataType.STRING)
	description!: string
}

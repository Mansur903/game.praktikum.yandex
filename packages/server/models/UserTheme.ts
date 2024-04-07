import {
	AllowNull,
	PrimaryKey,
	Column,
	Model,
	Table,
	AutoIncrement,
	DataType,
	BelongsTo
} from 'sequelize-typescript'
import {Theme} from './Theme'
@Table({
	timestamps: false,
	paranoid: true,
	tableName: 'user_theme'
})
export class UserTheme extends Model {
	@AutoIncrement
	@PrimaryKey
	@Column(DataType.INTEGER)
	override id!: number

	@AllowNull(false)
	@BelongsTo(() => Theme, {foreignKey: 'themeId', as: 'theme_id'})
	@Column(DataType.INTEGER)
	themeId!: number

	@Column(DataType.STRING)
	device!: string
}

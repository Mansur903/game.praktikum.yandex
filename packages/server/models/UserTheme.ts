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
/**
 * TODO: Мб, когда появится юзер, добавить его id. Чтоб ориентироваться не только на device, но и на user_id
 */
export class UserTheme extends Model {
	@AutoIncrement
	@PrimaryKey
	@Column(DataType.INTEGER)
	override id!: number

	@AllowNull(false)
	@BelongsTo(() => Theme, {foreignKey: 'themeId', as: 'theme_id'})
	/**
	 * id темы
	 */
	@Column(DataType.INTEGER)
	themeId!: number
	/**
	 * Уникальный ключ, генерируемый на фронте, чтобы запоминать, что выбрал не авторизированный пользователь.
	 */
	@Column(DataType.STRING)
	device!: string
}

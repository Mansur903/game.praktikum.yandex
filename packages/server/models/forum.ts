import {
	AllowNull,
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table
} from 'sequelize-typescript'
import {User} from './user'

@Table({
	tableName: 'forum'
})
export class Forum extends Model {
	@AllowNull(false)
	@Column(DataType.STRING)
	name!: string

	@AllowNull(false)
	@Column(DataType.INTEGER)
	comments_count!: number

	@ForeignKey(() => User)
	@AllowNull(false)
	@Column(DataType.INTEGER)
	user_id!: number

	@BelongsTo(() => User)
	user!: User
}

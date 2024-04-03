import {
	DataType,
	Model,
	Table,
	Column,
	ForeignKey,
	BelongsTo,
	AllowNull
} from 'sequelize-typescript'
import {User} from './user'

@Table({
	tableName: 'topics'
})
export class Topics extends Model {
	@AllowNull(false)
	@Column(DataType.INTEGER)
	topic_id!: number

	@AllowNull(false)
	@Column(DataType.STRING)
	topic_name!: string

	@Column(DataType.STRING)
	topic_content!: string

	@ForeignKey(() => User)
	@AllowNull(false)
	@Column(DataType.INTEGER)
	user_id!: number

	@BelongsTo(() => User)
	user!: User
}

import {
	DataType,
	Model,
	Table,
	Column,
	ForeignKey,
	AllowNull,
	PrimaryKey,
	AutoIncrement
} from 'sequelize-typescript'
import {User} from './user'

@Table({
	tableName: 'topics',
	timestamps: false
})
export class Topic extends Model {
	@AutoIncrement
	@PrimaryKey
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
}

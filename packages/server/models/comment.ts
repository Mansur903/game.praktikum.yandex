import {
	AllowNull,
	PrimaryKey,
	Column,
	ForeignKey,
	Model,
	Table,
	AutoIncrement,
	DataType,
	Index
} from 'sequelize-typescript'

import {Topic} from './topic'
import {User} from './user'

@Table({
	tableName: 'comments',
	timestamps: false
})
export class Comment extends Model {
	@AutoIncrement
	@PrimaryKey
	@Column(DataType.INTEGER)
	comment_id!: number

	@ForeignKey(() => User)
	@AllowNull(false)
	@Column
	user_id!: number

	@ForeignKey(() => Topic)
	@Index({name: 'index_topic_id'})
	@AllowNull(false)
	@Column
	topic_id!: number

	@AllowNull(false)
	@Column
	content!: string
}

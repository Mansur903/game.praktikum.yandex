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

import {User} from './user'
import {Comment} from './comment'

@Table({
	tableName: 'commentsReply',
	timestamps: false
})
export class CommentReply extends Model {
	@AutoIncrement
	@PrimaryKey
	@Column(DataType.INTEGER)
	comment_reply_id!: number

	@ForeignKey(() => Comment)
	@Index({name: 'index_comment_id'})
	@Column(DataType.INTEGER)
	comment_id!: number

	@ForeignKey(() => User)
	@AllowNull(false)
	@Column
	user_id!: number

	@AllowNull(false)
	@Column
	content!: string
}

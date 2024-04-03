import {
	AllowNull,
	BelongsTo,
	Column,
	ForeignKey,
	Model,
	Table
} from 'sequelize-typescript'

import {Topics} from './topic'
import {User} from './user'

@Table({tableName: 'comments'})
export class ForumMessage extends Model {
	@ForeignKey(() => User)
	@AllowNull(false)
	@Column
	user_id!: number

	@AllowNull(false)
	@Column
	topic_id!: number

	@AllowNull(false)
	@Column
	content!: string

	@BelongsTo(() => Topics, 'topic_id')
	topic!: Topics

	@BelongsTo(() => User)
	user!: User
}

import {
	AllowNull,
	BelongsTo,
	Column,
	ForeignKey,
	Model,
	Table
} from 'sequelize-typescript'

import {Topic} from './topic'
import {User} from './user'

@Table({tableName: 'comments'})
export class Comment extends Model {
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

	@BelongsTo(() => Topic, 'topic_id')
	topic!: Topic

	@BelongsTo(() => User)
	user!: User
}

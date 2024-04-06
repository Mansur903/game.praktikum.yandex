import {DataType, Model, Table, Column, Index} from 'sequelize-typescript'

@Table({
	tableName: 'topic-reactions-table4'
})
export class TopicReaction extends Model {
	@Column(DataType.INTEGER)
	@Index
	topic_id!: number

	@Column(DataType.UUID)
	reaction_id!: string

	@Column(DataType.STRING)
	reaction!: string
}

import {DataType, Model, Table, Column, PrimaryKey} from 'sequelize-typescript'

@Table({
	tableName: 'topic-reactions-table3'
})
export class TopicReaction extends Model {
	@PrimaryKey
	@Column(DataType.INTEGER)
	topic_id!: number

	@PrimaryKey
	@Column(DataType.UUID)
	reaction_id!: number

	@Column(DataType.STRING)
	reaction!: string
}

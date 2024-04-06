import {DataType, Model, Table, Column, PrimaryKey} from 'sequelize-typescript'

@Table({
	tableName: 'topic-reactions-table'
})
export class TopicReaction extends Model {
	@PrimaryKey
	@Column(DataType.INTEGER)
	topic_id!: number

	@Column(DataType.JSON)
	reactions!: string[]
}

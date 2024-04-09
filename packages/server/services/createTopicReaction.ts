import {TopicReaction} from '../models/reaction'
import {v4 as uuidv4} from 'uuid'
import {Request as ExpressRequest, Response as ExpressResponse} from 'express'
import {sequelize} from '../initDatabase'

// Контроллер для добавления реакции к топику
export const createTopicReaction = async (
	req: ExpressRequest,
	res: ExpressResponse
): Promise<void> => {
	const {topicId, reactions}: {topicId: number; reactions: string[]} = req.body

	try {
		const result = await sequelize.transaction(async (t) => {
			for (let i = 0; i < reactions.length; i++) {
				const reaction = reactions[i]
				await TopicReaction.create(
					{
						topic_id: topicId,
						reaction_id: uuidv4(),
						reaction: reaction
					},
					{transaction: t}
				)
			}
		})

		console.log(result)

		console.log(`Реакции успешно добавлены к топику ${topicId}`)
		res.status(200).json({message: `Реакции успешно добавлены к топику ${topicId}`})
	} catch (error) {
		console.log(`Ошибка при добавлении реакций к топику ${topicId}: ${error}`)
		res.status(500).json({error: `Ошибка при добавлении реакций к топику ${topicId}`})
	}
}

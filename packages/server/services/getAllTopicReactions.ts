import {TopicReaction} from '../models/reaction'
import {Request as ExpressRequest, Response as ExpressResponse} from 'express'

// Контроллер для получения реакций к топику
export const getAllTopicReactions = async (
	req: ExpressRequest,
	res: ExpressResponse
): Promise<void> => {
	const {topicID}: {topicID?: number} = req.query
	console.log('topicId: ', topicID)

	try {
		const topicReactions = await TopicReaction.findAll({
			where: {
				topic_id: topicID
			}
		})

		if (topicReactions) {
			console.log(`Reactions of topic ${topicID}: ${topicReactions}`)

			res.status(200).json({reactions: topicReactions})
		} else {
			res.status(404).json({error: 'Реакции на топик не найдены'})
		}
	} catch (error) {
		console.error('Ошибка при получении записей из таблицы TopicReaction:', error)

		res.status(500).json({error: 'Ошибка при получении реакций'})
	}
}

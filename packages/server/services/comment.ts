import {Request, Response} from 'express'

import {Comment} from '../models/comment'

export const getCommentsForTopic = async (req: Request, res: Response) => {
	const {topic_id} = req.params

	try {
		const comments = await Comment.findAll({
			where: {
				topic_id: topic_id
			}
		})
		if (comments) {
			res.status(200).json(comments)
		} else {
			res.status(404).json({error: 'Комментарии не найдены'})
		}
	} catch (error) {
		console.error('Ошибка при получении комментариев:', error)
		res.status(500).json({error: 'Ошибка при получении комментариев'})
	}
}

export const createComment = async (req: Request, res: Response) => {
	const {topic_id} = req.params
	const {user_id, content} = req.body

	try {
		const newComment = await Comment.create({
			user_id,
			topic_id,
			content
		})

		console.log('New comment added:', newComment)
		res.status(201).json(newComment)
	} catch (error) {
		console.error('Error adding comment to topic:', error)
		res.status(500).json({error: 'Error adding comment to topic'})
	}
}

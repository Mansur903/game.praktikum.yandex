import {Request, Response} from 'express'

import {CommentReply} from '../models/commentReplies'

export const getCommentReplies = async (req: Request, res: Response) => {
	const {comment_id} = req.params

	try {
		const commentReplies = await CommentReply.findAll({
			where: {
				comment_id: comment_id
			}
		})
		if (commentReplies) {
			res.status(200).json(commentReplies)
		} else {
			res.status(404).json({error: 'Ответы на комментарии не найдены'})
		}
	} catch (error) {
		console.error('Ошибка при получении ответов на комментарий:', error)
		res.status(500).json({error: 'Ошибка при получении ответов на комментарий'})
	}
}

export const createCommentReply = async (req: Request, res: Response) => {
	const {comment_id} = req.params
	const {user_id, content} = req.body

	try {
		const newCommentReply = await CommentReply.create({
			comment_id,
			user_id,
			content
		})

		console.log('Comment reply added:', newCommentReply)
		res.status(201).json(newCommentReply)
	} catch (error) {
		console.error('Error adding reply to comment:', error)
		res.status(500).json({error: 'Error adding reply to comment'})
	}
}

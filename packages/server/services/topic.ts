import {Request, Response} from 'express'

import {Topic} from '../models/topic'

export const getTopics = async (_: Request, res: Response) => {
	try {
		const topics = await Topic.findAll()
		console.log(topics)
		res.status(200).json(topics)
	} catch (error) {
		console.error('Ошибка при получении топиков:', error)
		res.status(500).json({error: 'Ошибка при получении топиков'})
	}
}

export const getTopic = async (req: Request, res: Response): Promise<void> => {
	const {id} = req.params

	try {
		const topic = await Topic.findByPk(id)
		if (topic) {
			res.status(200).json(topic)
		} else {
			res.status(404).json({error: 'Топик не найден'})
		}
	} catch (error) {
		console.error('Ошибка при получении топика:', error)
		res.status(500).json({error: 'Ошибка при получении топика'})
	}
}

export const createTopic = async (req: Request, res: Response): Promise<void> => {
	const {topic_name, topic_content, user_id} = req.body

	console.log(req.body)

	try {
		console.log('creating topic')

		const newTopic = await Topic.create({topic_name, topic_content, user_id})
		res.status(201).json(newTopic)
	} catch (error) {
		console.error('Ошибка при создании топика:', error)
		res.status(500).json({error: 'Ошибка при создании топика'})
	}
}

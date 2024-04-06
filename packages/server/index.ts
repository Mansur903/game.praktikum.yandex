import cors from 'cors'
import dotenv from 'dotenv'
import express, {Request as ExpressRequest, Response as ExpressResponse} from 'express'
import {createServer as createViteServer} from 'vite'
import type {ViteDevServer} from 'vite'
import * as fs from 'fs'
import * as path from 'path'
import {createClientAndConnect} from './db'
import {forumCallback} from './routes/Forum'
import {dbConnect} from './initDatabase'
import {TopicReaction} from './models/reaction'

dotenv.config()

const isDev = () => process.env.NODE_ENV === 'development'

async function startServer() {
	await dbConnect()
	const app = express()
	app.use(cors())
	const port = Number(process.env.SERVER_PORT) || 3001
	createClientAndConnect()

	let vite: ViteDevServer | undefined
	const distPath = path.dirname(require.resolve('client/dist/index.html'))
	const srcPath = path.dirname(require.resolve('client/index.html'))
	const ssrClientPath = require.resolve('client/ssr-dist/client.cjs')

	if (isDev()) {
		vite = await createViteServer({
			server: {middlewareMode: true},
			root: srcPath,
			appType: 'custom'
		})

		app.use(vite.middlewares)
	}

	// Контроллер для получения реакций к топику
	const getAllTopicReactions = async (
		req: ExpressRequest,
		res: ExpressResponse
	): Promise<void> => {
		const {topicID}: {topicID?: number} = req.query
		console.log('topicId: ', topicID)

		try {
			const topicReactions = await TopicReaction.findOne({
				where: {
					topic_id: topicID
				}
			})

			if (topicReactions) {
				console.log(`Reactions of topic ${topicID}: ${topicReactions.reactions}`)

				res.status(200).json({reactions: topicReactions.reactions})
			} else {
				res.status(404).json({error: 'Реакции на топик не найдены'})
			}
		} catch (error) {
			console.error('Ошибка при получении записей из таблицы TopicReaction:', error)

			res.status(500).json({error: 'Ошибка при получении реакций'})
		}
	}

	// Контроллер для добавления реакции к топику
	const createTopicReaction = async (
		req: ExpressRequest,
		res: ExpressResponse
	): Promise<void> => {
		const {topicId, reaction}: {topicId: number; reaction: string[]} = req.body

		try {
			// Проверяем, есть ли у топика реакции
			const existingTopicReaction = await TopicReaction.findOne({
				where: {
					topic_id: topicId
				}
			})

			if (existingTopicReaction) {
				// Добавляем новые реакций к массиву реакций
				existingTopicReaction.reactions = existingTopicReaction.reactions.concat(reaction)
				await existingTopicReaction.save()
			} else {
				// Создаём новую запись, если её нет
				const newTopicReaction = TopicReaction.build({
					topic_id: topicId,
					reactions: reaction
				})
				await newTopicReaction.save()
			}

			console.log(`Реакции успешно добавлены к топику ${topicId}`)

			res.status(200).json({message: `Реакции успешно добавлены к топику ${topicId}`})
		} catch (error) {
			console.log(`Ошибка при добавлении реакций к топику ${topicId}`)

			res.status(500).json({error: `Ошибка при добавлении реакций к топику ${topicId}`})
		}
	}

	// Middleware для обработки JSON данных
	app.use(express.json())

	// Маршрут для добавления реакции к топику
	app.post('/api/emojis/add', createTopicReaction)

	// Маршрут для получения реакций к топику
	app.get('/api/emojis/get', getAllTopicReactions)

	app.get('/api', (_, res) => {
		res.json('👋 Howdy from the server :)')
	})

	if (!isDev()) {
		app.use('/assets', express.static(path.resolve(distPath, 'assets')))
	}

	app.get('/user', (_, res) => {
		res.json({login: 'Степа', password: 'Степанов'})
	})

	app.get('/forum123', forumCallback)

	app.use('*', async (req, res, next) => {
		const url = req.originalUrl

		try {
			let template: string

			if (!isDev()) {
				template = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8')
			} else {
				template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8')

				template = await vite!.transformIndexHtml(url, template)
			}

			let render: (req: ExpressRequest) => Promise<{html: string; initialState: unknown}>

			if (!isDev()) {
				render = (await import(ssrClientPath)).render
			} else {
				render = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx'))).render
			}

			const {html: appHtml, initialState} = await render(req)

			const html = template
				.replace(`<!--ssr-outlet-->`, appHtml)
				.replace(
					`<!--ssr-initial-state-->`,
					`<script>window.APP_INITIAL_STATE = ${JSON.stringify(initialState)}</script>`
				)

			// console.log({html})

			res.status(200).set({'Content-Type': 'text/html'}).end(html)
		} catch (e) {
			if (isDev()) {
				vite!.ssrFixStacktrace(e as Error)
			}
			next(e)
		}
	})

	app.listen(port, () => {
		console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
	})
}

startServer()

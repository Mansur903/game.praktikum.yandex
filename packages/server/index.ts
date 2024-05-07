import cors from 'cors'
import dotenv from 'dotenv'
import express, {NextFunction, Request, Response} from 'express'
import * as fs from 'fs'
import * as path from 'path'
import type {ViteDevServer} from 'vite'
import {createServer as createViteServer} from 'vite'
import xssShield from 'xss-shield/build/main/lib/xssShield'

import {dbConnect} from './initDatabase'
import {createComment, getComment, getCommentsForTopic} from './services/comment'
import {createCommentReply, getCommentReplies} from './services/commentReplies'
import {createTopicReaction} from './services/createTopicReaction'
import {getAllTopicReactions} from './services/getAllTopicReactions'
import {createTopic, getTopic, getTopics} from './services/topic'
import {createTheme, getTheme, setTheme} from './services/userTheme'

dotenv.config()
const port = Number(process.env.SERVER_PORT) || 3001
const isDev = () => process.env.NODE_ENV === 'development'

async function startServer() {
	await dbConnect()
	const app = express()
	app.use(cors())
	app.use(express.json())
	app.use(express.urlencoded({extended: true}))
	app.use(xssShield())

	let vite: ViteDevServer | undefined
	let distPath = ''
	let srcPath = ''
	let ssrClientPath = ''

	if (!isDev()) {
		distPath = path.dirname(require.resolve('../client/index.html'))
		ssrClientPath = require.resolve('../ssr/client.cjs')
	} else {
		srcPath = path.dirname(require.resolve('client/index.html'))
	}

	if (isDev()) {
		vite = await createViteServer({
			server: {middlewareMode: true},
			root: srcPath,
			appType: 'custom'
		})

		app.use(vite.middlewares)
	}

	app.get('/api/topics', getTopics)
	app.get('/api/topics/:id', getTopic)
	app.post('/api/topics', createTopic)

	app.get('/api/topics/:topic_id/comments', getCommentsForTopic)
	app.get('/api/comments/:comment_id', getComment)
	app.post('/api/topics/:topic_id/comments', createComment)

	app.get('/api/comments/:comment_id/replies', getCommentReplies)
	app.post('/api/comments/:comment_id/replies', createCommentReply)

	app.post('/api/emojis/add', createTopicReaction)
	app.get('/api/emojis/get', getAllTopicReactions)

	if (!isDev()) {
		app.use('/assets', express.static(path.resolve(distPath, 'assets')))
	}

	app.get('/user', (_, res) => {
		res.json({login: 'Степа', password: 'Степанов'})
	})

	app.put('/theme', createTheme).post('/theme', setTheme).get('/theme/:id', getTheme)

	app.use('*', async (req: Request, res: Response, next: NextFunction) => {
		const url = req.originalUrl

		try {
			let template: string

			if (!isDev()) {
				template = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8')
			} else {
				template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8')

				template = await vite!.transformIndexHtml(url, template)
			}

			let render: (req: Request) => Promise<{html: string; initialState: unknown}>

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
			const headers = {
				'Content-Type': 'text/html',
				'Content-Security-Policy':
					"default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' ws://localhost:24678/ https://ya-praktikum.tech/api/v2/ https://oauth.yandex.ru/authorize;"
			}
			res.status(200).set(headers).end(html)
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

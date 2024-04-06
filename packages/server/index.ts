import cors from 'cors'
import dotenv from 'dotenv'
import express, {Request as ExpressRequest} from 'express'
import {createServer as createViteServer} from 'vite'
import type {ViteDevServer} from 'vite'
import * as fs from 'fs'
import * as path from 'path'
import {createClientAndConnect} from './db'
import {dbConnect} from './initDatabase'
import {getTopics, getTopic, createTopic} from './services/topic'
import {getCommentsForTopic, createComment, getComment} from './services/comment'
import {getCommentReplies, createCommentReply} from './services/commentReplies'
import {validateXss, xssErrorHandler} from './middlewares/xss'

dotenv.config()

const isDev = () => process.env.NODE_ENV === 'development'

async function startServer() {
	await dbConnect()
	const app = express()
	app.use(cors())
	app.use(express.json())
	app.use(express.urlencoded({extended: true}))
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

	app.get('/api/topics', getTopics)
	app.get('/api/topics/:id', getTopic)
	app.post('/api/topics', validateXss(), xssErrorHandler, createTopic)

	app.get('/api/topics/:topic_id/comments', getCommentsForTopic)
	app.get('/api/comments/:comment_id', getComment)
	app.post(
		'/api/topics/:topic_id/comments',
		validateXss(),
		xssErrorHandler,
		createComment
	)

	app.get('/api/comments/:comment_id/replies', getCommentReplies)
	app.post(
		'/api/comments/:comment_id/replies',
		validateXss(),
		xssErrorHandler,
		createCommentReply
	)

	if (!isDev()) {
		app.use('/assets', express.static(path.resolve(distPath, 'assets')))
	}

	app.get('/user', (_, res) => {
		res.json({login: 'Степа', password: 'Степанов'})
	})

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

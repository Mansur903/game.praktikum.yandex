import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import {dirname, resolve} from 'path'
import {ViteDevServer, createServer} from 'vite'

import {allPath} from './src'

dotenv.config()

export const isDev = () => process.env.NODE_ENV === 'development'
export const distPath = dirname(require.resolve('client/dist/index.html'))
export const srcPath = dirname(require.resolve('client/index.html'))
export const ssrClientPath = require.resolve('client/ssr-dist/client.cjs')
export let vite: ViteDevServer | undefined

const startServer = async () => {
	const app = express()
	const port = Number(process.env.SERVER_PORT) || 3001

	app.use(cors())

	app.get('/api', (_, res) => {
		res.json('👋 Howdy from the server :)')
	})

	// if (!isDev()) {
	app.use('/assets', express.static(resolve(distPath, 'assets')))
	// }

	if (isDev()) {
		vite = await createServer({
			server: {middlewareMode: true},
			root: srcPath,
			appType: 'custom'
		})

		app.use(vite.middlewares)
	}

	app.use('*', allPath)

	app.listen(port, () => {
		console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
	})
}

startServer()

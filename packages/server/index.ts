import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import * as fs from 'fs'
import * as path from 'path'

dotenv.config()

async function startServer() {
  console.log(1111)
	const app = express()
	app.use(cors())
	const port = Number(process.env.SERVER_PORT) || 3001

	app.get('/api', (_, res) => {
		res.json('👋 Howdy from the server :)')
	})
  const distPath = path.dirname(require.resolve('client/dist/index.html'))
  const ssrClientPath = require.resolve('client/ssr-dist/client.cjs')

  app.use('/assets', express.static(path.resolve(distPath, 'assets')))

	app.use('*', async (_, res, next) => {

		try {

			const template = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8')
			const {render} = await import(ssrClientPath)
			const appHtml = await render()

			const html = template.replace(`<!--ssr-outlet-->`, appHtml)

			res.status(200).set({'Content-Type': 'text/html'}).end(html)
		} catch (e) {
			next(e)
		}
	})

	app.listen(port, () => {
		console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
	})
}

startServer()

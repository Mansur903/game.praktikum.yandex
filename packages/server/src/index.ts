import {NextFunction, Request, Response} from 'express'
import {readFileSync} from 'fs'
import {resolve} from 'path'

import {distPath, isDev, srcPath, ssrClientPath, vite} from '../index'

export const allPath = async (req: Request, res: Response, next: NextFunction) => {
	const url = req.originalUrl
	try {
		let template: string
		let render: () => Promise<string>
		if (!isDev()) {
			template = readFileSync(resolve(distPath, 'index.html'), 'utf-8')
		} else {
			template = readFileSync(resolve(srcPath, 'index.html'), 'utf-8')
			template = (await vite?.transformIndexHtml(url, template)) ?? ''
		}
		if (!isDev()) {
			render = (await import(ssrClientPath)).render
		} else {
			render = (await vite?.ssrLoadModule(resolve(srcPath, 'ssr.tsx')))?.render
		}

		const appHtml = await render()
		const html = template.replace(`<!--ssr-outlet-->`, appHtml)

		res.status(200).set({'Content-Type': 'text/html'}).end(html)
	} catch (e) {
		if (isDev()) {
			vite?.ssrFixStacktrace(e as Error)
		}
		next(e)
	}
}

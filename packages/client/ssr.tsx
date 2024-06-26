import {renderToString} from 'react-dom/server'
import {configureStore} from '@reduxjs/toolkit'
import {fetchUserThunk} from './src/store/slices/user'
import {Provider} from 'react-redux'
import {reducer} from './src/store/store'

import React from 'react'
import {Request as ExpressRequest} from 'express'
import {
	createStaticHandler,
	createStaticRouter,
	StaticRouterProvider
} from 'react-router-dom/server'
import {matchRoutes} from 'react-router-dom'
import {createFetchRequest, createUrl} from './ssr.utils'
import {routes} from './routes'
import {setPageHasBeenInitializedOnServer} from './src/store/slices/ssrSlice/ssrSlice'

export const render = async (req: ExpressRequest) => {
	const {query, dataRoutes} = createStaticHandler(routes)

	const fetchRequest = createFetchRequest(req)

	const context = await query(fetchRequest)

	if (context instanceof Response) {
		throw context
	}

	const store = configureStore({
		reducer
	})

	const url = createUrl(req)

	const foundRoutes: any[] | null = matchRoutes(routes, url)
	if (!foundRoutes) {
		throw new Error('Страница не найдена!')
	}

	const [
		{
			route: {fetchData}
		}
	] = foundRoutes

	if (typeof fetchData === 'function') {
		try {
			await fetchData({
				dispatch: store.dispatch,
				state: store.getState()
			})
		} catch (e) {
			console.log('Инициализация страницы произошла с ошибкой', e)
		}
	}

	store.dispatch(setPageHasBeenInitializedOnServer(true))

	const router = createStaticRouter(dataRoutes, context)

	await store.dispatch(fetchUserThunk())

	return {
		html: renderToString(
			<Provider store={store}>
				<StaticRouterProvider
					router={router}
					context={context}
				/>
			</Provider>
		),
		initialState: store.getState()
	}
}

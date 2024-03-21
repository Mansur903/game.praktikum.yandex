import {renderToString} from 'react-dom/server'
import {Provider} from 'react-redux'
import {Route, Routes} from 'react-router-dom'
import {StaticRouter} from 'react-router-dom/server'
import {createStore} from './src/store'

export const render = (url: string, initialState: string): string => {
	const store = createStore(JSON.parse(initialState))
	return renderToString(
		<Provider store={store}>
			<StaticRouter location={url}>
				<Routes>
					<Route
						path='/'
						Component={() => <div>hello</div>}
					/>
					<Route
						path='/2'
						Component={() => <div>hello2</div>}
					/>
				</Routes>
				{/* <App /> */}
			</StaticRouter>
		</Provider>
	)
}

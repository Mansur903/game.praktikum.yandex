import {renderToString} from 'react-dom/server'
import {Provider} from 'react-redux'
import {StaticRouter} from 'react-router-dom/server'
import App from './src/App'
import {createStore, RootState} from './src/store'

export const render = (url: string, initialState: RootState): string => {
	const store = createStore(initialState)
	return renderToString(
		<StaticRouter location={url}>
			<Provider store={store}>
				<App />
			</Provider>
		</StaticRouter>
	)
}

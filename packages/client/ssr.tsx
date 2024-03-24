import App from './src/App'
import {renderToString} from 'react-dom/server'
import {configureStore} from '@reduxjs/toolkit'
import {userModel} from './src/entities/user'
import {fetchUserThunk} from './src/entities/user'
import {Provider} from 'react-redux'

export async function render() {
	const {reducer} = userModel

	const store = configureStore({
		reducer
	})

	await store.dispatch(fetchUserThunk())
	console.log('store :', store.getState())

	return {
		html: renderToString(
			<Provider store={store}>
				<App />
			</Provider>
		),
		initialState: store.getState()
	}
}

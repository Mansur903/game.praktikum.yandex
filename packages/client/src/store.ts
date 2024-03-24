import {configureStore, combineReducers} from '@reduxjs/toolkit'
import userReducer from './entities/user/model'

const reducer = combineReducers({
	user: userReducer
})

declare global {
	interface Window {
		APP_INITIAL_STATE: RootState
	}
}

export const store: any = configureStore({
	reducer,
	preloadedState: typeof window === 'undefined' ? undefined : window.APP_INITIAL_STATE
})

console.log({store})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store

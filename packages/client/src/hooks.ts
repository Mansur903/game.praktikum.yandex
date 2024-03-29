import {useEffect} from 'react'
import type {AppDispatch, RootState, store} from './store'

import {
	setPageHasBeenInitializedOnServer,
	selectPageHasBeenInitializedOnServer
} from './entities/ssrSlice/ssrSlice'
import {PageInitArgs} from '../routes'
import type {TypedUseSelectorHook} from 'react-redux'
import {useDispatch, useSelector, useStore} from 'react-redux'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore: () => typeof store = useStore

type PageProps = {
	initPage: (data: PageInitArgs) => Promise<unknown>
}

export const usePage = ({initPage}: PageProps) => {
	const dispatch = useAppDispatch()
	const pageHasBeenInitializedOnServer = useAppSelector(
		selectPageHasBeenInitializedOnServer
	)

	const store = useAppStore()

	useEffect(() => {
		if (pageHasBeenInitializedOnServer) {
			dispatch(setPageHasBeenInitializedOnServer(false))
			return
		}

		initPage({dispatch, state: store.getState()})
	}, [])
}

import {FC, useEffect, useRef, useState, useCallback} from 'react'
import GameEngine from '../../engine/GameEngine'
import styles from './Game.module.scss'
import axios from 'axios'
import {GameState} from '../../types/enum/Game.enum'
import {useAppSelector, usePage} from '../../hooks'
import api from '../../api'
import {fetchUserThunk, selectUser} from '../../store/slices/user'
import {PageInitArgs} from '../../../routes'

const isCustomEvent = (event: Event): event is CustomEvent => {
	return 'detail' in event
}

const Game: FC = () => {
	const ref = useRef<HTMLCanvasElement>(null)
	const user = useAppSelector(selectUser)

	const toggleFullScreen = useCallback((e: React.KeyboardEvent) => {
		if (e.key === 'f' && !document.fullscreenElement) {
			document.documentElement.requestFullscreen()
		} else if (e.key === 'f' && document.exitFullscreen) {
			document.exitFullscreen()
		}
	}, [])
	usePage({initPage: initGamePage})
	const getWindowSize = () =>
		window
			? {
					innerWidth: window.innerWidth,
					innerHeight: window.innerHeight
			  }
			: null
	const [windowSize, setWindowSize] = useState<{
		innerWidth: number
		innerHeight: number
	} | null>(null)

	useEffect(() => {
		if (ref.current) {
			const eventHandler = (event: Event) => {
				if (!isCustomEvent(event)) throw Error('Not custom event')
				const result = event.detail
				if (result.currState === GameState.END) {
					const requestBody = {
						data: {
							score: result.currPoint,
							login: user?.login,
							avatar: user?.avatar
						},
						ratingFieldName: 'score',
						teamName: 'Fantastic4'
					}
					axios.post(api.leaderboard.addRecord, requestBody, {
						headers: {
							'Content-Type': 'application/json'
						},
						withCredentials: true
					})
				}
			}
			const game = new GameEngine(ref.current)
			game.addEventListener('changeState', eventHandler)
			game.start()
			return () => game.removeEventListener('changeState', eventHandler)
		}
		if (window) {
			setWindowSize(getWindowSize())
			const handleWindowResize = () => {
				setWindowSize(getWindowSize())
			}
			window?.addEventListener('resize', handleWindowResize)
			return () => {
				window?.removeEventListener('resize', handleWindowResize)
			}
		}
	}, [])

	return (
		<div
			className={styles.wrapper}
			onKeyDown={toggleFullScreen}>
			<canvas
				ref={ref}
				width={windowSize?.innerWidth}
				height={windowSize?.innerHeight}
			/>
		</div>
	)
}

export const initGamePage = async ({dispatch, state}: PageInitArgs) => {
	if (!selectUser(state)) {
		return dispatch(fetchUserThunk())
	}
}

export default Game

import {FC, useEffect, useRef, useState, useCallback} from 'react'
import GameEngine from '../../engine/GameEngine'
import styles from './Game.module.scss'
import axios from 'axios'
import {GameState} from '../../types/enum/Game.enum'
import {useAppSelector} from '../../hooks'
import api from '../../api'

const isCustomEvent = (event: Event): event is CustomEvent => {
	return 'detail' in event
}

const Game: FC = () => {
	const ref = useRef<HTMLCanvasElement>(null)
	const getWindowSize = () => {
		const {innerWidth, innerHeight} = window
		return {innerWidth, innerHeight}
	}
	const [windowSize, setWindowSize] = useState(getWindowSize())
	const user = useAppSelector((state) => state.user)

	const toggleFullScreen = useCallback((e: React.KeyboardEvent) => {
		if (e.key === 'f' && !document.fullscreenElement) {
			document.documentElement.requestFullscreen()
		} else if (e.key === 'f' && document.exitFullscreen) {
			document.exitFullscreen()
		}
	}, [])

	useEffect(() => {
		if (ref.current) {
			const eventHandler = (event: Event) => {
				if (!isCustomEvent(event)) throw Error('Not custom event')
				const result = event.detail
				if (result.currState === GameState.END) {
					const requestBody = {
						data: {
							score: result.currPoint,
							login: user.login,
							avatar: user.avatar
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

		const handleWindowResize = () => {
			setWindowSize(getWindowSize())
		}
		window.addEventListener('resize', handleWindowResize)
		return () => {
			window.removeEventListener('resize', handleWindowResize)
		}
	}, [])

	return (
		<div
			className={styles.wrapper}
			onKeyDown={toggleFullScreen}>
			<canvas
				ref={ref}
				width={windowSize.innerWidth}
				height={windowSize.innerHeight}
			/>
		</div>
	)
}

export default Game

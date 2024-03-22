import {FC, useEffect, useRef, useState} from 'react'
import GameEngine from '../../engine/GameEngine'
import styles from './Game.module.scss'
import axios from 'axios'
import {GameState} from '../../types/enum/Game.enum'
import {useAppSelector} from '../../hooks'

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
					axios.post('https://ya-praktikum.tech/api/v2/leaderboard', requestBody, {
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
		return
	}, [])

	return (
		<div className={styles.wrapper}>
			<canvas
				ref={ref}
				width={windowSize.innerWidth}
				height={windowSize.innerHeight}
			/>
		</div>
	)
}

export default Game

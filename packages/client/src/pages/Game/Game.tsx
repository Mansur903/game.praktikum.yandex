import {FC, useEffect, useRef, useState, useCallback} from 'react'
import GameEngine from '../../engine/GameEngine'
import styles from './Game.module.scss'
import {Typography} from '@mui/material'

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

	const [somePoint, setSomePoint] = useState<number>(0)

	const toggleFullScreen = useCallback((e: React.KeyboardEvent) => {
		if (e.key === 'f' && !document.fullscreenElement) {
			document.documentElement.requestFullscreen()
		} else if (document.exitFullscreen) {
			document.exitFullscreen()
		}
	}, [])

	useEffect(() => {
		if (ref.current) {
			const eventHandler = (event: Event) => {
				if (!isCustomEvent(event)) throw Error('Not custom event')
				console.info(event.detail)
				setSomePoint(event.detail.currPoint)
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
			<Typography variant='body1'>Текущий счет: {somePoint}</Typography>
			<canvas
				ref={ref}
				width={windowSize.innerWidth}
				height={windowSize.innerHeight}
			/>
		</div>
	)
}

export default Game

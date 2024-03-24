import {FC, useCallback, useEffect, useRef, useState} from 'react'

import GameEngine from '../../engine/GameEngine'
import styles from './Game.module.scss'

const Game: FC = () => {
	const ref = useRef<HTMLCanvasElement>(null)
	const getWindowSize = () => {
		const {innerWidth, innerHeight} = window
		return {innerWidth, innerHeight}
	}
	const [windowSize, setWindowSize] = useState(getWindowSize())

	useEffect(() => {
		if (ref.current) {
			const game = new GameEngine(ref.current)
			game.start()
		}
		const handleWindowResize = () => {
			setWindowSize(getWindowSize())
		}
		window.addEventListener('resize', handleWindowResize)
		return () => {
			window.removeEventListener('resize', handleWindowResize)
		}
	}, [])

	const isPointerLockActive = () => {
		return document.pointerLockElement === ref.current
	}

	const togglePointerLock = () => {
		if (isPointerLockActive()) {
			document.exitPointerLock()
		} else {
			ref.current!.requestPointerLock()
		}
	}

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'f') {
			togglePointerLock()
		}
	}

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
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

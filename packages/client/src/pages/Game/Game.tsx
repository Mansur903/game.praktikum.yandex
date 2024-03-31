import {FC, useEffect, useRef, useState} from 'react'

import GameEngine from '../../engine/GameEngine'
import styles from './Game.module.scss'

const Game: FC = () => {
	const ref = useRef<HTMLCanvasElement>(null)
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
			const game = new GameEngine(ref.current)
			game.start()
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
		<div className={styles.wrapper}>
			<canvas
				ref={ref}
				width={windowSize?.innerWidth}
				height={windowSize?.innerHeight}
			/>
		</div>
	)
}

export default Game

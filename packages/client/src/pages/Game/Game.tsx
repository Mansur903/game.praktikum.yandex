import {FC, useEffect, useRef} from 'react'
import GameEngine from '../../engine/GameEngine'
import styles from './Game.module.scss'

const Game: FC = () => {
	const ref = useRef<HTMLCanvasElement>(null)

	useEffect(() => {
		if (ref.current) {
			const game = new GameEngine(ref.current)
			game.start()
		}
	}, [])

	return (
		<div className={styles.wrapper}>
			<canvas
				ref={ref}
				width={276}
				height={414}
			/>
		</div>
	)
}

export default Game

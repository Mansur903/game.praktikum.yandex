import {FC, useEffect, useRef} from 'react'
import GameEngine from '../engine/GameEngine'
const Game: FC = () => {
	const ref = useRef<HTMLCanvasElement>(null)

	useEffect(() => {
		if (ref.current) {
			const game = new GameEngine(ref.current)
			game.start()
		}
	}, [])

	return (
		<>
			<canvas
				ref={ref}
				width={276}
				height={414}
			/>
		</>
	)
}

export default Game

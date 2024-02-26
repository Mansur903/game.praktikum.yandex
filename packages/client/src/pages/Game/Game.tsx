import {FC, useEffect, useRef, useState} from 'react'
import GameEngine from '../../engine/GameEngine'
import styles from './Game.module.scss'
import {Typography} from '@mui/material'

const isCustomEvent = (event: Event): event is CustomEvent => {
	return 'detail' in event
}

const Game: FC = () => {
	const ref = useRef<HTMLCanvasElement>(null)
	const [somePoint, setSomePoint] = useState<number>(0)
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
		return
	}, [])

	return (
		<div className={styles.wrapper}>
			<Typography variant='body1'>Текущий счет: {somePoint}</Typography>
			<canvas
				ref={ref}
				width={276}
				height={414}
			/>
		</div>
	)
}

export default Game

import {GameState} from '../types/enum/Game.enum'
import Background from './Background'
import constants from './constants'
import UI from './UI'

export default class GameEngine {
	canvas: HTMLCanvasElement
	context: CanvasRenderingContext2D
	background
	ui
	frames = 0
	state = GameState.START
	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas
		this.canvas.addEventListener('click', this.stateChange.bind(this))
		const context = this.canvas.getContext('2d')
		if (!context) throw Error('Error: missing context')
		this.context = context
		this.background = new Background(this.canvas, this.context)
		this.ui = new UI(this.canvas, this.context)
	}

	stateChange() {
		console.log('test', this.state)
		switch (this.state) {
			case GameState.START:
				this.state = GameState.END
				break
			case GameState.END:
				this.state = GameState.START
				break
		}
	}

	start() {
		requestAnimationFrame(() => {
			this.gameLoop()
			this.start()
		})
	}

	draw() {
		this.context.fillStyle = constants.color.sky
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
		this.background.draw()
		this.ui.draw(this.state)
	}

	update() {
		this.ui.update(this.frames)
	}

	gameLoop() {
		this.update()
		this.draw()
		this.frames++
	}
}

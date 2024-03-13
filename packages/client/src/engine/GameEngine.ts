import {GameState} from '../types/enum/Game.enum'
import Background from './Background'
import Bird from './Bird'
import constants from './constants'
import Ground from './Ground'
import UI from './UI'

export default class GameEngine {
	canvas: HTMLCanvasElement
	context: CanvasRenderingContext2D
	bird: Bird
	ground: Ground
	background
	ui
	frames = 0
	state = GameState.START
	mainInstance = this
	startTime = null
	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas
		this.canvas.tabIndex = 10000
		this.canvas.addEventListener('click', this.onClick.bind(this))
		this.canvas.onkeydown = ({code}) => {
			if (code === 'Space') {
				this.onClick()
			}
		}
		const context = this.canvas.getContext('2d')
		if (!context) throw Error('Error: missing context')
		this.context = context
		this.background = new Background(this.canvas, this.context)
		this.bird = new Bird(this.canvas, this.context, this.state, this.mainInstance)
		this.ground = new Ground(this.canvas, this.context)
		this.ui = new UI(this.canvas, this.context)
	}

	onClick() {
		switch (this.state) {
			case GameState.START:
				this.state = GameState.PLAY
				break
			case GameState.PLAY:
				this.bird.flap()
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
		this.background.drawFullWidth()
		this.ui.draw(this.state)
		this.bird.draw(this.frames)
		this.ground.draw()
	}

	update() {
		this.ui.update(this.frames)
		this.bird.update(this.frames, this.state)
		this.ground.update(this.state)
	}

	gameLoop() {
		this.update()
		this.draw()
		this.frames++
	}
}

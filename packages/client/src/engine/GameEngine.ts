import Background from './Background'
import UI from './UI'

export default class GameEngine {
	canvas: HTMLCanvasElement
	context: CanvasRenderingContext2D
	background
	ui
	frames = 0
	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas
		const context = this.canvas.getContext('2d')
		if (!context) throw Error('Error: missing context')
		this.context = context
		this.background = new Background(this.canvas, this.context)
		this.ui = new UI(this.canvas, this.context)
	}

	start() {
		requestAnimationFrame(() => {
			this.gameLoop()
			this.start()
		})
	}

	draw() {
		//TODO: вынести цвет в переменную
		this.context!.fillStyle = '#30c0df'
		this.context!.fillRect(0, 0, this.canvas.width, this.canvas.height)
		this.background.draw()
		this.ui.draw()
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

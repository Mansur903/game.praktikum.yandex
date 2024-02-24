export default class GameElement {
	x = 0
	y = 0
	sprite = new Image()
	screen: HTMLCanvasElement
	context: CanvasRenderingContext2D
	constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
		this.screen = canvas
		this.context = context
	}

	draw() {
		this.y = this.screen.height - this.sprite.height
		this.context.drawImage(this.sprite, this.x, this.y)
	}

	drawFullWidth() {
		const repeatX = Math.ceil(this.screen.width / this.sprite.width)
		this.y = this.screen.height - this.sprite.height
		for (let i = 0; i < repeatX; i++) {
			this.context.drawImage(this.sprite, i * this.sprite.width, this.y)
		}
	}
}

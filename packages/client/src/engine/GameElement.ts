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
		this.y = this.screen.height - this.sprite.height
		const pattern = this.context.createPattern(this.sprite, 'repeat')
		if (pattern) {
			this.context.setTransform(1, 0, 0, 1, this.x, this.y)
			this.context.fillStyle = pattern
			this.context.fillRect(0, 0, this.screen.width, this.sprite.height)
			this.context.setTransform(1, 0, 0, 1, 0, 0)
		}
	}
}

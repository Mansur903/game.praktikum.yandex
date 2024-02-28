import GroundImage from '../assets/game/ground.png'
import {GameState} from '../types/enum/Game.enum'
import GameElement from './GameElement'

export default class Ground extends GameElement {
	scrn: HTMLCanvasElement
	sctx: CanvasRenderingContext2D
	sprite = new Image()
	x = 0
	y = 0
	constructor(scrn: HTMLCanvasElement, sctx: CanvasRenderingContext2D) {
		super(scrn, sctx)
		this.scrn = scrn
		this.sctx = sctx
		this.sprite.src = GroundImage
	}

	draw = () => {
		this.y = this.scrn.height - this.sprite.height
		const pattern = this.context.createPattern(this.sprite, 'repeat')
		if (pattern) {
			this.context.setTransform(1, 0, 0, 1, this.x, this.y)
			this.context.fillStyle = pattern
			this.context.fillRect(
				0,
				0,
				this.screen.width + this.sprite.width,
				this.sprite.height
			)
			this.context.setTransform(1, 0, 0, 1, 0, 0)
		}
	}

	update = (state: GameState) => {
		if (state != GameState.PLAY) return
		this.x -= 2
		this.x = this.x % (this.sprite.width / 2)
	}
}

import GroundImage from '../assets/game/ground.png'
import {GameState} from '../types/enum/Game.enum'
import GameElement from './GameElement'
import constants from './constants'

export default class Ground extends GameElement {
	constructor(scrn: HTMLCanvasElement, sctx: CanvasRenderingContext2D) {
		super(scrn, sctx)
		this.screen = scrn
		this.context = sctx
		this.sprite.src = GroundImage
	}

	draw = () => {
		this.y = this.screen.height - this.sprite.height
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
		this.x -= constants.params.speed
		this.x = this.x % (this.sprite.width / 2)
	}
}

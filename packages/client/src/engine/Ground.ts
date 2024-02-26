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
		this.sctx.drawImage(
			this.sprite,
			this.x,
			this.y,
			this.scrn.width * 1.5,
			this.sprite.height
		)
	}

	update = (state: GameState) => {
		if (state != GameState.PLAY) return
		this.x -= 2
		this.x = this.x % (this.sprite.width / 2)
	}
}

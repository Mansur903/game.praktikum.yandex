import GameElement from './GameElement'
import bg from './../assets/game/BG.png'

export default class Background extends GameElement {
	constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
		super(canvas, context)
		this.sprite.src = bg
	}
}

import GetReady from '../assets/game/getready.png'
import GameOver from '../assets/game/go.png'
import Tap1 from '../assets/game/tap/t0.png'
import Tap2 from '../assets/game/tap/t1.png'
import {GameState} from '../types/enum/Game.enum'
import GameElement from './GameElement'
import constants from './constants'
export default class UI extends GameElement {
	getReady = {sprite: new Image()}
	gameOver = {sprite: new Image()}
	tap = [{sprite: new Image()}, {sprite: new Image()}]
	tx = 0
	ty = 0
	frame = 0
	constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
		super(canvas, context)
		this.gameOver.sprite.src = GameOver
		this.getReady.sprite.src = GetReady
		this.tap[0].sprite.src = Tap1
		this.tap[1].sprite.src = Tap2
	}
	draw(state?: GameState) {
		if (state === undefined) return
		switch (state) {
			case GameState.START:
				this.y = (this.screen.height - this.getReady.sprite.height) / 2
				this.x = (this.screen.width - this.getReady.sprite.width) / 2
				this.tx = (this.screen.width - this.tap[0].sprite.width) / 2
				this.ty = this.y + this.getReady.sprite.height - this.tap[0].sprite.height
				this.context.drawImage(this.getReady.sprite, this.x, this.y)
				this.context.drawImage(this.tap[this.frame].sprite, this.tx, this.ty)
				this.drawScore()
				break
			case GameState.END:
				this.y = (this.screen.height - this.gameOver.sprite.height) / 2
				this.x = (this.screen.width - this.gameOver.sprite.width) / 2
				this.tx = (this.screen.width - this.tap[0].sprite.width) / 2
				this.ty = this.y + this.gameOver.sprite.height - this.tap[0].sprite.height
				this.context.drawImage(this.gameOver.sprite, this.x, this.y)
				this.context.drawImage(this.tap[this.frame].sprite, this.tx, this.ty)
		}
	}
	drawScore() {
		this.context.fillStyle = constants.color.white
		this.context.strokeStyle = constants.color.black
		this.context.lineWidth = 2
		this.context.font = '35px Lato'
	}
	update(frames: number) {
		this.frame += frames % 10 == 0 ? 1 : 0
		this.frame = this.frame % this.tap.length
	}
}

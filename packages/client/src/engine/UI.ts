import Multiplayer from '../assets/game/keyCaps/KEY_M.png'
import MultiplayerPress from '../assets/game/keyCaps/KEY_M_PRESS.png'
import GetReady from '../assets/game/getready.png'
import GameOver from '../assets/game/go.png'
import Tap1 from '../assets/game/tap/t0.png'
import Tap2 from '../assets/game/tap/t1.png'
import KeyD from '../assets/game/keyCaps/KEY_D.png'
import KeyDPress from '../assets/game/keyCaps/KEY_D_PRESS.png'
import KeyK from '../assets/game/keyCaps/KEY_K.png'
import KeyKPress from '../assets/game/keyCaps/KEY_K_PRESS.png'
import KeySpace from '../assets/game/keyCaps/Space.png'
import KeySpacePress from '../assets/game/keyCaps/Space_PRESS.png'
import {GameState} from '../types/enum/Game.enum'
import GameElement from './GameElement'
import constants from './constants'
export default class UI extends GameElement {
	getReady = {sprite: new Image()}
	gameOver = {sprite: new Image()}
	multiplayer = [{sprite: new Image()}, {sprite: new Image()}]
	tap = [{sprite: new Image()}, {sprite: new Image()}]
	keyD = [{sprite: new Image()}, {sprite: new Image()}]
	keyK = [{sprite: new Image()}, {sprite: new Image()}]
	keySpace = [{sprite: new Image()}, {sprite: new Image()}]
	tx = 0
	ty = 0
	frame = 0
	isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent
	)
	constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
		super(canvas, context)
		this.gameOver.sprite.src = GameOver
		this.getReady.sprite.src = GetReady
		this.multiplayer[0].sprite.src = Multiplayer
		this.multiplayer[1].sprite.src = MultiplayerPress
		this.tap[0].sprite.src = Tap1
		this.tap[1].sprite.src = Tap2
		this.keyD[0].sprite.src = KeyD
		this.keyD[1].sprite.src = KeyDPress
		this.keyK[0].sprite.src = KeyK
		this.keyK[1].sprite.src = KeyKPress
		this.keySpace[0].sprite.src = KeySpace
		this.keySpace[1].sprite.src = KeySpacePress
	}
	drawUi(state: GameState | undefined, score?: number, isMultiplayer?: boolean) {
		if (state === undefined) return
		if (score === undefined) return
		switch (state) {
			case GameState.START:
				this.y = (this.screen.height - this.getReady.sprite.height) / 2
				this.x = (this.screen.width - this.getReady.sprite.width) / 2
				this.tx = (this.screen.width - this.tap[0].sprite.width) / 2
				this.ty = this.y + this.getReady.sprite.height - this.tap[0].sprite.height
				this.context.drawImage(this.getReady.sprite, this.x, this.y)
				if (!this.isMobile) {
					this.context.drawImage(
						this.multiplayer[this.frame].sprite,
						(this.screen.width - this.multiplayer[0].sprite.width) / 2,
						this.screen.height / 4
					)
					this.context.drawImage(
						this.keySpace[this.frame].sprite,
						(this.screen.width - this.keySpace[0].sprite.width) / 2,
						this.screen.height / 1.5
					)
					this.context.drawImage(this.keyD[this.frame].sprite, 80, 60)
					isMultiplayer && this.context.drawImage(this.keyK[this.frame].sprite, 80, 210)
				} else {
					this.context.drawImage(this.tap[this.frame].sprite, this.tx, this.ty)
				}
				this.drawScore(score)
				break
			case GameState.END:
				this.y = (this.screen.height - this.gameOver.sprite.height) / 2
				this.x = (this.screen.width - this.gameOver.sprite.width) / 2
				this.tx = (this.screen.width - this.tap[0].sprite.width) / 2
				this.ty = this.y + this.gameOver.sprite.height - this.tap[0].sprite.height
				this.context.drawImage(this.gameOver.sprite, this.x, this.y)
				this.context.drawImage(this.tap[this.frame].sprite, this.tx, this.ty)
				this.drawBestScore(score)
				break
		}
	}
	drawScore(score: number) {
		this.context.fillStyle = constants.color.white
		this.context.strokeStyle = constants.color.black
		this.context.lineWidth = 2
		this.context.font = '55px Lato'
		this.context.fillText(`${score}`, this.screen.width / 2 - 5, 50)
		this.context.strokeText(`${score}`, this.screen.width / 2 - 5, 50)
	}
	drawBestScore(score: number) {
		this.context.lineWidth = 2
		this.context.font = '65px Lato'
		const sc = `SCORE :     ${score}`
		const bestScore = Math.max(score, +(localStorage.getItem('best') || 0))
		localStorage.setItem('best', `${bestScore}`)
		const bs = `BEST  :     ${bestScore}`
		this.context.fillText(sc, this.screen.width / 2 - 80, this.screen.height / 3 - 30)
		this.context.strokeText(sc, this.screen.width / 2 - 80, this.screen.height / 3 - 30)
		this.context.fillText(bs, this.screen.width / 2 - 80, this.screen.height / 3 + 30)
		this.context.strokeText(bs, this.screen.width / 2 - 80, this.screen.height / 3 + 30)
	}
	update(frames: number) {
		this.frame += frames % 10 == 0 ? 1 : 0
		this.frame = this.frame % this.tap.length
	}
}

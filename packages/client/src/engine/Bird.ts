import Bird0 from '../assets/game/bird/b0.png'
import Bird1 from '../assets/game/bird/b1.png'
import Bird2 from '../assets/game/bird/b2.png'
import {GameState} from '../types/enum/Game.enum'
import GameEngine from './GameEngine'
import Ground from './Ground'

export default class Bird {
	scrn: HTMLCanvasElement
	sctx: CanvasRenderingContext2D
	state: GameState
	mainInstance: GameEngine
	gnd: Ground
	animations = [
		{sprite: new Image()},
		{sprite: new Image()},
		{sprite: new Image()},
		{sprite: new Image()}
	]
	rotatation = 0
	x = 50
	y = 100
	speed = 0
	frame = 0
	gravity = 0.125
	thrust = 4.5
	RAD = Math.PI / 180
	constructor(
		scrn: HTMLCanvasElement,
		sctx: CanvasRenderingContext2D,
		state: GameState,
		mainInstance: GameEngine
	) {
		this.sctx = sctx
		this.scrn = scrn
		this.state = state
		this.gnd = new Ground(scrn, sctx)
		this.mainInstance = mainInstance
		this.animations[0].sprite.src = Bird0
		this.animations[1].sprite.src = Bird1
		this.animations[2].sprite.src = Bird2
		this.animations[3].sprite.src = Bird0
	}

	draw = (frame = 0) => {
		if (!frame) return
		const h = this.animations[this.frame].sprite.height
		const w = this.animations[this.frame].sprite.width
		this.sctx.save()
		this.sctx.translate(this.x, this.y)
		this.sctx.rotate(this.rotatation * this.RAD)
		this.sctx.drawImage(this.animations[this.frame].sprite, -w / 2, -h / 2)
		this.sctx.restore()
	}

	update = (frame: number, state: GameState) => {
		const r = this.animations[0].sprite.width / 2
		switch (state) {
			case GameState.START:
				this.rotatation = 0
				this.y += frame % 10 == 0 ? Math.sin(frame * this.RAD) : 0
				this.frame += frame % 10 == 0 ? 1 : 0
				break
			case GameState.PLAY:
				this.frame += frame % 5 == 0 ? 1 : 0
				this.y += this.speed
				this.setRotation()
				this.speed += this.gravity
				if (this.collisioned()) {
					this.mainInstance.state = GameState.END
					this.state = GameState.END
				}

				break
			case GameState.END:
				this.frame = 1
				if (this.y + r < this.gnd.y) {
					this.y += this.speed
					this.setRotation()
					this.speed += this.gravity * 2
				} else {
					this.speed = 0
					this.y = this.gnd.y - r
					this.rotatation = 90
				}

				break
		}
		this.frame = frame % this.animations.length
	}

	flap = () => {
		if (this.y > 0) {
			this.speed = -this.thrust
		}
	}
	setRotation = () => {
		if (this.speed <= 0) {
			this.rotatation = Math.max(-25, (-25 * this.speed) / (-1 * this.thrust))
		} else if (this.speed > 0) {
			this.rotatation = Math.min(90, (90 * this.speed) / (this.thrust * 2))
		}
	}

	collisioned = () => {
		const r = this.animations[0].sprite.height / 4 + this.animations[0].sprite.width / 4
		if (this.y - r >= this.scrn.height - this.gnd.sprite.height || this.y + r <= 0) {
			return true
		}
	}
}

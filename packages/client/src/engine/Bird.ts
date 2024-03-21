import Bird0 from '../assets/game/bird/b0.png'
import Bird1 from '../assets/game/bird/b1.png'
import Bird2 from '../assets/game/bird/b2.png'
import {GameState} from '../types/enum/Game.enum'
import GameElement from './GameElement'

export default class Bird extends GameElement {
	animations = [
		{sprite: new Image()},
		{sprite: new Image()},
		{sprite: new Image()},
		{sprite: new Image()}
	]
	rotation = 0
	speed = 0
	frame = 0
	gravity = 0.125
	thrust = 4.5
	RAD = Math.PI / 180
	isFallen = false

	constructor(scrn: HTMLCanvasElement, sctx: CanvasRenderingContext2D) {
		super(scrn, sctx)
		this.inStart()
		this.animations[0].sprite.src = Bird0
		this.animations[1].sprite.src = Bird1
		this.animations[2].sprite.src = Bird2
		this.animations[3].sprite.src = Bird0
	}

	draw = (frame = 0) => {
		if (!frame) return
		const h = this.animations[this.frame].sprite.height
		const w = this.animations[this.frame].sprite.width
		this.context.save()
		this.context.translate(this.x, this.y)
		this.context.rotate(this.rotation * this.RAD)
		this.context.drawImage(this.animations[this.frame].sprite, -w / 2, -h / 2)
		this.context.restore()
	}

	update = (frame: number, state: GameState, groundY: number) => {
		const r = this.animations[0].sprite.width / 2
		switch (state) {
			case GameState.START:
				this.isFallen = false
				this.rotation = 0
				this.y += frame % 10 == 0 ? Math.sin(frame * this.RAD) : 0
				this.frame += frame % 10 == 0 ? 1 : 0
				break
			case GameState.PLAY:
				this.frame += frame % 5 == 0 ? 1 : 0
				this.y += this.speed
				this.speed += this.gravity
				break
			case GameState.END:
				this.frame = 1
				if (this.y + r < groundY) {
					this.y += this.speed
					this.setRotation()
					this.speed += this.gravity * 2
				} else {
					this.speed = 0
					this.y = groundY - r
					this.rotation = 90
				}
				break
		}
		if (state !== GameState.END) this.frame = frame % this.animations.length
	}

	flap = () => {
		if (this.y > 0) {
			this.speed = -this.thrust
		}
	}
	setRotation = () => {
		if (this.speed <= 0) {
			this.rotation = Math.max(-25, (-25 * this.speed) / (-1 * this.thrust))
		} else if (this.speed > 0) {
			this.rotation = Math.min(90, (90 * this.speed) / (this.thrust * 2))
		}
	}

	setFallen() {
		this.isFallen = true
	}

	isGrounded(groundHeight: number) {
		const r = this.animations[0].sprite.height / 4 + this.animations[0].sprite.width / 4
		if (this.y - r >= this.screen.height - groundHeight || this.y + r <= 0) {
			return true
		}
	}
	inStart() {
		this.x = 50
		this.y = 100
		this.rotation = 0
	}
}

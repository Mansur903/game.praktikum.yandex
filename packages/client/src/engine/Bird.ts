import Bird0 from '../assets/game/bird/b0.png'
import Bird1 from '../assets/game/bird/b1.png'
import Bird2 from '../assets/game/bird/b2.png'
import {GameState} from '../types/enum/Game.enum'
import GameElement from './GameElement'
import Ground from './Ground'
import constants from './constants'

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
	key = 'Space'

	constructor(
		scrn: HTMLCanvasElement,
		sctx: CanvasRenderingContext2D,
		registerKey = 'Space'
	) {
		super(scrn, sctx)
		this.key = registerKey
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
		if (this.isFallen) {
			const r = this.animations[0].sprite.width / 2
			if (this.x > -this.animations[0].sprite.height && state !== GameState.END)
				this.x -= constants.params.speed
			if (this.y + r < this.screen.height - groundY) {
				this.y += this.speed
				this.setRotation()
				this.speed += this.gravity * 2
			} else {
				this.speed = 0
				this.y = this.screen.height - groundY
				this.rotation = 90
			}
		} else {
			switch (state) {
				case GameState.START:
					this.rotation = 0
					this.y += frame % 10 == 0 ? Math.sin(frame * this.RAD) : 0
					this.frame += frame % 10 == 0 ? 1 : 0
					break
				case GameState.PLAY:
					this.frame += frame % 5 == 0 ? 1 : 0
					this.y += this.speed
					this.speed += this.gravity
					break
			}
			if (state !== GameState.END) this.frame = frame % this.animations.length
		}
	}

	flap = () => {
		if (this.y > 0) {
			this.speed = -this.thrust
		}
	}

	handleClick(code: string) {
		if (code === this.key) {
			this.flap()
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
		this.frame = 1
		this.isFallen = true
	}

	isGrounded(groundHeight: number) {
		const r = this.animations[0].sprite.height / 4 + this.animations[0].sprite.width / 4
		if (this.y - r >= this.screen.height - groundHeight || this.y + r <= 0) {
			return true
		}
	}
	inStart() {
		this.isFallen = false
		this.x = 50
		this.y = 100
		this.rotation = 0
	}
}

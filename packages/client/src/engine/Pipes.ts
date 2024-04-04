import PipeSpriteBot from '../assets/game/botpipe.png'
import PipeSpriteTop from '../assets/game/toppipe.png'
import {GameState} from '../types/enum/Game.enum'
import GameElement from './GameElement'
import constants from './constants'

enum PipePlace {
	UP = 'up',
	DOWN = 'down'
}

class Pipe extends GameElement {
	place: PipePlace = PipePlace.DOWN
	top = new Image()
	bot = new Image()
	id = 0
	constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, id: number) {
		super(canvas, context)
		this.top.src = PipeSpriteTop
		this.bot.src = PipeSpriteBot
		this.id = id
	}
	draw(): void {
		this.context.drawImage(this.top, this.x, this.y)
		this.context.drawImage(
			this.bot,
			this.x,
			this.y + this.top.height + constants.params.tubeGap
		)
	}
	move() {
		this.x -= constants.params.speed
	}

	create() {
		this.x = this.screen.width
		const random = parseInt(
			`${
				Math.random() * (constants.params.maxHeight - constants.params.minHeight) +
				constants.params.minHeight
			}`
		)
		this.y =
			-this.top.height + (this.screen.height - constants.params.tubeGap) / 2 + random
		return this
	}

	get width() {
		return this.top.width
	}
}

export class Pipes extends GameElement {
	list: Pipe[] = []
	moved = true
	constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
		super(canvas, context)
	}
	get size() {
		return this.list.length
	}
	get firstPipe() {
		return this.list[0]
	}
	update(state: GameState, frames: number) {
		if (state !== GameState.PLAY) return
		if (frames % 100 == 0) {
			const pipe = new Pipe(this.screen, this.context, frames)
			this.list.push(pipe.create())
		}
		this.list.forEach((pipe) => {
			pipe.move()
		})
		const firstPipe = this.list[0]
		if (this.list.length && firstPipe?.x < -firstPipe?.width) {
			this.list.shift()
			this.moved = true
		}
	}
	draw() {
		this.list.forEach((pipe) => pipe.draw())
	}
	clear() {
		this.list = []
	}
}

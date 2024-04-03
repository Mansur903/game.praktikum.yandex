import {GameState} from '../types/enum/Game.enum'
import Background from './Background'
import Bird from './Bird'
import constants from './constants'
import Ground from './Ground'
import {Pipes} from './Pipes'
import UI from './UI'

/* Класс GameEngine в TypeScript управляет состоянием игры, обрабатывает взаимодействие с пользователем
и управляет игровым циклом простого игрового приложения. */
export default class GameEngine extends EventTarget {
	canvas: HTMLCanvasElement
	context: CanvasRenderingContext2D
	birds: Bird[]
	ground: Ground
	pipes: Pipes
	background
	ui
	isMultiplayer = true
	frames = 0
	/**Текущее состояние игры. Может пребывать в трех различных состояниях:
	 * START - стартовый экран игры
	 * PLAY - игра идёт, птичка прыгает
	 * END - экран поражения
	 */
	state = GameState.START

	startTime = null
	/**
	 * Количество последних набранных очков. изначальное состояние равно 0.
	 */
	point = 0
	constructor(canvas: HTMLCanvasElement) {
		super()
		this.canvas = canvas
		this.canvas.tabIndex = 10000
		this.canvas.addEventListener('click', () => this.onClick())
		const context = this.canvas.getContext('2d')
		if (!context) throw Error('Error: missing context')
		this.context = context
		this.background = new Background(this.canvas, this.context)
		this.birds = [new Bird(this.canvas, this.context, 'KeyD', 100)]
		if (this.isMultiplayer)
			this.birds.push(new Bird(this.canvas, this.context, 'KeyK', 250))
		this.canvas.onkeydown = ({code}) => {
			this.birds.forEach((bird) => bird.handleClick(code))
			switch (code) {
				case 'KeyM':
					this.isMultiplayer = !this.isMultiplayer
					if (this.isMultiplayer)
						this.birds.push(new Bird(this.canvas, this.context, 'KeyK', 250))
					else this.birds.pop()
					break
				case 'Space':
					return this.onClick()
				default:
					break
			}
		}
		this.ground = new Ground(this.canvas, this.context)
		this.ui = new UI(this.canvas, this.context)
		this.pipes = new Pipes(this.canvas, this.context)
	}

	onClick() {
		switch (this.state) {
			case GameState.START:
				this.birds.forEach((bird) => bird.clearPoint())
				this.state = GameState.PLAY
				this.emitEvent()
				break
			case GameState.END:
				this.state = GameState.START
				this.emitEvent()
				this.inStart()
				break
		}
	}

	private emitEvent() {
		this.dispatchEvent(
			new CustomEvent('changeState', {
				detail: {
					currState: this.state,
					currPoint: this.birds[0].point
				}
			})
		)
	}

	inStart() {
		this.pipes.clear()
		this.birds.forEach((bird) => bird.inStart())
	}

	/**
	 * Функция start использует requestAnimationFrame для непрерывного вызова метода gameLoop и самого себя
	 * для плавной анимации в TypeScript.
	 */
	start() {
		requestAnimationFrame(() => {
			this.gameLoop()
			this.start()
		})
	}

	/**
	 * Функция draw устанавливает цвет фона холста, рисует фон, а затем рисует пользовательский интерфейс
	 * на основе текущего состояния.
	 */
	draw() {
		this.context.fillStyle = constants.color.sky
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
		this.background.drawFullWidth()
		this.pipes.draw()
		this.ground.draw()
		this.birds.forEach((bird) => bird.draw(this.frames))
		this.ui.drawUi(this.state, this.birds[0].point, this.isMultiplayer)
	}

	/**
	 * Функция обновления вызывает метод обновления объекта пользовательского интерфейса с параметром
	 * кадров.
	 */
	update() {
		this.ground.update(this.state)
		this.birds.forEach((bird) =>
			bird.update(this.frames, this.state, this.ground.sprite.height)
		)
		this.pipes.update(this.state, this.frames)
		if (this.state === GameState.PLAY) this.checkCollision()
		this.ui.update(this.frames)
	}
	/**
	 * Функция gameLoop обновляет состояние игры, рисует игру и увеличивает количество кадров.
	 */
	gameLoop() {
		this.update()
		this.draw()
		this.frames++
		if (this.birds.every((bird) => bird.isFallen) && this.state !== GameState.END) {
			this.state = GameState.END
			// this.emitEvent()
			this.pipes.moved = false
		}
	}

	checkCollision() {
		if (!this.pipes.size) return
		this.birds.forEach((bird) => {
			const birdPosition = bird.animations[0].sprite
			const firstPipe = this.pipes.firstPipe
			const x = firstPipe.x
			const y = firstPipe.y
			const r = birdPosition.height / 4 + birdPosition.width / 4
			const roof = y + firstPipe.top.height
			const floor = roof + constants.params.tubeGap
			const w = firstPipe.top.width
			if (bird.isFallen) return
			if (bird.isGrounded(this.ground.sprite.height)) {
				bird.setFallen()
				return
			}
			if (!(bird.x + r >= x)) return
			if (bird.x + r < x + w) {
				if (bird.y - r <= roof || bird.y + r >= floor) {
					// SFX.hit.play();
					bird.setFallen()
					return
				}
			} else if (this.pipes.moved) {
				bird.point = firstPipe.id
				// SFX.score.play();
			}
		})
	}
}

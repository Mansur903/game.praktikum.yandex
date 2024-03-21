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
	bird: Bird
	secondBird?: Bird
	ground: Ground
	pipes: Pipes
	background
	ui
	isMultiplayer = false
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
		this.canvas.addEventListener('click', (e) => this.onClick(e))
		this.canvas.onkeydown = ({code}) => {
			switch (code) {
				case 'KeyD':
					return this.bird.flap()
				case 'KeyK':
					return this.secondBird?.flap()
				default:
					break
			}
		}
		const context = this.canvas.getContext('2d')
		if (!context) throw Error('Error: missing context')
		this.context = context
		this.background = new Background(this.canvas, this.context)
		this.bird = new Bird(this.canvas, this.context)
		this.secondBird = new Bird(this.canvas, this.context)
		this.ground = new Ground(this.canvas, this.context)
		this.ui = new UI(this.canvas, this.context)
		this.pipes = new Pipes(this.canvas, this.context)
	}
	/**
	 * Функция stateChange переключает между двумя состояниями игры и увеличивает количество очков, а затем
	 * отправляет пользовательское событие с текущим состоянием и точкой.
	 */
	onClick(e: MouseEvent) {
		const rect = this.canvas.getBoundingClientRect()
		const mouseX = e.clientX - rect.left
		const mouseY = e.clientY - rect.top
		if (
			mouseX >= this.ui.multiplayerX &&
			mouseX <= this.ui.multiplayerDX &&
			mouseY >= this.ui.multiplayerY &&
			mouseY <= this.ui.multiplayerDY
		) {
			this.isMultiplayer = !this.isMultiplayer
		} else {
			switch (this.state) {
				case GameState.START:
					this.point = 0
					this.state = GameState.PLAY
					break
				case GameState.PLAY:
					this.bird.flap()
					break
				case GameState.END:
					this.state = GameState.START
					this.inStart()
					break
			}
		}
		this.dispatchEvent(
			new CustomEvent('changeState', {
				detail: {
					currState: this.state,
					currPoint: this.point
				}
			})
		)
	}

	inStart() {
		this.pipes.clear()
		this.bird.inStart()
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
		if (this.isMultiplayer) {
			this.secondBird?.draw(this.frames)
		}
		this.bird.draw(this.frames)
		this.ui.draw(this.state, this.point)
	}

	/**
	 * Функция обновления вызывает метод обновления объекта пользовательского интерфейса с параметром
	 * кадров.
	 */
	update() {

		this.ground.update(this.state)
		if (this.isMultiplayer) {
			this.secondBird?.update(this.frames, this.state, this.ground.y)
		}
		this.bird.update(this.frames, this.state, this.ground.y)
		this.pipes.update(this.state, this.frames)
		this.checkCollision()
		this.ui.update(this.frames)
	}
	/**
	 * Функция gameLoop обновляет состояние игры, рисует игру и увеличивает количество кадров.
	 */
	gameLoop() {
		this.update()
		this.draw()
		this.frames++
		if (this.isMultiplayer && this.bird.isFallen && this.secondBird?.isFallen) {
			// Если игра идет в мультиплеере и обе птички столкнулись, то завершаем игру
			this.state = GameState.END
		}
	}

	checkCollision() {
		if (!this.pipes.size) return
		const bird = this.bird.animations[0].sprite
		const firstPipe = this.pipes.firstPipe
		const x = firstPipe.x
		const y = firstPipe.y
		const r = bird.height / 4 + bird.width / 4
		const roof = y + firstPipe.top.height
		const floor = roof + constants.params.tubeGap
		const w = firstPipe.top.width
		if (this.bird.isGrounded(this.ground.sprite.height)) {
			this.state = GameState.END
		}
		if (!(this.bird.x + r >= x)) return
		if (this.bird.x + r < x + w) {
			if (this.bird.y - r <= roof || this.bird.y + r >= floor) {
				// SFX.hit.play();
				this.state = GameState.END
				return true
			}
		} else if (this.pipes.moved) {
			this.point++
			// SFX.score.play();
			this.pipes.moved = false
		}
	}
}

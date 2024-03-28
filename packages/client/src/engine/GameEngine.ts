import {GameState} from '../types/enum/Game.enum'
import Background from './Background'
import Bird from './Bird'
import constants from './constants'
import Ground from './Ground'
import UI from './UI'

/* Класс GameEngine в TypeScript управляет состоянием игры, обрабатывает взаимодействие с пользователем
и управляет игровым циклом простого игрового приложения. */
export default class GameEngine extends EventTarget {
	canvas: HTMLCanvasElement
	context: CanvasRenderingContext2D
	bird: Bird
	secondBird?: Bird
	ground: Ground
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
	mainInstance = this
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
		this.canvas.onkeydown = ({code}) => {
			switch (code) {
				case 'KeyD':
					return this.bird.flap()
				case 'KeyK':
					return this.secondBird?.flap()
				case 'KeyM':
					this.isMultiplayer = !this.isMultiplayer
					break
				case 'Space':
					return this.onClick()
				default:
					break
			}
		}
		const context = this.canvas.getContext('2d')
		if (!context) throw Error('Error: missing context')
		this.context = context
		this.background = new Background(this.canvas, this.context)
		this.bird = new Bird(this.canvas, this.context, this.state, this.mainInstance, 100)
		this.secondBird = new Bird(
			this.canvas,
			this.context,
			this.state,
			this.mainInstance,
			250
		)
		this.ground = new Ground(this.canvas, this.context)
		this.ui = new UI(this.canvas, this.context, this)
	}

	onClick() {
		switch (this.state) {
			case GameState.START:
				this.state = GameState.PLAY
				break
			case GameState.PLAY:
				this.bird.flap()
				break
			case GameState.END:
				this.state = GameState.START
				break
			// }
			/**
			 * Функция stateChange переключает между двумя состояниями игры и увеличивает количество очков, а затем
			 * отправляет пользовательское событие с текущим состоянием и точкой.
			 */
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
		this.ui.draw(this.state)
		this.bird.draw(this.frames)
		if (this.isMultiplayer) {
			this.secondBird?.draw(this.frames)
		}
		this.ground.draw()
	}

	/**
	 * Функция обновления вызывает метод обновления объекта пользовательского интерфейса с параметром
	 * кадров.
	 */
	update() {
		this.ui.update(this.frames)
		this.bird.update(this.frames, this.state)
		if (this.isMultiplayer) {
			this.secondBird?.update(this.frames, this.state)
		}
		this.ground.update(this.state)
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
}

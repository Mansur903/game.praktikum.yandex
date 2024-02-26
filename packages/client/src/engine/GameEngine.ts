import {GameState} from '../types/enum/Game.enum'
import Background from './Background'
import constants from './constants'
import UI from './UI'

/* Класс GameEngine в TypeScript управляет состоянием игры, обрабатывает взаимодействие с пользователем
и управляет игровым циклом простого игрового приложения. */
export default class GameEngine extends EventTarget {
	canvas: HTMLCanvasElement
	context: CanvasRenderingContext2D
	background
	ui
	frames = 0
	/**Текущее состояние игры. Может пребывать в трех различных состояниях:
	 * START - стартовый экран игры
	 * PLAY - игра идёт, птичка прыгает
	 * END - экран поражения
	 */
	state = GameState.START
	/**
	 * Количество последних набранных очков. изначальное состояние равно 0.
	 */
	point = 0
	constructor(canvas: HTMLCanvasElement) {
		super()
		this.canvas = canvas
		this.canvas.addEventListener('click', this.stateChange.bind(this))
		const context = this.canvas.getContext('2d')
		if (!context) throw Error('Error: missing context')
		this.context = context
		this.background = new Background(this.canvas, this.context)
		this.ui = new UI(this.canvas, this.context)
		/** Есть ощущение что вычисление и отрисовку нужно разнести по разным циклам.
		 * Если я правильно понял, то requestAnimationFrame привязан к герцовке.
		 * И если привязаться к ней, то скорость на разных компах в зависимости от этого будет различаться.
		 * В этом случае, по идее, вычисления делаем в отдельном цикле, с собственной скоростью,
		 * а отрисовку в requestAnimationFrame.
		 * Что думаете? Важно мнение всех читающих.
		 */
		setInterval(() => {
			this.update()
			this.frames++
		}, 25)
	}

	/**
	 * Функция stateChange переключает между двумя состояниями игры и увеличивает количество очков, а затем
	 * отправляет пользовательское событие с текущим состоянием и точкой.
	 */
	stateChange() {
		switch (this.state) {
			case GameState.START:
				this.point++
				this.state = GameState.END
				break
			case GameState.END:
				this.point++
				this.state = GameState.START
				break
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
		this.background.draw()
		this.ui.draw(this.state)
	}

	/**
	 * Функция обновления вызывает метод обновления объекта пользовательского интерфейса с параметром
	 * кадров.
	 */
	update() {
		this.ui.update(this.frames)
	}
	/**
	 * Функция gameLoop обновляет состояние игры, рисует игру и увеличивает количество кадров.
	 */
	gameLoop() {
		this.draw()
	}
}

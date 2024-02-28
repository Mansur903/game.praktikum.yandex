import {act} from '@testing-library/react'

import {GameState} from '../types/enum/Game.enum'
import GameEngine from './GameEngine'

const mockDrawFullWidth = jest.fn()
const mockDrawUI = jest.fn()
const mockDrawBird = jest.fn()
const mockDrawGround = jest.fn()

describe('GameEngine', () => {
	let canvas: HTMLCanvasElement
	let engine: GameEngine

	beforeEach(() => {
		canvas = document.createElement('canvas')
		engine = new GameEngine(canvas)
		engine.background.drawFullWidth = mockDrawFullWidth
		engine.ui.draw = mockDrawUI
		engine.bird.draw = mockDrawBird
		engine.ground.draw = mockDrawGround
	})

	it('should start in GameState.START', () => {
		expect(engine.state).toBe(GameState.START)
	})

	it('should change state on click', () => {
		engine.onClick()
		expect(engine.state).toEqual(GameState.PLAY)
	})

	it('should update frames in gameLoop', () => {
		engine.gameLoop()
		expect(engine.frames).toBe(1)

		engine.gameLoop()
		expect(engine.frames).toBe(2)
	})

	it('should draw elements', () => {
		act(() => {
			engine.draw()
		})

		expect(mockDrawFullWidth).toBeCalled()
		expect(mockDrawUI).toBeCalled()
		expect(mockDrawBird).toBeCalled()
		expect(mockDrawGround).toBeCalled()
	})
})

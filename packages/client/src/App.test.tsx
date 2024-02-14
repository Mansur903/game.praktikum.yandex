import {render, screen} from '@testing-library/react'
import {MemoryRouter, Routes, Route} from 'react-router-dom'

// @ts-ignore
global.fetch = jest.fn(() => Promise.resolve({json: () => Promise.resolve('hey')}))

test('renders error404 when path is unknown', () => {
	render(
		<MemoryRouter initialEntries={['/unknown']}>
			<Routes>
				<Route
					path='*'
					element={<div>error404</div>}
				/>
			</Routes>
		</MemoryRouter>
	)
	const error404Element = screen.getByText(/error404/i)
	expect(error404Element.innerHTML).toEqual('error404')
})

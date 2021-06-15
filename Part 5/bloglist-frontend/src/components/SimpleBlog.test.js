import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

const simpleBlog = {
	author: 'Parshva Barbhaya',
	title: 'Generic blog content',
	likes: 0
}

describe('Simple Blog', () => {
	test('render content', () => {
		const component = render(<SimpleBlog blog={simpleBlog} />)
		// component.debug()
		expect(component.container).toHaveTextContent('Generic blog content')

		const secondDiv = component.container.querySelector('.second')
		expect(secondDiv).toHaveTextContent('blog has 0 likes')
		const button = secondDiv.querySelector('button')
		expect(button).toHaveTextContent('like')
	})

	test('when like button is clicked twice', () => {
		const mockHandler = jest.fn()
		const component = render(<SimpleBlog blog = {simpleBlog} onClick = {mockHandler} />)

		const button = component.container.querySelector('button')
		fireEvent.click(button)
		fireEvent.click(button)

		expect(mockHandler.mock.calls.length).toBe(2)
	})
})
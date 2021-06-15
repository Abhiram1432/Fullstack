import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Blog from './Blog'

afterEach(cleanup)

const blog = {
	title: 'Generic title',
	author: 'Parshva',
	url: 'http://localhost:3001/api/blogs',
	likes: 0,
	id: '901saknciq12',
	user: {
		name: 'Parshva',
		username: 'parshva_b',
		id: 'smcks12o1ie321'
	}
}

test('check initial state of blog', () => {
	const component = render(
		<Blog blog = { blog } />
	)

	expect(component.container).not.toHaveTextContent('http://localhost:3001/api/blogs')
})
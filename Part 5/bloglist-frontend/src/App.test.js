import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock( './services/blogs' )
import App from './App'

describe('<App />', () => {
	test('if no user logged in, no blogs are displayed', async () => {
		const component = render(
			<App />
		)

		component.rerender(<App />)

		await waitForElement(
			() => component.getAllByText('Login')[1]
		)

		const blogs = component.container.querySelectorAll('.blog')
		expect(blogs.length).toBe(0)
	})

	test('if user is logged in, blogs are displayed', async () => {
		const user = {
			name: 'Parshva',
			username: 'parshva_b',
			token: '1234skdkndk12030rie'
		}

		localStorage.setItem('loggedBlogUser', JSON.stringify(user))
		const component = render( <App /> )
		component.rerender( <App /> )

		await waitForElement(
			() => component.container.querySelector('.blog')
		)

		const blogs = component.container.querySelectorAll('.blog')
		expect(blogs.length).toBe(6)
	})
})
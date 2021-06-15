import React from 'react'
import { useField } from '../hooks'
import { connect } from 'react-redux'
import { Form, Button, Header, Divider } from 'semantic-ui-react'

import { loginUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

import loginService from '../services/login'
import blogService from '../services/blogs'

const Login = (props) => {
	const [username] = useField('text')
	const [password] = useField('password')

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username: username.value,
				password: password.value
			})

			window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
			blogService.setToken(user.token)
			props.loginUser(user)
		} catch (exception) {
			props.setNotification('wrong username or password', 'error', 3)
		}
	}

	return (
		<div>
			<Header size = "medium" > Log in for application </Header>
			<Divider />
			<div style = { { paddingLeft: 14 } } >
				<Form onSubmit={handleLogin}>
					<Form.Field>
						<label> Username </label>
						<input {...username} placeholder = 'Username' id = 'username' />
					</Form.Field>
					<Form.Field>
						<label> Password </label>
						<input {...password} placeholder = 'Password' id = 'password' />
					</Form.Field>
					<Button type="submit" primary > Login </Button>
				</Form>
			</div>
		</div>
	)
}

const mapStateToProps = ( state ) => {
	return {
		blogs: state.blogs,
		user: state.user,
		notification: state.notification
	}
}

const mapDispatchToProps = {
	loginUser,
	setNotification
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login)
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
	BrowserRouter as Router,
	Link, Route, Redirect
} from 'react-router-dom'
import { Container, Divider, Header, Button, Menu } from 'semantic-ui-react'

import blogService from './services/blogs'

import { getCurrentUser, logout, loginUser } from './reducers/userReducer'
import { initializeBlogs, updateBlog, postComment } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'

import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Login from './components/Login'
import Blogs from './components/Blogs'
import Users from './components/Users'
import Blog from './components/Blog'

const App = ( props ) => {

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			props.loginUser( user )
			props.initializeBlogs()
			blogService.setToken(user.token)
		}
	}, [props])

	const paddingStyle = {
		padding: 5,
		margin: 2
	}

	const handleLogout = (props) => {
		props.logout()
		blogService.destroyToken()
		window.localStorage.removeItem('loggedBlogAppUser')

		return (
			<Redirect to = '/' />
		)
	}

	const loggedBlogView = () => (
		<div>
			<Togglable buttonLabel='create new' ref={newBlogRef}>
				<NewBlog />
			</Togglable>

			<Blogs />
		</div>
	)

	const showUser = (id) => {
		if( props.user === null ) return null

		const u = props.blogs.find( b => b.user.id === id )
		if( u === undefined ) return null

		const blogsToShow = () => props.blogs.filter( b => b.user.id === id )

		return (
			<div>
				<h2> { u.user.name } </h2>
				<h3> added blogs </h3>
				<ul>
					{blogsToShow().map( b =>
						<li key = {b.id} >
							{b.title}
						</li>
					) }
				</ul>
			</div>
		)
	}

	const likeBlog = async (blog) => {
		const likedBlog = { ...blog, likes: blog.likes + 1 }
		console.log(likedBlog)
		await props.updateBlog( likedBlog )
		props.setNotification(`blog ${likedBlog.title} by ${likedBlog.author} liked!`, 'green', 3)
	}

	const showSingleBlog = ( id ) => {
		if( props.user === null ) return null
		const blog = props.blogs.find( b => b.id === id )
		if( blog === undefined ) return null

		return (
			<Blog blog = { blog } likeBlog = { likeBlog } postComment = { addComment } />
		)
	}

	const addComment = async ( object ) => {
		console.log( object )
		await props.postComment( object )
	}

	const showOptions = () => {
		return (
			<>
				{ props.user.name } logged in
				<Button style = { paddingStyle } onClick={ () => handleLogout(props) }>logout</Button>
			</>
		)
	}

	const newBlogRef = React.createRef()

	return (
		<div>
			<Router>
				<div>
					<div>
						<Menu inverted>
							<Menu.Item link>
								<Link style = { paddingStyle } to = '/users'> users </Link>
							</Menu.Item>
							<Menu.Item link>
								<Link style = { paddingStyle } to = '/blogs'> blogs </Link>
							</Menu.Item>
							<Menu.Item>
								{ props.user === null ? null : showOptions() }
							</Menu.Item>
						</Menu>
					</div>

					<Container>
						<div>
							<Header size = 'large' style = { { paddingTop: 14 } } >blogs</Header>

							<Divider />

							<Notification />
							<Route exact path = '/' render =
								{ () => props.user === null ? <Login /> : <Redirect to = '/blogs' /> }
							/>
							<Route exact path = '/users' render =
								{ () => props.user === null ? <Redirect to = '/' /> : <Users /> }
							/>
							<Route exact path = '/blogs' render =
								{ () => props.user === null ? <Redirect to = '/' /> : loggedBlogView() }
							/>
							<Route path = '/users/:id' render =
								{ ({ match }) => showUser(match.params.id) }
							/>
							<Route path = '/blogs/:id' render =
								{ ({ match }) => showSingleBlog( match.params.id ) }
							/>
						</div>
					</Container>

				</div>
			</Router>
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
	getCurrentUser,
	logout,
	loginUser,
	initializeBlogs,
	updateBlog,
	setNotification,
	postComment
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
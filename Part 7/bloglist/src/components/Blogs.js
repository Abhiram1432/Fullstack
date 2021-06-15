import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { initializeBlogs, updateBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blogs = (props) => {
	useEffect( () => {
		props.initializeBlogs()
	},[props] )

	const blogsToShow = () => props.blogs.sort( (a,b) => b.likes - a.likes )

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	// const removeBlog = async (blog) => {
	// 	const ok = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
	// 	if (ok) {
	// 		await props.deleteBlog(blog)
	// 		props.setNotification(`blog ${blog.title} by ${blog.author} removed!`, 'error', 3)
	// 	}
	// }

	return (
		<div style = { { padding: 14 } } >
			{blogsToShow().map( blog =>
				<div style = { blogStyle } key = { blog.id }  >
					<a href = { `/blogs/${blog.id}` } >
						{ blog.title } { blog.author }
					</a>
					{/* creator={blog.user.username === props.user.username ? true : false} */}
				</div>
			)}
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
	initializeBlogs,
	setNotification,
	updateBlog,
	deleteBlog
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Blogs)
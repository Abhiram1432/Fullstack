import blogService from '../services/blogs'

const reducer = ( state = [], action ) => {
	switch ( action.type ) {
	case 'NEW_BLOG':
		return [ ...state, action.data ]
	case 'INIT_BLOG':
		return action.data
	case 'UPDATE':
		return state.map( blog =>
			blog.id !== action.data.id ? blog : action.data
		)
	case 'POST_COMMENT':
		/* eslint-disable */
		const blog = state.find( b => b.id === action.data.id)
		blog.comments = [...blog.comments, action.data.text.value]
		return state.map( b =>
			b.id === action.data.id ? blog : b
		)
	case 'DELETE':
		return state.filter( blog =>
			blog.id !== action.data.id
		)
	default:
		return state
	}
}

export const initializeBlogs = () => {
	return async dispatch => {
		const blogs = await blogService.getAll()
		dispatch({
			type: 'INIT_BLOG',
			data: blogs
		})
	}
}

export const createBlog = ({ title, author, url, user }) => {
	const blogObj = {
		title,
		author,
		url,
		likes: 0,
		user
	}
	return async dispatch => {
		const blog = await blogService.create(blogObj)
		dispatch({
			type: 'NEW_BLOG',
			data: blog
		})
	}
}

export const updateBlog = ( blogObj ) => {
	return async dispatch => {
		await blogService.update(blogObj)
		dispatch({
			type: 'UPDATE',
			data: blogObj
		})
	}
}

export const deleteBlog = ( blogObj ) => {
	return async dispatch => {
		await blogService.remove( blogObj )
		dispatch({
			type: 'DELETE',
			data: blogObj
		})
	}
}

export const postComment = ( object ) => {
	console.log( object )
	return async dispatch => {
		await blogService.postComment(object)
		dispatch({
			type: 'POST_COMMENT',
			data: object
		})
	}
}

export default reducer
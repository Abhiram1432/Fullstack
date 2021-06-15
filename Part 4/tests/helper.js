const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
	{
		// id: '019knxkanaksskn19782wyeuqwg',
		title: 'Why is happening',
		author: 'Parshva Barbhaya',
		url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS',
		likes: 10
	},
	{
		// id: '7slmasdb1u2831f',
		title: 'Canonical string reduction',
		author: 'Edgar W. Djikshta',
		url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS',
		likes: 5
	},
	{
		// id: '182aaxacbhas128ds',
		title: 'What is happening',
		author: 'Edgar W. Djikshta',
		url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS',
		likes: 12
	}
]

const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map( blog => blog.toJSON() )
}

const usersInDb = async () => {
	const users = await User.find({})
	return users.map( user => user.toJSON() )
}

const nonExistingBlog = async () => {
	const blog = new Blog({
		title: 'Error404',
		author: 'Parshva Barbhaya',
		url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS',
		likes: 0
	})
	await blog.save()
	await blog.remove()

	return blog._id.toString()
}

const extractTAUL = (params) => {
	const returnedObj = {
		title: params.title,
		author: params.author,
		url: params.url,
		likes: params.likes
	}
	return returnedObj
}

module.exports = {
	initialBlogs,
	blogsInDb,
	nonExistingBlog,
	extractTAUL,
	usersInDb
}
const jwt = require('jsonwebtoken')

const blogsRouter = require('express').Router()

const Blog = require('./../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (request, response, next) => {
	try {
		const blogs = await Blog
			.find({})
			.populate('user', {blogs: 0})
		response.json(blogs)
	}
	catch (exception) {
		next(exception)
	}
})

blogsRouter.post('/', async (request, response, next) => {
	const body = request.body

	try {
		const decodedToken = jwt.verify( request.token, process.env.SECRET )
		if( !decodedToken.id ) {
			return response.status(401).json({
				error: 'token missing or invalid'
			})
		}

		const user = await User.findById( decodedToken.id )

		const blog = new Blog({
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes === undefined ? 0 : body.likes,
			user: user._id
		})
		const savedBlog = await blog.save()
		// concat to user
		user.blogs = user.blogs.concat(savedBlog._id)
		await user.save()
		response.status(201).json(savedBlog)
	}
	catch(exception) {
		response.sendStatus(400).json({
			error: 'Bad request'
		})
		next(exception)
	}
})

blogsRouter.delete('/:id', async (request, response) => {
	// console.log( request )
	if (!request.token) {
		return response.status(401).json({ error: 'token missing' })
	}
	
	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	
	if (!decodedToken.id) {
		return response.status(401).json({ error: 'token missing or invalid' })
	}

	const blog = await Blog.findById(request.params.id)

	// console.log( blog.user )
	// console.log( decodedToken.id )

	if (blog.user.toString() === decodedToken.id) {
		await Blog.findByIdAndRemove(request.params.id)
		response.status(204).end()
	} else {
		response.status(404).end()
	}
})

blogsRouter.put('/:id', async (request, response, next) => {
	try {
		const id = request.params.id
		const body = request.body

		const blog = {
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes
		}
		await Blog.findByIdAndUpdate(id, blog, {new: true})
		response.sendStatus(200).json(blog)
	}
	catch (exception) {
		next(exception)
	}
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
	try {
		const body = request.body
		const id = request.params.id

		const blog = await Blog.findById(id)
		blog.comments = blog.comments.concat(body.value)
		await Blog.findByIdAndUpdate( id, blog )
		response.sendStatus(201).json(blog)
	}
	catch (exception) {
		next( exception )
	}
})

module.exports = blogsRouter
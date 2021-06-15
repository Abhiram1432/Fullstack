const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

const helper = require('./helper')

describe('Blogs testing', () => {

	beforeEach( async () => {
		await Blog.deleteMany({})

		const blogObjs = helper.initialBlogs
			.map( (blog) => new Blog(blog) )
		const promisedArray = blogObjs.map( (blog) => blog.save())
		await Promise.all(promisedArray)
	})

	describe ('Basic checks', () => {
		test('Simple get request', async () => {
			const blogs = await api
				.get('/api/blogs')
				.expect(200)
				.expect('Content-type', /application\/json/)
			
			expect(blogs.body.length).toEqual(helper.initialBlogs.length)
		})
	
		test('is ID defined', async () => {
			const response = await api.get('/api/blogs')
	
			const content = response.body[0]
			expect(content.id).toBeDefined()
		})
	})
	
	describe('POST request checks', () => {
		test('Adding with all params', async () => {
			const blog = new Blog({
				title: 'Why so serious?',
				author: 'John Doe',
				url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS',
				likes: 100
			})
	
			await api
				.post('/api/blogs')
				.send(blog)
				.expect(201)
				.expect('Content-type', /application\/json/)
	
			const blogsAtEnd = await helper.blogsInDb()
			expect(blogsAtEnd.length).toEqual(helper.initialBlogs.length + 1)
	
			const result = {
				title: 'Why so serious?',
				author: 'John Doe',
				url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS',
				likes: 100
			}
			expect(helper.extractTAUL(blogsAtEnd[blogsAtEnd.length - 1])).toEqual(result)
		})
	
		test('Adding without likes parameter', async () => {
			const blog = new Blog({
				title: 'Why so serious?',
				author: 'John Doe',
				url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS',
			})
	
			await api
				.post('/api/blogs')
				.send(blog)
				.expect(201)
				.expect('Content-type', /application\/json/)
	
			const blogsAtEnd = await helper.blogsInDb()
			expect(blogsAtEnd.length).toEqual(helper.initialBlogs.length + 1)
	
			const result = {
				title: 'Why so serious?',
				author: 'John Doe',
				url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS',
				likes: 0
			}
			expect(helper.extractTAUL(blogsAtEnd[blogsAtEnd.length - 1])).toEqual(result)
		})
	
		test('Adding without title and url parameters', async () => {
			const blog = new Blog({
				author: 'John Doe'
			})
	
			await api
				.post('/api/blogs')
				.send(blog)
				.expect(400)
		})
	})
	
	describe('Delete route check',() => {
		test('send 204 when valid id', async () => {
			const blogs = await helper.blogsInDb()
	
			await api
				.delete(`/api/blogs/${blogs[0].id}`)
				.expect(204)
	
			const blogsAtEnd = await helper.blogsInDb()
			expect(blogsAtEnd.length).toEqual(helper.initialBlogs.length - 1)
		})
	})
	
	describe('Update route checks', () => {
		test('when valid entry is checked', async () => {
			const blogs = await helper.blogsInDb()
			
			const updatedBlog = blogs[0]
			updatedBlog.likes += 10
	
			await api
				.put(`/api/blogs/${blogs[0].id}`)
				.send(updatedBlog)
				.expect(200)
	
			const blogsAtEnd = await helper.blogsInDb()
			expect(blogsAtEnd[0]).toEqual(updatedBlog)
		})
	})
})

describe('User testing routes', () => {
	beforeEach( async () => {
		await User.deleteMany({})
	})

	test('creation succeeds with fresh username', async () => {
		const users = await helper.usersInDb()

		// const usernames = users.map( user => user.username )
		// expect(usernames).toContain('root')

		const newUser = {
			username: 'neel12',
			name: 'Neel',
			password: '0'
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(200)
			.expect('Content-Type', /application\/json/)
		
		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd.length).toEqual(users.length + 1)
		
		const usernames = usersAtEnd.map( user => user.username )
		expect(usernames).toContain( newUser.username )
	})
})

afterAll( () => {
	mongoose.connection.close()
})
const config = require('./utils/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const middleware = require('./utils/middleware')
const tokenMiddleware = require('./utils/tokenMiddleware')
const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const logger = require('./utils/logger')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then( () => {
		logger.info('Connected to MongoDB')
	})
	.catch( (error) => {
		logger.error('Error connecting to MongoDB:', error.message)
	})

app.use(cors())
app.use(bodyParser.json())
app.use(tokenMiddleware)

app.use('/api/users', userRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
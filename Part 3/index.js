require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
morgan.token('body', function(req, res) { return JSON.stringify( req.body ) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
	{
		id: 1,
		name: 'Arto Hellas',
		number: '040-123456'
	},
	{
		id: 2,
		name: 'Ada Lovelace',
		number: '39-44-5323523'
	},
	{
		id: 3,
		name: 'Dan Abramov',
		number: '12-43-234353'
	},
	{
		id: 4,
		name: 'Mary Poppendick',
		number: '39-23-6423122'
	}
]

const getRandom = ( length ) => {
	return Math.ceil(Math.random() * Math.pow(10, length))
}

const generateNumber = () => {
	return getRandom(2)+'-'+getRandom(2)+'-'+getRandom(7)
}

app.get('/', (req, res, next) => {
	res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res, next) => {
	let length = 0
	Person.find({})
		.then( persons => {
			length = persons.length
			const message = `<p>Phonebook has info has ${length} people</p><br>` 
				+ (new Date().toString() )
			console.log(message)
			res.send(message)
		}).catch( error => next(error))
})

app.get('/api/persons', (req, res, next) => {
	Person.find({})
		.then( persons => {
			res.json( persons.map( person => person.toJSON()))
		})
		.catch( error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
	Person.findById(req.params.id)
		.then( person => {
			res.json(person.toJSON())
		})
		.catch( error => next(error))
})

// Left to change
app.delete('/api/persons/:id', (req, res) => {
	Person.findByIdAndRemove(req.params.id)
		.then( result => {
			res.send(204).end()
		})
		.catch( error => next(error))

})

app.put('/api/persons/:id', (req, res, next) => {
	const body = req.body

	const person = {
		name: body.name,
		number: body.number
	}
	
	Person.findByIdAndUpdate(req.params.id, person, { new: true })
		.then( result => {
			res.status(204).end()
		})
		.catch( error => next(error))
})

app.post('/api/persons', (req, res, next) => {
	const body = req.body

	const person = new Person({
		name: body.name,
		number: body.number || generateNumber()
	})
	person.save()
		.then( newPerson => {
		    res.json(newPerson.toJSON())
		})
		.catch( error => next(error))
    
})

const unknownEndpoints = (req, res, next) => {
	res.status(404).send({ error: 'Unknown Endpoint' })
}

app.use(unknownEndpoints)

const errorHandler = ( req, res, error, next ) => {
	console.log(error.message)
    
	if(error.name === 'CastError' && error.kind === 'ObjectId'){
		return res.status(400).json({ error: 'malformatted id' })
	}else if(error.name === 'ValidationError'){
		return res.status(400).json({ error: error.message })
	}
    
	next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen( PORT, () => {
	console.log(`Service is currently working on port ${PORT}`)
})
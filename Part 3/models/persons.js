const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect( url, { useNewUrlParser: true })
	.then( result => {
		console.log('Connected to MongoDB')
	})
	.catch( error => {
		console.log('Error connecting to MongoDB:', error.message)
	})

const phoneSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		minlength: 3
	},
	number: {
		type: String,
		minlength: 8,
		required: true
	}
})

phoneSchema.plugin(uniqueValidator)

phoneSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject.__v
		delete returnedObject._id
	}
})

module.exports = mongoose.model('Phonebook', phoneSchema)
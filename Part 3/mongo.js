const mongoose = require('mongoose')

if (process.argv.length < 3) {
	console.log('give password as argument')
	process.exit(1)
}

const password = process.argv[2]
const url = 'mongodb+srv://fullstack:krishnateja@cluster0.lk65o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

'
mongoose.connect(url, { newUrlParser: true })

const phoneSchema = new mongoose.Schema({
	name: String,
	number: String
})

const Phonebook = mongoose.model('Phonebook', phoneSchema)

if (process.argv.length === 3) {
	Phonebook.find({}).then( persons => {
		persons.forEach( person => {
			console.log(`${person.name} ${person.number}`)
		})
		mongoose.connection.close()
	})
}
else if (process.argv.length == 5) {
	const entry = new Phonebook({
		name: process.argv[3],
		number: process.argv[4]
	})

	console.log(`added ${entry.name} number ${entry.number} to the phonebook`)

	entry.save().then( response => {
		console.log('entry saved!')
		mongoose.connection.close()
	})
}
else {
	console.log('Error wrong turn of events')
	process.exit(1)
}
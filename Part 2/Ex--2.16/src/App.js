import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import personService from './services/person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber]=useState('')
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then(initialNotes => {
      setPersons(initialNotes)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number:newNumber,
      important: Math.random() > 0.5,
    }

    personService
      .create(personObject)
        .then(returnPerson => {
        setPersons(persons.concat(returnPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const displayToShow = showAll
  ? persons
  : persons.filter(person => person.important)

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>   
      
      <h2>Add A New Contact</h2>
			<form onSubmit = {addPerson}>
				Name: <input value = {newName} onChange = {handleNameChange} />
				&nbsp; &nbsp; &nbsp;
				Number: <input value = {newNumber} onChange = {handleNumberChange} />
				<br />
				<br />
				<button type = "submit">ADD</button>
			</form><br/>
      <h2>Numbers</h2>
			{displayToShow.map(person => {
				return(
					<div key = {person.id}>
						<p>{person.name}: {person.number}</p>
					</div>
				)})
			}  
    </div>
  )
}

export default App
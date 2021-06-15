import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import personService from './services/person'
import axios from "axios";
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber]=useState('')
  const [showAll, setShowAll] = useState(false)
  const [errorMessage, setErrorMessage] = useState('some error happened...')

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

  const handleChange = (name) => {
		const person = persons.find(n => n.name === name) 
		const change = {...person, number:newNumber}
		const id = person.id 
		const result = window.confirm(name + " is already added to Phonebook, replace the old number with a new one?")
		if (result) {
			personService
				.update(id, change)
				.then(response => setPersons(persons.map(person => person.id === id ? response : person)))
		}
	}

  const handleDelete = (id) => {
		
		axios
			.get(`http://localhost:3001/persons/${id}`)
			.then(response => {
				const result = window.confirm("Do you really want to delete " + response.data.name)
		
					if (result) {
						axios
							.delete(`http://localhost:3001/persons/${id}`)
							.then(response => console.log(response.data))
					} 
					
				setTimeout(() => {
					personService
						.getAll()
						.then(response => setPersons(response))
				}, 1000)
			})
	}

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} />
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
      <form onSubmit = {() => handleChange(newName)}>
         <button type = "submit">Change Contact</button>
			</form>
      <h2>Numbers</h2>
			{displayToShow.map(person => {
				return(
					<div key = {person.id}>
						<p>{person.name}: {person.number}</p>
            <button onClick = {() => handleDelete(person.id)}>Delete</button>
					</div>
				)})
			}  
    </div>
  )
}

export default App
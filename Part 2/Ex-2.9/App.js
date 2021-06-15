import React, { useState } from 'react'
import Person from './components/Person'

const App = (props) => {
  const [ persons, setPersons ] = useState(props.Phonebook) 
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber]=useState('')
  const [ searchName, setSearchName ] = useState("")
  const [ filterChange, setFilterChange ] = useState(false) 

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number:newNumber,
      id: persons.length + 1,
    }
    const repeatOrNot = () => {
			for (let i = 0; i < persons.length; i++) {
				if (newName === persons[i].name) {
					window.alert(newName + " is already added to phonebook")
					
					setPersons(persons)
				}
				else {
					setPersons(persons.concat(personObject))
				}
			}
		}
    repeatOrNot()
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchName = (event) => {
		console.log(event.target.value)
		setSearchName(event.target.value)
	}
  
  const filterItems = (query) => {
		const filter_result = persons.filter(person => person.name.toLowerCase().split(" ").join("").indexOf(query.toLowerCase()) !== -1)
		
		return filter_result
	}
	
   const personsToShow = filterChange
		? filterItems(searchName)
		: persons

  return (
      <div>
        <h2>Phonebook</h2>
        <div>
				  Filter To Show : <input type = "text" value = {searchName} onChange = {handleSearchName} />
			  </div>
        <form onSubmit={addName}>
          <h2>Add New One To The Form</h2>
          <div>
            Name : <input value={newName} onChange={handleNameChange}/>
            <br/>
            Number : <input value={newNumber} onChange={handleNumberChange}/>
          </div>
          <div>
          <input type = "submit" text = "Add" />
          </div>
        </form>
        <h2>Numbers</h2>
        <div>
          {newName} {newNumber}
        </div>
      </div>
    )
}

export default App
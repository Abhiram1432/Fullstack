import React, { useState } from 'react'
import Person from './components/Person'

const App = (props) => {
  const [ persons, setPersons ] = useState(props.Phonebook) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
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
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
      <div>
        <h2>Phonebook</h2>
        <form onSubmit={addName}>
          <div>
            Name : <input value={newName} onChange={handleNameChange}/>
          </div>
          <div>
          <input type = "submit" text = "Add" />
          </div>
        </form>
        <h2>Numbers</h2>
        <div>
          {newName}
        </div>
      </div>
    )
}

export default App
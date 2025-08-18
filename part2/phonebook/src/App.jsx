import { useState, useEffect } from 'react'
import axios from 'axios'

const Persons = ({persons}) => {
  return (
    <>
      {persons.map( person =>
          <PersonLine key={person.name} person={person} />
      )}
    </>
  )
}

const PersonLine = ({person}) => <p>{person.name} {person.number}</p>

const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('a new name...')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({
        name: newName,
        number: newNumber
      }))
      setNewName('a new name...')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} 
                  handleNameChange={handleNameChange} newNumber={newNumber} 
                  handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={persons} />
    </div>
  )
}

export default App
import { useState, useEffect } from 'react'
import personService from './services/persons'


const Persons = ({persons, handleDeleteClick}) => {
  return (
    <>
      {persons.map( person =>
        <PersonLine
          key={person.name}
          person={person}
          handleDeleteClick={() => handleDeleteClick(person)}
        />
      )}
    </>
  )
}

const PersonLine = ({person, handleDeleteClick}) => (
  <li>
    {person.name} {person.number}
    <button onClick={handleDeleteClick}>delete</button>
  </li>
)

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
    personService
      .getAll()
      .then(initPersons => setPersons(initPersons))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService.create(personObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('a new name...')
        setNewNumber('')
      })
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

  const handleDeleteClick = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deleteID(person.id).then(() => {
        setPersons(persons.filter(n => n.id !== person.id))
      }).catch(error => {
        console.error('Error deleting person:', error)
        // 可以在这里添加错误处理，比如显示错误通知
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} 
                  handleNameChange={handleNameChange} newNumber={newNumber} 
                  handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={persons} handleDeleteClick={handleDeleteClick}/>
    </div>
  )
}

export default App
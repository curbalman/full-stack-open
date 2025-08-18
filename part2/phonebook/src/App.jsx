import { useState } from 'react'

const Numbers = ({persons}) => {
  return (
    <>
      <h2>Numbers</h2>
      {persons.map( person =>
        <p key={person.name}>{person.name}</p>
      ) }
    </>

  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('a new name...')

  const addPerson = (event) => {
    event.preventDefault()
    setPersons(persons.concat({
      name: newName
    }))

  setNewName('a new name...')
  }

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      
      <Numbers persons={persons} />
    </div>
  )
}

export default App
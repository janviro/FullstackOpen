import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setNewFilterText] = useState('')

  useEffect(() => {
    console.log('effect')
    personsService.getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const shownPersons = persons.filter(p => p.name.includes(filterText))

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(p => p.name).includes(newName)) {
      window.alert(`${newName} is already added to the phonebook`)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      personsService.create(newPerson)
        .then(response => {
          setPersons(persons.concat(response.data))
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (event, id) => {
    event.preventDefault()
    if (window.confirm('Sure?')) {
      personsService.remove(id)
          .then(response => {
            setPersons(persons.filter(p => p.id !== id))
          })
    }
  }

  const changeName = (event) => {
    setNewName(event.target.value)
  }
  const changeNumber = (event) => {
    setNewNumber(event.target.value)
  }
  const filterPersons = (event) => {
    setNewFilterText(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterPersons={filterPersons} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} changeName={changeName} changeNumber={changeNumber} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons persons={shownPersons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App

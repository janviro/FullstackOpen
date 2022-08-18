import {useState, useEffect} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'
import Notification from "./components/Notification";
import notification from "./components/Notification";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterText, setNewFilterText] = useState('')
    const [notificationMessage, setNotificationMessage] = useState(null)
    const [notificationStatus, setNotificationStatus] = useState(null)

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
            if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
                updatePerson()
            }
        } else {
            createPerson()
        }
        setNewName('')
        setNewNumber('')
    }

    const createPerson = () => {
        const newPerson = {
            name: newName,
            number: newNumber
        }
        personsService.create(newPerson)
            .then(response => {
                setPersons(persons.concat(response.data))
                setNotificationStatus('success')
                setNotificationMessage(`Added ${newPerson.name}`)
                setTimeout(() => {
                    setNotificationMessage(null)
                }, 5000)
            })
    }

    const updatePerson = () => {
        let updatedPerson = persons.find(p => p.name === newName)
        updatedPerson.number = newNumber
        personsService.update(updatedPerson.id, updatedPerson)
            .then(response => {
                setNotificationStatus('success')
                setNotificationMessage(`Changed ${updatedPerson.name}`)
                setTimeout(() => {
                    setNotificationMessage(null)
                }, 5000)
            })
            .catch(error => {
                setNotificationStatus('failure')
                setNotificationMessage(`Information of ${updatedPerson.name} has already been removed from server`)
                setPersons(persons.filter(p => p.id !== updatedPerson.id))
            })
    }

    const deletePerson = (event, id, name) => {
        event.preventDefault()
        if (window.confirm(`Delete ${name}?`)) {
            personsService.remove(id)
                .then(response => {
                    setPersons(persons.filter(p => p.id !== id))
                    setNotificationStatus('success')
                    setNotificationMessage(`Deleted ${name}`)
                    setTimeout(() => {
                        setNotificationMessage(null)
                    }, 5000)
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
            <Notification message={notificationMessage} status={notificationStatus} />
            <Filter filterPersons={filterPersons}/>
            <h3>Add a new</h3>
            <PersonForm addPerson={addPerson} changeName={changeName} changeNumber={changeNumber} newName={newName}
                        newNumber={newNumber}/>
            <h2>Numbers</h2>
            <Persons persons={shownPersons} deletePerson={deletePerson}/>
        </div>
    )
}

export default App

import { useState, useEffect, use } from 'react'
import personsServices from './services/persons'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

function App() {
    const [persons, setPersons] = useState()
    const [newName , setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [filteredPersons, setFilteredPersons] = useState(persons)
    const [success, setSuccess] = useState(null)
    const [messageType, setMessageType] = useState('')

    useEffect(() => {
        personsServices
            .getAll()
            .then(response => {
                setPersons(response.data)
            })
    }, [])

    const handleNameChange = (e) => {
        setNewName(e.target.value)
    }

    const handleNumberChange = (e) => {
        setNewNumber(e.target.value)
    }

    const handleFilter = (e) => {
        setFilter(e.target.value)
        const newPersons = persons.filter(person => {
            return person.name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setFilteredPersons(newPersons)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newPerson = { name: newName, number: newNumber }
        const exists = persons.some(person => person.name === newName)
        if (exists) {
            const existingPerson = persons.filter(person => person.name === newName)
            const existingId = existingPerson[0].id
            if (window.confirm(`${newName} is already added to the phonebook, replace the old number with the new one?`)) {
                // add put service
                personsServices
                    .update(existingId, newPerson)
                    .then(response => {
                        setMessageType('success')
                        setPersons(persons.map(person => person.id === existingId ? response.data : person))
                        setNewName('')
                        setNewNumber('')
                        setSuccess(`${newName}'s number was successfully changed!`)
                        setTimeout(() => {
                            setSuccess(null)
                        }, 3000)
                    })
                    .catch(err => {
                        console.error(`An error occurred: ${err}`)
                        setSuccess(`${newName} has been romoved from the server`)
                        setMessageType('error')
                    })
            }
        } else {
            personsServices
                .create(newPerson)
                .then(response => {
                    setMessageType('success')
                    setPersons(persons.concat(response.data))
                    setNewName('')
                    setNewNumber('')
                    setSuccess(`${newName} was sucessfully added!`)
                    setTimeout(() => {
                        setSuccess(null)
                    }, 3000)
                })
                .catch(err => {
                    console.error(`An error occurred: ${err}`)
                })
        }
    }

    const handleDelete = (id, name) => {
        if (window.confirm(`Are you sure you want to delete ${name}`)) {
            personsServices
                .deletePerson(id)
                .then(response => {
                    console.log(response.data, 'delete respose data')
                    setPersons(persons.filter(person => person.id !== id))
                })
        }
    }

    return (
        <>
            <h2>Phonebook</h2>
            <Notification message={success} type={messageType} />
            <Filter onChange={handleFilter} value={filter} />
            <h2>add a new</h2>
            <PersonForm
                onSubmit={handleSubmit}
                onNameChange={handleNameChange}
                onNumberChange={handleNumberChange}
                newName={newName}
                newNumber={newNumber}
            />
            <h2>Numbers</h2>
            {persons && <Persons filter={filter} filteredPersons={filteredPersons} persons={persons} handleDelete={handleDelete} />}
        </>
    )
}

export default App

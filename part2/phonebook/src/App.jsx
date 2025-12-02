import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

function App() {
    const [persons, setPersons] = useState()
    const [newName , setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [filteredPersons, setFilteredPersons] = useState(persons)

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
    }, [])

    const handleNameChange = (e) => {
        console.log(e.target.value)
        setNewName(e.target.value)
    }

    const handleNumberChange = (e) => {
        console.log(e.target.value)
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
            alert(`${newName} is already added to the phonebook`)
        } else {
            setPersons(persons.concat(newPerson))
            setNewName('')
            setNewNumber('')
        }
    }

    return (
        <>
            <h2>Phonebook</h2>
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
            {persons && <Persons filter={filter} filteredPersons={filteredPersons} persons={persons} />}
        </>
    )
}

export default App

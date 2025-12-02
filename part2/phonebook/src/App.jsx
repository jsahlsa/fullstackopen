import { useState } from 'react'

function App() {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-1234567', id: 1 },
        { name: 'Ada Lovelace', number: '040-3142323', id: 2 },
        { name: 'Joe Sahlsa', number: '612-801-7315', id: 3 },
        { name: 'Alan Turing', number: '44-334-777889', id: 4 },
    ])
    const [newName , setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [filteredPersons, setFilteredPersons] = useState(persons)

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
        console.log(filter, e.target.value)
        const newPersons = persons.filter(person => {
            return person.name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        console.log(newPersons)
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
            filter shown with <input onChange={handleFilter} value={filter} />
            <h2>add a new</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    name: <input onChange={handleNameChange} value={newName} />
                </div>
                <div>
                    number: <input onChange={handleNumberChange} value={newNumber} />
                </div>
                <div>
                    <button type='submit'>add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {
                filter.length > 0 ?
                    filteredPersons.map(person => <p key={person.name}>{person.name} {person.number}</p>) :
                    persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)
            }
        </>
    )
}

export default App

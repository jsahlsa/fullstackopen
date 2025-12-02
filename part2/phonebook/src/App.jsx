import { useState } from 'react'

function App() {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])
    const [newName , setNewName] = useState('')

    const handleNameChange = (e) => {
        console.log(e.target.value)
        setNewName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newPerson = { name: newName }
        const exists = persons.some(person => person.name === newName)
        if (exists) {
            alert(`${newName} is already added to the phonebook`)
        } else {
            setPersons(persons.concat(newPerson))
            setNewName('')
        }
    }

    return (
        <>
            <h2>Phonebook</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    name: <input onChange={handleNameChange} value={newName} />
                </div>
                <div>
                    <button type='submit'>add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map(person => <p key={person.name}>{person.name}</p>)}
        </>
    )
}

export default App

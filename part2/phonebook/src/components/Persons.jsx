import Person from './Person'

const Persons = ({ filter, filteredPersons, persons, handleDelete }) => {

    const personsArray = filter.length > 0 ? filteredPersons : persons

    return (
        <ul>
            {
                personsArray.map(person => <Person
                    key={person.name}
                    name={person.name}
                    number={person.number}
                    handleDelete={() => handleDelete(person.id, person.name)}
                />)
            }
        </ul>
    )
}

export default Persons

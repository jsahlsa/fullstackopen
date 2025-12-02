const Persons = ({ filter, filteredPersons, persons }) => {
    return (
        <>
            {
                filter.length > 0 ?
                    filteredPersons.map(person => <p key={person.name}>{person.name} {person.number}</p>) :
                    persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)
            }
        </>
    )
}

export default Persons

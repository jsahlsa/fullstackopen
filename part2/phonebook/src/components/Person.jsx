const Person = ({ name, number, handleDelete }) => {
    return (
        <>
            <li>
                <p>{name} {number}</p>
                <button onClick={handleDelete}>delete</button>
            </li>
        </>
    )
}

export default Person

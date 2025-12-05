const Countries = ({ countries, handleGetOne }) => {
    console.log(countries)
    return (
        <>
            {countries && countries.length <= 10 ? countries.map(country => <div className="list-item"><li>{country.name.common}</li><button onClick={() => handleGetOne(country.name.common.toLowerCase())}>show</button></div>) : <p>too many to list</p>}
        </>
    )
}

export default Countries

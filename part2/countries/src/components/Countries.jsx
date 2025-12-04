const Countries = ({ countries }) => {
    console.log(countries)
    return (
        <>
            {countries && countries.length <= 10 ? countries.map(country => <li>{country.name.common}</li>) : <p>too many to list</p>}
        </>
    )
}

export default Countries

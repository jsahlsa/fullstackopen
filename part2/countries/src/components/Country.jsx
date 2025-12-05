const Country = ({ countries }) => {

    console.log('country in countries', countries)
    const country = countries && countries[0]
    console.log(country)
    const languages = Object.values(country.languages)

    return (
        <>
            <h1>{country.name.common}</h1>
            {country.capital.length === 1 ? <p>Capital: {country.capital[0]}</p> : country.capital.map(capital => <p>{capital}</p>)}
            <p>Area: {country.area.toLocaleString()}</p>
            <h2>Languages</h2>
            <ul>
                {languages.map(lang => <li>{lang}</li>)}
            </ul>
            <img src={country.flags.svg} />
        </>
    )
}

export default Country

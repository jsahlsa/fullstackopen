import axios from "axios"
import {useEffect, useState} from "react"

const Country = ({ countries }) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        const key = import.meta.env.VITE_WEATHER_KEY
        const baseUrl = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${country.capital[0]}`
        axios
            .get(baseUrl)
            .then(response => {
                console.log('weather', response.data)
                setWeather(response.data)
            })
    }, [])

    const country = countries && countries[0]
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
            <h2>Weather in {country.capital[0]}</h2>
            <p>Temperature: {weather.current.temp_c} C</p>
            <img class="weather-icon" src={weather.current.condition.icon} />
            <p>Wind {weather.current.wind_kph} kph</p>
        </>
    )
}

export default Country

import { useEffect, useState } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Country from './components/Country'

function App() {
    const [loading, setLoading] = useState(true)
    const [countries, setCountries] = useState(null)
    const [value, setValue] = useState('')

    useEffect(() => {
        console.log('effect run')
        setLoading(true)

        if (value) {
            console.log('fetching countries')
            axios
                .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
                .then(response => {
                    const allCountries = response.data
                    const filtered = allCountries.filter(country => {
                        const valueLower = value.toLowerCase()
                        const countryLower = country.name.common.toLowerCase()
                        return countryLower.includes(valueLower)
                    })
                    setLoading(false)
                    setCountries(filtered)
                    console.log('value', value)
                })
        }
    }, [value])

    const handleGetOne = (name) => {
        setLoading(true)
        axios
            .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
            .then(response => {
                setLoading(false)
                console.log(response.data)
                setCountries([response.data])
            })
    }

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    if (loading) {
        return (
            <>

                find countries <input onChange={handleChange} value={value} />
            </>
        )
    }

    if (countries && countries.length === 0) {
        return (
            <>
                find countries <input onChange={handleChange} value={value} />
                <p>No countries match</p>
            </>
        )
    }

    return (
        <>
            find countries <input onChange={handleChange} value={value} />
            { countries && countries.length > 1 ?  <Countries countries={countries} handleGetOne={handleGetOne}  /> : <Country countries={countries} /> }
        </>
    )
}

export default App

import Country from "./Country"
import {useState} from 'react'

const CountryList = ({countries}) => {
    const [countryToShow, setCountryToShow] = useState(null)

    return (
        <>
        <ul>
            {countries.sort((x, y) => x.name.common.localeCompare(y.name.common)).map(country =>
                <li key={country.cca2}>
                    {country.name.common} <button onClick={() => setCountryToShow(country)}>show</button>
                </li>)}
        </ul>
        <Country country={countryToShow}/>
        </>
        
    )
}

export default CountryList
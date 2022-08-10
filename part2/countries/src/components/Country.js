import Weather from './Weather'

const Country = ({country}) => {
    if (country === null) {
        return null;
    }
    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>capital {country.capital[0]}</p>
            <p>area {country.area}</p>
            <b>languages: </b>
            <ul>
            {Object.values(country.languages).map((language, index) =>
            <li key={index}>{language}</li>
            )}
            </ul>
            <img src={country.flags.png} />
            <Weather city={country.capital[0]} cca2={country.cca2}/>
        </div>
    )
}

export default Country
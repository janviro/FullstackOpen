import { useState, useEffect } from 'react'
import axios from 'axios'
import CountrySearch from './components/CountrySearch'
import CountryList from './components/CountryList'
import Country from './components/Country'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchString, setSearchString] = useState('')

  useEffect(() => {
    console.log('fetching')
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => { 
        console.log('Response ', response)
        setCountries(response.data)
      })
  }, [])
  
  const matchingCountries = countries.filter(c => c.name.common.includes(searchString))

  let countryElement;

  if(matchingCountries.length === 0) {
    countryElement = <p>No country matches your search</p>
  } else if (matchingCountries.length === 1) {
    countryElement = <Country country={matchingCountries[0]}/>
  } else if (matchingCountries.length <= 10) {
    countryElement = <CountryList countries={matchingCountries}/>
  } else {
    countryElement = <p>Too many matches, specify another filter</p>
  }

  console.log('render', countries.length, 'countries')

  const filterCountries = (event) => {
    setSearchString(event.target.value)
  }

  return (
    <>
      <CountrySearch filterCountries={filterCountries}/>
      {countryElement}
    </>
  )
}

export default App;

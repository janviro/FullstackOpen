import {useState, useEffect} from 'react'
import axios from 'axios'
import useCoordinates from '../hooks/UseCoordinates'

const Weather = ({city, cca2}) => {
    const [latitude, longitude] = useCoordinates(city, cca2)
    const [temperature, setTemperature] = useState()
    const [windSpeed, setWindSpeed] = useState()
    const [iconUrl, setIconUrl] = useState('')

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}&units=metric`)
            .then(response => {
                console.log('Response: ', response)
                setTemperature(response.data.main.temp)
                setWindSpeed(response.data.wind.speed)
                setIconUrl('http://openweathermap.org/img/wn/' + response.data.weather[0].icon + '@2x.png')
            })
    })

    return (
        <>
            <h2>Weather in {city}</h2>
            <img src={iconUrl}/>
            <p>temperature {temperature} Celsius</p>
            <p>wind {windSpeed} m/s</p>
        </>
    )
}

export default Weather
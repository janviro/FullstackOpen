import { useState, useEffect } from 'react'
import axios from 'axios'

const useCoordinates = (city, cca2) => {
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    useEffect(() => {
        console.log('fetching lat and long')
        axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${cca2}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`)
            .then(response => {
                console.log('Response: ', response)
                console.log('Lat is ', latitude, 'and long is ', longitude)
                setLatitude(response.data[0].lat)
                setLongitude(response.data[0].lon)
            })
    })

    return [latitude, longitude]
}

export default useCoordinates
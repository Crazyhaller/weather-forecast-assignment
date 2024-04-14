import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  WiThermometer,
  WiHumidity,
  WiStrongWind,
  WiHorizon,
} from 'react-icons/wi'

interface WeatherData {
  weather: {
    main: string
    description: string
  }[]
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    humidity: number
  }
  wind: {
    speed: number
  }
  visibility: number
}

const Weather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const city = localStorage.getItem('city') || 'Unknown City'
  const lat = parseFloat(localStorage.getItem('lat') || '0')
  const lon = parseFloat(localStorage.getItem('lon') || '0')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
        )

        const responseData = await response.data
        setWeatherData(responseData)
      } catch (error) {
        console.error('Error Fetching Weather:', error)
      }
    }

    fetchData()
  }, [lat, lon])

  return (
    <div className="p-6">
      {weatherData ? (
        <div className="bg-blue-100 p-4 rounded-md shadow-sm">
          <h2 className="text-2xl font-bold text-red-500 mb-4">
            Weather in {city}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-md shadow-sm flex items-center">
              <WiThermometer className="text-red-500 text-3xl" />
              <div className="ml-4">
                <h3 className="text-xl font-semibold">Temperature</h3>
                <p>{weatherData.main.temp}°F</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm flex items-center">
              <WiThermometer className="text-red-500 text-3xl" />
              <div className="ml-4">
                <h3 className="text-xl font-semibold">Feels Like</h3>
                <p>{weatherData.main.feels_like}°F</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm flex items-center">
              <WiThermometer className="text-red-500 text-3xl" />
              <div className="ml-4">
                <h3 className="text-xl font-semibold">Min Temperature</h3>
                <p>{weatherData.main.temp_min}°F</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm flex items-center">
              <WiThermometer className="text-red-500 text-3xl" />
              <div className="ml-4">
                <h3 className="text-xl font-semibold">Max Temperature</h3>
                <p>{weatherData.main.temp_max}°F</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm flex items-center">
              <WiHumidity className="text-red-500 text-3xl" />
              <div className="ml-4">
                <h3 className="text-xl font-semibold">Humidity</h3>
                <p>{weatherData.main.humidity} %</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm flex items-center">
              <WiStrongWind className="text-red-500 text-3xl" />
              <div className="ml-4">
                <h3 className="text-xl font-semibold">Wind Speed</h3>
                <p>{weatherData.wind.speed} m/hr</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm flex items-center">
              <WiHorizon className="text-red-500 text-3xl" />
              <div className="ml-4">
                <h3 className="text-xl font-semibold">Visibility</h3>
                <p>{weatherData.visibility} meters</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
export default Weather

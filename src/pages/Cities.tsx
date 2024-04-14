import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FiSearch, FiChevronDown, FiChevronUp } from 'react-icons/fi'

interface City {
  name: string
  country: string
  timezone: string
  coordinates: {
    lat: number
    lon: number
  }
}

const Cities = () => {
  const [cities, setCities] = useState<City[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()
  const [sortOrder, setSortOrder] = useState('asc')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?select=name%2C%20cou_name_en%20as%20country%2C%20timezone%2C%20coordinates&limit=100'
        )

        const responseData = await response.data
        setCities(responseData.results)
      } catch (error) {
        console.error('Error Fetching Cities:', error)
      }
    }

    fetchData()
  }, [])

  const handleCityClick = (cityName: string, lat: number, lon: number) => {
    localStorage.setItem('city', cityName)
    localStorage.setItem('lat', lat.toString())
    localStorage.setItem('lon', lon.toString())
    navigate('/weather')
  }

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  const sortedCities = [...filteredCities].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name)
    } else {
      return b.name.localeCompare(a.name)
    }
  })

  return (
    <div className="6 pt-5">
      <div className="flex items-center bg-blue-100 p-2 rounded-md shadow-sm ">
        <FiSearch className="text-blue-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a city"
          className="ml-2 focus:outline-none bg-transparent"
        />
      </div>
      <table className="min-w-full divide-y divide-gray-200 mt-6 bg-white rounded-md shadow-sm">
        <thead className="bg-red-500 text-white">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              <button onClick={handleSort} className="flex items-center">
                City Name
                {sortOrder === 'asc' ? (
                  <FiChevronUp size={20} />
                ) : (
                  <FiChevronDown size={20} />
                )}
              </button>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Country
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Timezone
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Coordinates
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedCities.map((city) => (
            <tr
              key={city.name}
              className="text-blue-500 hover:bg-blue-100 cursor-pointer"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() =>
                    handleCityClick(
                      city.name,
                      city.coordinates.lat,
                      city.coordinates.lon
                    )
                  }
                  className="text-blue-500 hover:text-black hover:font-bold focus:outline-none"
                >
                  {city.name}
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{city.country}</td>
              <td className="px-6 py-4 whitespace-nowrap">{city.timezone}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {city.coordinates.lat}, {city.coordinates.lon}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Cities

import React, { useState, useEffect } from 'react'

const App = () => {
  const [ nations, setNations ] = useState([])
	const [ searchNation, setSearchNation ] = useState("")
	const [ search, setSearch ] = useState(false)
	const [ weather, setWeather ] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setNations(response.data)
      })
  }, [])

  useEffect(() => {
		axios
			.get("http://www.apixu.com/doc/Apixu_weather_conditions.json")
			.then(response => setWeather(response.data))
	}, [])

  const handleChange = (event) => {
		event.preventDefault()
	}

	const searchCountry = (event) => {
		console.log(event.target.value)
		setSearchNation(event.target.value)
		if (event.target.value === "") {
			setSearch(false)
		}
		else {
			setSearch(true)
		}
	}
	
	const handleClick = () => {
		console.log("view")
	}
	
	const Filter_results = (query) => {
		const results = nations.filter(nation => nation.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 )
		return results
	}
	
	const displayToShow = search
		? Filter_results(searchNation)
		: nations

  const ShowAll = () => {
		
      if (search === false) {
        return null
      }
      
      else {
        if (displayToShow.length > 10) {
          return (
            <div>
              <p>Too Many Matches, Specify Another Filter</p>
            </div>
          )
        }
        else if (displayToShow.length <= 10 && displayToShow.length >= 2) {
          return (
            <div>
              {displayToShow.map(nation => {
                return (
                  <div key ={nation.area}>
                    <p key={nation.name}>{nation.name}</p>
                  </div>
                )
              }		
              )}
            </div>
          )
        }
        else if (displayToShow.length === 1) {
          console.log(displayToShow)
          return (
            <div>
              <h2>{displayToShow[0].name}</h2>
              <p>Capital: {displayToShow[0].capital}</p>
              <p>Population: {displayToShow[0].population}</p>
              <h4>Languages</h4>
                <ul>
                  {displayToShow[0].languages.map(one => <li key = {one.name}>{one.name}</li>)}
                </ul>
              <h3>Weather in {displayToShow[0].capital}</h3>
              <p>Day: {weather[Math.floor(Math.random()*weather.length)].day}</p>
              <p>Night: {weather[Math.floor(Math.random()*weather.length)].night}</p>
            </div>
          )
        }
        else {
          return (
            <div>
              <p>Opps,there's something wrong about your searching...Please Try Again!</p>
            </div>
          )
        }
      }
    }
    return (
      <div>
        <form onSubmit = {handleChange}>
          Search by Country Name: <input type = "text" value = {searchNation} onChange = {searchCountry} />
        </form>
        <ShowAll/>
      </div>
    ) 
}

export default App;
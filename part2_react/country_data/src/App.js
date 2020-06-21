import React, {useEffect, useState} from 'react';
import axios from 'axios';


const SearchBar = ({text, setSearch, search}) =>{

  const handleChange = (event) => {
      setSearch(event.target.value)
  }
  
    return(
      <>
        {text} <input onChange={handleChange} value={search}/>
      </>
    )
  }

const App = () => {

  const [countryData, setCountryData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(()=>{
    console.log("Fetching...")
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response =>{
        console.log("Data fetched succesfully.", response.data, response.data.length, "items fetched.")
        setCountryData(response.data)
      })

  },[])

  let filteredList = countryData.filter(country => !country.name.toUpperCase().indexOf(search.toUpperCase()) )

  let showCountries = filteredList.length<10 ? <CountryList countries={filteredList}/> : <p>Too many hits..</p>
  
  return (
    <div className="App">
      <SearchBar text="Filter countries:" setSearch={setSearch} search={search}/>
      {showCountries}
    </div>
  );
}

export default App;


const CountryList = ({countries}) => {


  let list = countries.map((country, i, arr) =>{
    let onlyOne = arr.length===1;
    return <CountryInfo country={country} key={country.alpha3Code} onlyOne={onlyOne}/> })


  return(
    <ul>
      {list}
    </ul>
  )
}

const CountryInfo = ({country, onlyOne}) =>{
  const [info, showInfo] = useState(undefined)

  useEffect(()=>{
    if(onlyOne===true){
      showInfo(onlyOne)
    }
  }, [onlyOne])
  
  return(
    <>
      <li >{country.name} 
        <button onClick={() => showInfo(!info)}>
          {info?'hide':'show'}
        </button>
      </li>
      {info ? <MoreInfo country={country}/> : null}
    </>
  )
}

const MoreInfo = ({country}) =>{ 

  const [weatherData, setData] = useState(undefined);


  useEffect(()=>{
    console.log("Fetching weather data..")
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.name}`)
      .then(response => {
        console.log("Fetch succesful. Data:", response.data.current)
        setData(response.data.current)})
  },[])

  return(
    <>
      <h1>{country.name}</h1>
      <p> capital {country.capital}</p>
      <p> population {country.population}</p>
      <h2>Spoken languages</h2>
        <ul>
          {country.languages.map((language,i) => {return <li key={i}>{language.name}</li>})}
        </ul>
      <img src={country.flag} alt="flag" style={{width: '120px'}}/>

      {weatherData ? <WeatherData data={weatherData} country={country.name}/> : <h2>Fetching weather data...</h2>}
    </>
  )
}

const WeatherData = ({data, country}) => {
  return(
    <>
      <h2>Weather in {country}</h2>
      <h4>Temperature: <p></p>{data.temperature} Celcius </h4>
      <img src={data.weather_icons[0]} alt="weather-icon"/>
      <h4>Wind: {data.wind_degree}mph Direction {data.wind_dir}</h4>
    </>
  )
}


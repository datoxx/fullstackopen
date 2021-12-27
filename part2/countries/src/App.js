import React, { useState, useEffect } from 'react'
import axios from 'axios'


function App() {

const [countries, setCountries] = useState([])
const [filter, setFilter] = useState('');
//const [displayCountries, setDisplayCountries] = useState('to many matches, specify filter')

useEffect(() => {

  axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
     console.log(response.data);
     setCountries(response.data)
    })
}, [])


const handleFilterChange = (e) => {
  setFilter(e.target.value.toLowerCase())
  
}

const filterCountries = filter === '' ? countries
  : countries.filter(list => list.name.common.toLowerCase().includes(filter))


  const display = filterCountries.length > 10 
  ? 'type for search your countries'
  : filterCountries.length > 1 && filterCountries.length < 10 ? 
      (filterCountries.map(item => {
        return <p key={item.name.common}>{item.name.common}</p>
      }))                               
  : (filterCountries.map(item => {
    console.log(item);
    return (
      <div key={item.name.common}>
        <h1>{item.name.common}</h1>
        <p>continents: {item.continents}</p>
        <p>capital: {item.capital}</p>
        <p>population: {item.population}</p>
        <h2>Flag</h2>
        <img src={item.flags.png} alt="photo" />
      </div>
      )
  }))     


  return (
    <div>
      find countries: <input 
        value={filter}
        onChange={handleFilterChange}
        placeholder="search"
      />      
      <br />
      <br />
      {display}
    </div>
  );
}

export default App;

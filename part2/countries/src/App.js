import React, { useState, useEffect } from 'react'
import axios from 'axios'


function App() {
  // array store the countries objects
  const [countries, setCountries] = useState([])
  // filter input  value
  const [filter, setFilter] = useState('');
  //const [displayCountries, setDisplayCountries] = useState('to many matches, specify filter')

  // fetch data from this link https://restcountries.com/v3.1/all
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
      console.log(response.data);
      setCountries(response.data)
      })
  }, [])

  // filter input's event handle
  const handleFilterChange = (e) => {
    setFilter(e.target.value.toLowerCase())
    
  }

  // user filter countries  by input
  const filterCountries = filter === '' ? countries
    : countries.filter(list => list.name.common.toLowerCase().includes(filter))


  const display = filterCountries.length > 10  // << if true 
  ? 'type for search your countries' // this happen
  : filterCountries.length > 1 && filterCountries.length < 10  //  << else if true
  ? (filterCountries.map(item => {             // this happen  
    <p key={item.name.common}>{item.name.common}</p>
    }))                           
  : (filterCountries.map(item => {   // else this happen
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

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'
import Filter from './components/Filter'


function App() {
  // array store the countries objects
  const [countries, setCountries] = useState([])
  // filter input  value
  const [filter, setFilter] = useState('');

  // fetch data from this link https://restcountries.com/v3.1/all
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
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
  
  const show = filterCountries.length > 10 
    ? 'type for search your countries'
    : filterCountries.length > 1 && filterCountries.length < 10 
    ? filterCountries.map(item => <p key={item.population}>{item.name.common}</p>)                           
    : filterCountries.map(item => <Country key={item.name.common} item={item} />)
    
  return (
    <div>
     <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <br />
      {show}
    </div>
  );
}

export default App;

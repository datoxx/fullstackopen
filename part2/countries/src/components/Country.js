import React from "react"

const Country = ({item}) => {
    return ( 
        <div>
            <h1>{item.name.common}</h1>
            <p>continents: {item.continents}</p>
            <p>capital: {item.capital}</p>
            <p>population: {item.population}</p>
            <h2>Flag</h2>
            <img src={item.flags.png} alt="photo" />
        </div>
     );
}
 
export default Country;
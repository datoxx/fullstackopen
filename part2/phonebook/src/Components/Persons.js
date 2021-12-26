import React from "react"
import List from "./List";

const Persons = ({displayList}) => {
    return ( 
        <ul>
        {displayList.map(list => 
          <List key={list.id} list={list} />
          )}
      </ul>
     );
}
 
export default Persons;
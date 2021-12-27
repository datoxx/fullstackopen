import React from "react"
import List from "./List";

const Persons = ({displayList}) => {
    return ( 
        <div>
        <ul>
            {displayList.map(list => 
            <List key={list.id} list={list} />
            )}
        </ul>
      </div>
     );
}
 
export default Persons;
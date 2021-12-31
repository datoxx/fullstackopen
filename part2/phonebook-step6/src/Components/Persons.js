import React from "react"
import List from "./List";

const Persons = ({displayList, handleDelete}) => {
    return ( 
        <div>
        <ul>
            {displayList.map(list => 
            <List key={list.id} list={list} handleDelete={() => handleDelete(list.id)} />
            )}
        </ul>
      </div>
     );
}
 
export default Persons;
import React from "react"

const Persons = ({displayList, handleDelete}) => {
    
    return ( 
        displayList.map(list => 
            <p key={list.id}> 
                {list.name} {list.number} 
                <button onClick={() => handleDelete(list.id)}>Delete</button>
            </p>     
        )
    )
}
 
export default Persons;
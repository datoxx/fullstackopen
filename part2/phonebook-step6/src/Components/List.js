import React from 'react'

const List = ({list, handleDelete}) => {
    return ( 
        <li>
            {list.name} {list.number} 
            <br />
            <button onClick={handleDelete}>Delete</button>
        </li>
     );
}
 
export default List;
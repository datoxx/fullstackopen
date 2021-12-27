import React from 'react'

const List = ({list}) => {
    return ( 
        <li>{list.name} {list.number}</li>
     );
}
 
export default List;
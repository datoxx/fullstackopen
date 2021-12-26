import React from "react"

const Filter = ({filterText, handleFilterChanges}) => {
    return ( 
        <div>
        filter : <input 
          value={filterText}
          onChange={handleFilterChanges}
        />
      </div>
     );
}
 
export default Filter;
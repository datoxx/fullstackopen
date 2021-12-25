import React from "react";
import Part from "./Part"

const Content = ({course}) => {
    return ( 
        <div>
        {course.parts.map(item => 
            <Part key={item.id} part={item} />
        ) }
    </div>
     );
}
 
export default Content;
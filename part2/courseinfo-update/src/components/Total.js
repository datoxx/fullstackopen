import React from "react";

const Total = ({course}) => {
    const total = course.parts.reduce((s, p) => {
        return  s + p.exercises;
      }, 0)

    return (  
        <p> total of exercises {total} </p>
    );
}
 
export default Total;
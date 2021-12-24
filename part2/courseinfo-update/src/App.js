import React from "react";

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]



  return (
    <div>
      <h1>Web development curriculum</h1>
      <Course course={courses[0]} />
      <Course course={courses[1]} />
    </div>
  )
}

const Course =({course}) => {
  return (
    <div>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
  </div>
  );
}

const Header = ({course}) => {
  return(
    <h2>{course.name}</h2>
  );
}

const Content = ({course}) => {
  return (
    <div>
     {course.parts.map(item => 
       <Part key={item.id} part={item} />
      )}
    </div>
  );
}

const Part = ({part}) => {
  return(
    <p>{part.name}{part.exercises}</p>
  ); 
} 

const Total = ({course}) => {

  const total = course.parts.reduce((s, p) => {
    return  s + p.exercises;
  }, 0)

  return (
    <p> total of exercises {total} </p>
  );
}



export default App;


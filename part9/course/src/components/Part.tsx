import * as React from 'react';
import { CoursePart } from '../type'


const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  

type Props = {
    course: CoursePart
};

const Part = ({ course }: Props) => {
    switch (course.name) {
        case 'Fundamentals':
          return (
              <div>
                    <h3>{course.name} {course.exerciseCount}</h3>
                    <p>
                        {course.description} 
                    </p>
              </div>
          );
        case 'Using props to pass data':
          return (
              <div>
                    <h3>{course.name} {course.exerciseCount}</h3>
                    <p>
                    groupProject: {course.groupProjectCount} 
                    </p>
              </div>
          );
        case 'Deeper type usage':
          return (
              <div>
                    <h3>{course.name} {course.exerciseCount}{' '}</h3>
                    <p>
                        {course.description} 
                        {course.exerciseSubmissionLink}
                    </p>
              </div>
            
          );
        case 'Fullstackopen':
          return (
              <div>
                  <h3>{course.name} {course.exerciseCount}{' '}</h3>
                    <p>
                        {course.description} 
                        {course.studentEnrolled}
                    </p>
              </div>
          );
        default:
          return assertNever(course);
      }
};

export default Part;
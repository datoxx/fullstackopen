// @flow 
import * as React from 'react';
type Props = {
    course: {name: string, exerciseCount: number}[]
};
const Total = (props: Props) => {
    return (
        <div>
            <p>
                Number of exercises{" "}
                {props.course.reduce((carry, part) => carry + part.exerciseCount, 0)}
            </p>
        </div>
    );
};

export default Total 
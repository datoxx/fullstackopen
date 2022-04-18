// @flow 
import * as React from 'react';
import { CoursePart } from '../type'

type Props = {
    courses: CoursePart[]
};
const Total = (props: Props) => {
    return (
        <div>
            <h4>
                Number of exercises{" "}
                {props.courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
            </h4>
        </div>
    );
};

export default Total 

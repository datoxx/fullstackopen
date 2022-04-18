import * as React from 'react';
import Part from './Part';
import { CoursePart } from '../type'

type Props = {
    courses: CoursePart[];
};

const Content = ({ courses }: Props ) =>  {
    return (
        <div>
            {courses.map(course =>  <Part  key={course.name} course={course} /> )}
        </div>
    );
};

export default Content;
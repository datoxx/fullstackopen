import * as React from 'react';
type Props = {
    course: {name: string, exerciseCount: number}[]
};
 const Content = (props: Props) => {
    return (
        <div>
            <p>
                {props.course[0].name} {props.course[0].exerciseCount}
            </p>
            <p>
                {props.course[1].name} {props.course[1].exerciseCount}
            </p>
            <p>
                {props.course[2].name} {props.course[2].exerciseCount}
            </p>
        </div>
    );
};

export default Content;
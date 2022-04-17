import * as React from 'react';
type Props = {
    name: string
};
 const Header = (props: Props) => {
    return (
        <div>
            <h1>{props.name}</h1>
        </div>
    );
};

export default Header;
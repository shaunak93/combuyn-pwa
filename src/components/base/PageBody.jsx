import React from 'react';

function PageBody(props) {
    let {children} = props;
    return (
        <div className="page-body">
            {children}
        </div>
    );
}

export default PageBody;
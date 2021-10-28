import React from 'react';

function Article(props) {
    let {label, details} = props;
    return (
        <>
            <p style={{margin: '0', fontSize: '20px', color: '#016FB8', fontWeight: 'bold'}}>{label}</p>
            <p style={{marginTop: '10px', fontSize: '12px', color: '#2B2B2B', fontWeight: '500'}}>{details}</p>
        </>
    );
}

export default Article;
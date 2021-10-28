import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

function LoaderOverlay(props) {
    let {show} = props;
    return (
        <>
            {show && 
                <div 
                style={{
                    top: '0',
                    boxSizing: 'border-box',
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    textAlign:'center',
                    paddingTop: 'calc(50% - 5rem)',
                    zIndex: '999',
                    background:' #17161654'
                }}
                >
                    <CircularProgress
                        variant="indeterminate"
                        size={'5rem'}
                        thickness={'4'}
                        color={'primary'}
                    />
                </div>
            }
        </>
        
    );
}

export default LoaderOverlay;
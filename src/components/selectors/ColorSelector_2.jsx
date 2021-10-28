import React, { useState } from 'react';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';

function ColorSelector(props) {
    let {selectedOption, options, onChange} = props;
    console.log({selectedOption, options, onChange});
    return (
        <div style={{position: 'relative', minHeight: '28px',  margin: '10px 0',boxSizing:'border-box',
        borderRadius: '8px', backgroundColor: 'transparent'}}>
        <div style={{display: 'inline-block', width: '70px', height: '28px', verticalAlign: 'top'}}>
            <p style={{fontSize: '16px', fontWeight: 'bold', color: '#4D4D4D', margin: '0', width: 'max-content', paddingTop: '10px'}}>Color</p>
        </div>
        <div style={{display: 'inline-block', textAlign: 'right', width: 'calc(100% - 70px)', height: 'max-content'}}>
            {options.map((option) => 
                <ColorOption 
                onClick={()=>{onChange(option.value)}}
                key={option.key}
                value={option.value}
                isSelected={option.value === selectedOption}
                />
            )}
        </div>
    </div>
    );
    // onClick={()=>{onChange(option.value)}}
    // key={option.id}
    // value={option.display_name || option.value}
    // isSelected={option.value === selectedOption}
}

const ColorOption = (props) => {
    let {onClick, key, value, isSelected} = props;
    console.log({onClick, key, value, isSelected});
    return (<div onClick={onClick} style={{display: 'inline-block', width: '28px', height: '28px', borderRadius: '14px', backgroundColor: value, marginRight: '5px'}}>
        {isSelected && <DoneRoundedIcon style={{display:'inline-block',color: '#ffffff', height: '18px', width: '18px', padding: '5px'}}/>}
    </div>)
}

export default ColorSelector;
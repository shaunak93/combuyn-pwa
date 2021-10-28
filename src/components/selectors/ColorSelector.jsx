import React, { useState } from 'react';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';

function ColorSelector(props) {
    let {labelFontSize, backgroundColor, options, onChange} = props;
    const [selectedColor, setSelectedColor] = useState((options && options.length && options[0].value) || '');
    return (
        <div style={{position: 'relative', minHeight: '28px',  margin: '10px 0',boxSizing:'border-box',
        borderRadius: '8px', backgroundColor:backgroundColor || '#F7F7F7'}}>
        <div style={{display: 'inline-block', width: '70px', height: '28px', verticalAlign: 'top'}}>
            <p style={{fontSize: labelFontSize || '12px', fontWeight: 'bold', color: '#4D4D4D', margin: '0', width: 'max-content', paddingTop: '10px'}}>Color</p>
        </div>
        <div style={{display: 'inline-block', textAlign: 'right', width: 'calc(100% - 70px)', height: 'max-content'}}>
            {Object.keys(options).map((option) => 
                <ColorOption 
                onClick={()=>{setSelectedColor(option.value)}}
                key={option.displayName}
                value={option.value}
                isSelected={option.value === selectedColor}
                />
            )}
        </div>
    </div>
    );
}

const ColorOption = (props) => {
    let {onClick, key, value, isSelected} = props;
    return (<div onClick={onClick} style={{display: 'inline-block', width: '28px', height: '28px', borderRadius: '14px', backgroundColor: value, marginRight: '5px'}}>
        {isSelected && <DoneRoundedIcon style={{display:'inline-block',color: '#ffffff', height: '18px', width: '18px', padding: '5px'}}/>}
    </div>)
}

export default ColorSelector;
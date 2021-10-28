import React, {useState} from 'react';

function SizeSelector(props) {
    let {labelFontSize, backgroundColor} = props;
    const [selectedColor, setSelectedColor] = useState('l');
    let options = {
        xs: 'XS',
        s: 'S',
        m: 'M',
        l: 'L',
        xl: 'XL',
        xxl: 'XXL',
    }

    return (
        <div style={{position: 'relative', minHeight: '28px',  margin: '10px 0',boxSizing:'border-box',
        borderRadius: '8px', backgroundColor: backgroundColor || '#F7F7F7'}}>
        <div style={{display: 'inline-block', width: '70px', height: '28px', verticalAlign: 'top'}}>
            <p style={{fontSize: labelFontSize || '12px', fontWeight: 'bold', color: '#4D4D4D', margin: '0', width: 'max-content', paddingTop: '10px'}}>Size</p>
        </div>
        <div style={{display: 'inline-block', textAlign: 'right', width: 'calc(100% - 70px)', height: 'max-content'}}>
            {Object.keys(options).map((key) => 
                <SizeOptions 
                onClick={()=>{setSelectedColor(key)}}
                key={key}
                value={options[key]}
                isSelected={key === selectedColor}
                />
            )}
        </div>
    </div>
    );
}

const SizeOptions = (props) => {
    let {onClick, key, value, isSelected} = props;
    return (<div onClick={onClick} style={{boxSizing: 'border-box',display: 'inline-block', width: 'max-content', height: '40px', borderRadius: '4px', backgroundColor: '#E6E6E6', margin: '0 5px 5px 0', border: `${isSelected?'1px solid #707070':'0'}`}}>
        <p style={{margin: '0', color:'#4D4D4D', fontSize: '14px', fontWeight: `${isSelected?'bold':'500'}`, textAlign: 'center', padding: '12px 20px 0'}}>{value}</p>
    </div>)
}

export default SizeSelector;
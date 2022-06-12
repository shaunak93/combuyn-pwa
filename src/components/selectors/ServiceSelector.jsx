import React, { useState } from 'react';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';

function ServiceSelector(props) {
    let {selectedOptions, options, onChange, totalCartCost} = props;
    console.log({selectedOption, options, onChange});
    const onOptionClick = (id) => {
        let updatedSelectionOptions = JSON.parse(JSON.stringify(selectedOptions));
        if(updatedSelectionOptions.includes(id)){
            updatedSelectionOptions = updatedSelectionOptions.filter(opt => opt != id);
        }
        else{
            updatedSelectionOptions.push(id);
        }
    }

    return (<div 
            style={{
                position: 'relative', 
                minHeight: '28px',  
                margin: '10px 0',
                boxSizing:'border-box',
                borderRadius: '8px', 
                backgroundColor: 'transparent'
            }}
        >
            <div style={{display: 'inline-block', textAlign: 'right', width: 'calc(100% - 70px)', height: 'max-content'}}>
                {options.map((option) => 
                    <ServiceOption 
                    onClick={onOptionClick}
                    key={option.id}
                    serviceDetails={option}
                    isSelected={selectedOption.includes(option.id)}
                    />
                )}
            </div>
            
            <div>
                <span style={{fontSize: '18px', fontWeight: '500', float: 'left', color:'#3785B8'}}>
                    Service Total charges
                </span>
                <span style={{fontSize: '18px', fontWeight: 'bold', float: 'right', color:'#4D4D4D'}}>
                    &#8377;{totalCartCost || '0000'}
                </span>
            </div>
        
    </div>
    );
    // onClick={()=>{onChange(option.value)}}
    // key={option.id}
    // value={option.display_name || option.value}
    // isSelected={option.value === selectedOption}
}

const ServiceOption = (props) => {
    let {onClick, key, serviceDetails, isSelected} = props;
    console.log({onClick, key, value, isSelected});
    return (<div 
        onClick={onClick} 
        style={{
            display: 'block', 
            width: '100%', 
            height: '48px', 
            borderRadius: '4px', 
            backgroundColor: isSelected?'#D7EDFC':'#E6E6E6',
            margin: '10px 8px',
            color: isSelected?'#3785B8':'#4D4D4D'}}>
        <span style={{fontSize: '16px', fontWeight: 'bold', float: 'left'}}>{serviceDetails.name}</span>
        <span style={{fontSize: '8px', fontWeight: 'bold', float: 'left'}}>{serviceDetails.time}</span>
        <span style={{fontSize: '16px', fontWeight: 'bold', float: 'right'}}>{serviceDetails.selling_price}</span>
    </div>)
}

export default ServiceSelector;
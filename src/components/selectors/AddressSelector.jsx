import React, {useState} from 'react';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';

function AddressSelector(props) {
    const [selectedAddress, setSelectedAddress] = useState('add2');
    let options = {
        add1: 'Address Name 1',
        add2: 'Address Name 2',
        add3: 'Address Name 3',
        add4: 'Address Name 4'
    }
    return (
        <div style={{position: 'relative', height: 'max-content',  margin: '10px 0',boxSizing:'border-box',
        borderRadius: '8px'}}>
            <div style={{ width: '100%', height: '20px', verticalAlign: 'top', marginBottom: '10px'}}>
                <span style={{fontSize: '16px', fontWeight: 'bold', color: '#4D4D4D', margin: '0', width: 'max-content', paddingLeft: '13px'}}>Select Pick up address</span>
                <span style={{fontSize: '10px', fontWeight: '500', color: '#48C28B', margin: '0', width: 'max-content', paddingLeft: '5px'}}>FREE delivery</span>
            </div>
            {Object.keys(options).map((key) => 
                <AddressOption 
                onClick={()=>{setSelectedAddress(key)}}
                key={key}
                value={options[key]}
                isSelected={key === selectedAddress}
                />
            )}

        </div>
    );
}

const AddressOption = (props) => {
    let {onClick, key, value, isSelected} = props; 
    return (
            <div style={{ boxSizing: 'border-box', width: '100%', height: '49px', verticalAlign: 'top', paddingTop: '14px',backgroundColor: `${isSelected?'#D7EDFC':'#F7F7F7'}`, borderRadius: '4px', marginBottom: '5px'}}>
                <span onClick={onClick} style={{fontSize: '14px', fontWeight: 'bold', color: '#3785B8', margin: '0', width: 'max-content', paddingLeft: '13px'}}>{value}</span>
                {isSelected && 
                    <div style={{float: 'right', display: 'inline-block', width: '20px', height: '20px', borderRadius: '10px', backgroundColor: '#48C28B', marginRight: '13px'}}>
                        <DoneRoundedIcon style={{display:'inline-block',color: '#ffffff', height: '10px', width: '10px', padding: '5px'}}/>
                    </div>
                }
            </div>
    )

}

export default AddressSelector;

// import React, {useState} from 'react';

// function SizeSelector(props) {
//     const [selectedColor, setSelectedColor] = useState('l');
//     let options = {
//         xs: 'XS',
//         s: 'S',
//         m: 'M',
//         l: 'L',
//         xl: 'XL',
//         xxl: 'XXL',
//     }

//     return (
        
//     );
// }

// const SizeOptions = (props) => {
//     let {onClick, key, value, isSelected} = props;
//     return (<div onClick={onClick} style={{boxSizing: 'border-box',display: 'inline-block', width: 'max-content', height: '40px', borderRadius: '4px', backgroundColor: '#E6E6E6', margin: '0 5px 5px 0', border: `${isSelected?'1px solid #707070':'0'}`}}>
//         <p style={{margin: '0', color:'#4D4D4D', fontSize: '14px', fontWeight: `${isSelected?'bold':'500'}`, textAlign: 'center', padding: '12px 20px 0'}}>{value}</p>
//     </div>)
// }

// export default SizeSelector;
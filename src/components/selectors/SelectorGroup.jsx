import React from 'react';
import ColorSelector from './ColorSelector_2';
import GenericSelector from './GenericSelector_2';

function SelectorGroup({selectorsMeta, orderProductMeta, onChange}) {
    const getSelectorComponents = () => {
        let components = [];
        Object.entries(selectorsMeta).forEach(([key, selectorMeta]) => {
            let options = selectorMeta.map((option) => {
                let key = option.id;
                let value = option.value;
                let display_name = option.value;
                let extra_price = option.extra_price;
                return {key, value, display_name, extra_price}
            })
            let selectedOption = orderProductMeta[key];
            switch (key) {
                case 'colour':
                    components.push(<ColorSelector
                        selectedOption = {selectedOption}
                        options = {options}
                        onChange = {(val) => onChange(key, val)}
                    />)
                    break;
                default:
                    components.push(<GenericSelector
                        header={key.charAt(0).toUpperCase() + key.slice(1)}
                        selectedOption = {selectedOption}
                        options = {options}
                        onChange = {(val) => onChange(key, val)}
                    />)
                    break;
            }
        })
        return components;
    }
    return (
        <>
            {getSelectorComponents()}
        </>
    );
}

export default SelectorGroup;
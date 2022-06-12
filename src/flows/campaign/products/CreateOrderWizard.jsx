import React from 'react';
import CampaignNavHeader from '../common/CampaignNavHeader';
import Stepper from '../common/Stepper';

const steps = [
    {
        label: 'Cart',
        color: '#FFA64D'
    },{
        label: 'Order summary',
        color: '#3785B8'
    },{
        label: 'Payment',
        color: '#48C28B'
    }
]

function CreateOrderWizard(props) {
    return (
        <>
            <CampaignNavHeader/>
            <Stepper
                steps={steps}
                value={0}
            />
        </>
    );
}

export default CreateOrderWizard;
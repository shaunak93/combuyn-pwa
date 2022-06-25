import React from 'react';

function CampaignDetailsCard(props) {
    return (
        <div style={{position: 'relative', height: '119px', width: 'inherit', margin: '20px 30px 0', padding: '11px', backgroundColor: '#E6E6E6', boxSizing:'border-box', borderRadius: '4px'}}>
            <div style={{position: 'relative', height: 'auto', width: 'inherit', boxSizing: 'border-box'}}>
                <span style={{ color: '#016FB8', fontSize: '16px', fontWeight: 'bold'}}>Campaign Details</span>
                <div style={{display: 'inline-block', float: 'right', width:'102px', height: '18px', backgroundColor: '#48C28B', color: '#ffffff', borderRadius: '11px', textAlign: 'center', fontSize: '12px', fontWeight: 'bold', paddingTop: '4px'}}>Active</div>
            </div>
            <div style={{position: 'relative', height: 'auto', width: 'inherit', marginTop: '10px',boxSizing: 'border-box'}}>
                <span style={{ color: '#016FB8', fontSize: '12px'}}>Minimum order :</span>
            </div>
            <div style={{position: 'relative', height: '21px', width: 'inherit', marginTop: '8px',  padding: '3px', backgroundColor: '#FFFFFF', boxSizing:'border-box', borderRadius: '11px'}}>
                <div style={{borderRadius: '8px',  width: '66%', height:'15px', backgroundColor:'#48C28B', minWidth: 'min-content'}}>
                    <p style={{color: '#ffffff', fontSize: '8px', width: 'fit-content', margin: '0', padding: '2px 4px', fontWeight:'bold', float: 'right'}}>66%</p>
                </div>
            </div>
            <p style={{margin: '0', width: 'inherit', textAlign: 'center', color: '#016FB8', fontSize: '12px', padding: '7px'}}>Ends : 00 00 00 | 00/00/0000</p>
        </div>
);
}

export default CampaignDetailsCard;
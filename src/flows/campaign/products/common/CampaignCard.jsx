import React from 'react';
import ImageSlider from '../../../../components/ImageSlider';

function CampaignCard(props) {
    let {product_image, campaignName, smallDescription, total_selling_price, total_original_price} = props;
    return (
        <>
            <ImageSlider imageUrls={(product_image || []).map((obj) => obj.image)}
                margin={'20px 30px 0'}
                showIndicators={true}

            />
            <div style={{position: 'relative', height: '45px', width: 'inherit', margin: '20px 36px 0', color: '#4D4D4D', boxSizing:'border-box'}}>
                <div style={{width: 'calc(100% - 100px)', display: 'inline-block'}}>
                    <p style={{margin: 0, fontSize: '20px', fontWeight: 'bold'}}>{campaignName || ''}</p>
                    <p style={{margin: 0, fontSize: '12px'}}>{smallDescription || ''}</p>
                </div>
                <div style={{width: 'max-content', display: 'inline-block', textAlign: 'right', float: 'right'}}>
                    <p style={{width: 'max-content', margin: 0, fontSize: '24px', fontWeight: 'bold'}}>&#8377;{total_selling_price || '-'}</p>
                    <p style={{width: 'max-content', margin: 0, fontSize: '12px', fontWeight: '400', textAlign: 'left'}}>
                        MRP: 
                        {total_original_price
                            ?<span style={{textDecoration:'line-through', color: 'red'}}>
                                <span style={{color:'#4D4D4D'}}>{total_original_price}</span>
                            </span>
                            :'-'
                        }
                    </p>
                </div>
            </div>
        </>
    );
}

export default CampaignCard;
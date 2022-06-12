import React from 'react';

import ProductDetails from '../campaign/products/ProductDetails';
import Cart from '../flows/campaign/products/Cart';
import OrderSummary from '../flows/campaign/products/OrderSummary';
import Payment from '../flows/campaign/products/Payment';
import PaymentConfirmed from '../flows/campaign/products/PaymentConfirmed';
import OrderConfirmed from '../flows/campaign/products/OrderConfirmed';

import LoaderOverlay from '../../components/base/LoaderOverlay';

import {getSelectorsMeta} from '../flows/campaign/products/utils';
import {getCampaignProductDetails} from '../apis/product';


function CampaignFlow(props) {
    let {id} = props;
    const [campaignDetails, setCampaignDetails] = useState({});
    const [productDetails, setProductDetails] = useState({});
    const [selectorsMeta, setSelectorsMeta] = useState({})
    const [state, setState] = useState('home');
    const [order, setOrder] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [optionalData, setOptionalData] = useState({});
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [currentCoordinates, setCurrentCoordinates] = useState(null);
    let {totalSellingPrice, totalOriginalPrice} = useCostCalculator({campaignDetails, selectorsMeta, order});
    let history = useHistory();
    let { id } = useParams();
    
    const onClose = () => {
        history.push('/home')
    }

    const onBackClick = () => {
        if(state === 'home'){
            onClose();
        }
        else{
            setState(getState(state, 'previousState'));
        }
    }

    const onNextClick = () => {
        if(state === 'paymentConfirmed'){
            onClose();
        }
        else{
            setState(getState(state, 'nextState'));
        }
    }

    const getComponent = () => {
        switch (state) {
            case 'error':
                return <div style={{height: '100px', textAign:'center', paddingTop: '50px'}}>
                    Unable to fetch campaign
                </div>;
            case 'cart':
                return <Cart 
                    campaignDetails={campaignDetails}
                    productDetails={productDetails}
                    selectorsMeta={selectorsMeta}
                    order={order}
                    totalSellingPrice={totalSellingPrice}
                    totalOriginalPrice={totalOriginalPrice}
                    optionalData={optionalData}
                    setOrder={setOrder}
                    onBackClick={onBackClick}
                    onNextClick={onNextClick}
                    setSelectedAddress={setSelectedAddress}
                    setOptionalData={setOptionalData}
                />;

            case 'orderSummary':
                return <OrderSummary 
                    campaignDetails={campaignDetails}
                    productDetails={productDetails}
                    order={order}
                    totalSellingPrice={totalSellingPrice}
                    totalOriginalPrice={totalOriginalPrice}
                    setOrder={setOrder}
                    onBackClick={onBackClick}
                    onNextClick={onNextClick}
                    optionalData={optionalData}
                />;
            case 'payment':
                return <Payment 
                    campaignDetails={campaignDetails}
                    productDetails={productDetails}
                    order={order}
                    totalSellingPrice={totalSellingPrice}
                    totalOriginalPrice={totalOriginalPrice}
                    setOrder={setOrder}
                    onBackClick={onBackClick}
                    onNextClick={onNextClick}
                />;
            case 'orderConfirmed':
                return <OrderConfirmed 
                    campaignDetails={campaignDetails}
                    productDetails={productDetails}
                    order={order}
                    totalSellingPrice={totalSellingPrice}
                    totalOriginalPrice={totalOriginalPrice}
                    setOrder={setOrder}
                    onBackClick={onBackClick}
                    onNextClick={onNextClick}
                />;
            case 'paymentConfirmed':
                return <PaymentConfirmed 
                    campaignDetails={campaignDetails}
                    productDetails={productDetails}
                    order={order}
                    totalSellingPrice={totalSellingPrice}
                    totalOriginalPrice={totalOriginalPrice}
                    setOrder={setOrder}
                    onBackClick={onBackClick}
                    onNextClick={onNextClick}
                    optionalData={optionalData}
                />;
            case 'home':
            default:
                 return <ProductDetails 
                    campaignDetails={campaignDetails}
                    productDetails={productDetails}
                    selectorsMeta={selectorsMeta}
                    order={order}
                    totalSellingPrice={totalSellingPrice}
                    totalOriginalPrice={totalOriginalPrice}
                    currentCoordinates={currentCoordinates}
                    setOrder={setOrder}
                    onBackClick={onClose}
                    onNextClick={onNextClick}
                    setCurrentCoordinates={setCurrentCoordinates}
                />;
        }
    }

    useEffect(() => {
        if(!id){
            history.push('/home')
        }
        setIsLoading(true)
        getCampaignProductDetails(id, (err, res) => {
            if(err){
                //setState('error')
                //setIsLoading(false);

                ///////////////
                //let {campaign, product, service} = res;
                let campaign = {
                    "id": 8,
                    "name": "Diwali Lights",
                    "link": "campaign-DiwaliLights-498",
                    "start_datetime": "2021-10-25T12:30:00+05:30",
                    "end_datetime": "2021-10-30T12:40:00+05:30",
                    "expected_delivery_date": "2021-11-02",
                    "is_verified": false,
                    "is_active": false,
                    "image": "check/this/out1",
                    "min_order_count": 1,
                    "max_order_count": 10,
                    "current_order_count": 0,
                    "total_order_count": 100,
                    "campaign_views": 0,
                    "campaign_restart_count": 0,
                    "campaignmanager": 1,
                    "type": 1,
                    "campaign_meta": [
                        {
                            "campaign": 8,
                            "address": {
                                "id": 10,
                                "created_at": "2021-10-25T10:49:11.745544+05:30",
                                "uuid": "e54ab1c0-0c22-4923-b593-469ab5133d37",
                                "modified_at": "2021-10-25T10:49:11.745571+05:30",
                                "is_deleted": false,
                                "is_active": true,
                                "address_name": "Kormangala",
                                "address_type": 3,
                                "mobile": "9986644737",
                                "line1": "123123, qweqwe",
                                "line2": "qweasd",
                                "city": "Bangalore",
                                "state": "Karnataka",
                                "landmark": "",
                                "is_default": true,
                                "pin": "560085",
                                "lat_long": {
                                    "geo_fence": [
                                        {
                                            "x": 123.12321,
                                            "y": 12.343
                                        },
                                        {
                                            "x": 12.121,
                                            "y": 1.343
                                        },
                                        {
                                            "x": 23.1221,
                                            "y": 12.343
                                        },
                                        {
                                            "x": 23.321,
                                            "y": 12.343
                                        }
                                    ]
                                },
                                "full_address": "123awezsdas",
                                "locked_fields": {
                                    "city": false,
                                    "line1": false,
                                    "line2": false,
                                    "state": false,
                                    "landmark": false
                                },
                                "delivery_cost": "0.00",
                                "user": 2
                            },
                            "contact_number": "+91-1234567890",
                            "description": "",
                            "shipment_cost": "0.00",
                            "specific_details": {}
                        }
                    ],
                    "selling_price": 900,
                    "original_price": 1000
                }
                let service = [
                    {
                        "id": 8,
                        "name": "Deep Cleaning 1 BHK",
                        "category": 1,
                        "subcategory": null,
                        "description": "this is a service",
                        "unit": 1,
                        "original_price": "1000.00",
                        "selling_price": "900.00",
                        "slots": [
                            {
                                "slot_id": 1,
                                "start_datetime": "2021-10-25T12:30:00+05:30",
                                "end_datetime": "2021-10-30T13:40:00+05:30",
                                "max_count": 2,
                                "current_count": 0
                            },
                            {
                                "slot_id": 2,
                                "start_datetime": "2021-10-25T13:30:00+05:30",
                                "end_datetime": "2021-10-30T14:40:00+05:30",
                                "max_count": 2,
                                "current_count": 1
                            },
                            {
                                "slot_id": 3,
                                "start_datetime": "2021-10-25T14:30:00+05:30",
                                "end_datetime": "2021-10-30T15:40:00+05:30",
                                "max_count": 2,
                                "current_count": 1
                            },
                            {
                                "slot_id": 4,
                                "start_datetime": "2021-10-25T15:30:00+05:30",
                                "end_datetime": "2021-10-30T16:40:00+05:30",
                                "max_count": 2,
                                "current_count": 2
                            }
                        ]
                    },
                    {
                        "id": 9,
                        "name": "Deep Cleaning 2 BHK",
                        "category": 1,
                        "subcategory": null,
                        "description": "this is a service",
                        "unit": 1,
                        "original_price": "2000.00",
                        "selling_price": "1500.00",
                        "slots": [
                            {
                                "slot_id": 6,
                                "start_datetime": "2021-10-25T12:30:00+05:30",
                                "end_datetime": "2021-10-30T13:40:00+05:30",
                                "max_count": 2,
                                "current_count": 0
                            },
                            {
                                "slot_id": 7,
                                "start_datetime": "2021-10-25T13:30:00+05:30",
                                "end_datetime": "2021-10-30T14:40:00+05:30",
                                "max_count": 2,
                                "current_count": 1
                            },
                            {
                                "slot_id": 8,
                                "start_datetime": "2021-10-25T14:30:00+05:30",
                                "end_datetime": "2021-10-30T15:40:00+05:30",
                                "max_count": 2,
                                "current_count": 1
                            },
                            {
                                "slot_id": 9,
                                "start_datetime": "2021-10-25T15:30:00+05:30",
                                "end_datetime": "2021-10-30T16:40:00+05:30",
                                "max_count": 2,
                                "current_count": 2
                            }
                        ]
                    }
                ]
                let newOrder = null;
                if(campaign.type == 0){ //SERVICE
                    // {
                    //     "campaign": 9,
                    //     "buyer": 1,
                    //     "quantity": 2,
                    //     "buyer_address": 2,
                    //     "campaign_address": 12,
                    //     "services": [
                    //         {
                    //             "service_id":9,
                    //             "slot_id":10,
                    //             "quantity":1
                    //         },
                    //         {
                    //             "service_id":10,
                    //             "slot_id":10,
                    //             "quantity":1
                    //         }
                    //     ]
                    // }
                    newOrder = {
                        "campaign": campaign.id,
                        "quantity": 0,
                        "campaign_address": campaign.campaign_meta[0].address.id,
                        "services": [
                            //{
                            //             "service_id":9,
                            //             "slot_id":10,
                            //             "quantity":1
                            //         }
                        ]
                    }
                }
                else if(campaign.type == 1){ //PRODUCT
                    newOrder = {
                        "campaign": campaign.id,
                        "quantity": campaign.min_order_count,
                        "campaign_address": campaign.campaign_meta[0].address.id,
                        "product_meta": [
                            {
                                "product_id": product && product[0].id,
                                "quantity":  1
                            }
                        ]
                    }
                }
                setCampaignDetails(campaign);
                setProductDetails(product[0]);
                setServiceDetails(services);
                setSelectorsMeta(getSelectorsMeta(product[0]))
                setOrder(newOrder);
                setIsLoading(false)


            }
            else{
                let {campaign, product} = res;
                let newOrder = {
                    "campaign": campaign.id,
                    "quantity": campaign.min_order_count,
                    "campaign_address": campaign.campaign_meta[0].address.id,
                    "product_meta": [
                        {
                            "product_id": product && product[0].id,
                            "quantity":  1
                        }
                    ]
                }
                setCampaignDetails(campaign);
                setProductDetails(product[0]);
                setSelectorsMeta(getSelectorsMeta(product[0]))
                setOrder(newOrder);
                setIsLoading(false)
                
            }
        })
    let {id} = props;
    }, [id])  


    return (
        <div style={{height: '100%', width: '100%'}}>
             {(isLoading) ? <LoaderOverlay show={isLoading}/> : getComponent()}
        </div>
    );
}

export default CampaignFlow;
const getFulfilledPecentage = (a, b) => {
    if(a > b) return 100;
    return Math.floor((a*100)/b);
}

const getCountdownTimeString = (end_datetime, currentTime) => {
    if(!end_datetime || !currentTime) return '00 Days 00 Hours 00 Minutes'

    let end_datetime_time = new Date(end_datetime).getTime();
    let timeleft = (end_datetime_time - currentTime) / (1000*60); //converting into total minutes left
    let totalMinutesLeft = Math.floor(timeleft % 60);
    let totalHoursLeft = Math.floor( (timeleft / 60) % 24);
    let totalDaysLeft = Math.floor( timeleft / (60 * 24));

    let convertToDoubleDigit = (num) => {
        return num.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        })
    }

    return `${convertToDoubleDigit(totalDaysLeft)} Days ${convertToDoubleDigit(totalHoursLeft)} Hours ${convertToDoubleDigit(totalMinutesLeft)} Minutes`
}

const getSelectorsMeta = (productDetails) => {
    let options = ['colour', 'size', 'weight', 'length', 'gender', 'shape', 'custom'];
    let selectorsMeta = {};

    options.forEach((option) => {
        let selectorDetails = productDetails[option];
        if(selectorDetails && selectorDetails.length){
            selectorsMeta[option] =  selectorDetails;
        }
    })
    return selectorsMeta;
}

const checkOrder = ({order, selectorsMeta}) => {
    let product_meta = order.product_meta;
    if(!product_meta || !product_meta.length) return 'Please add a product to cart.';
    product_meta.forEach((product) => {
        Object.keys(selectorsMeta).forEach((selectorKey) => {
            if(!product.selectorKey){
                return `Please select ${selectorKey}`;
            }
        })
    })
    return null;
}

const calculateCartPricing = ({selectorsMeta, order, original_price, selling_price}) => {
    let total_selling_price = 0;
    let total_original_price = 0;  
    let product_meta = order.product_meta;
    //if(!product_meta || !product_meta.length) return {total_selling_price, total_original_price}; 
    console.log({product_meta});
    (product_meta || []).forEach((product) => {
        let extraCost = 0;
        let finalCost = selling_price;
        let finalMrp = original_price;
        Object.keys(product).forEach((key) => {
            if(key != 'product' && key != 'quantity'){
                let options = selectorsMeta[key];
                let selectedOption = options.find(option => option.value == product[key]);
                extraCost = extraCost + Number(selectedOption.extra_price || 0);
            }
        })
        finalCost = (finalCost + extraCost) * (product.quantity || 1);
        finalMrp = (finalMrp + extraCost) * (product.quantity || 1);
        total_selling_price = total_selling_price + finalCost;
        total_original_price = total_original_price + finalMrp;
    })
    return {total_selling_price, total_original_price};
}



export {getFulfilledPecentage, getCountdownTimeString, getSelectorsMeta, checkOrder, calculateCartPricing};
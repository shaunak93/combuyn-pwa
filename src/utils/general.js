import { toast } from 'react-toastify';
import moment from 'moment';
let myStorage = window.localStorage;

let toastOptions = {
  position: "bottom-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored"
}

const  getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const invertHex = (hex) => {
    return (Number(`0x1${hex}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase()
  }

  const showToast = ({type,message}) => {
    console.log({type,message});
    switch (type) {
      case 'error':
        toast.error(message, toastOptions);
        break;
      case 'success':
        toast.success(message, toastOptions);
        break;
    
      case 'info':
      default:
        toast.info(message, toastOptions);
        break;
    }
  }

  const getOrderQuantity = (order) => {
    let productMeta = order.product_meta || [];
    let totalQunatity = 0;
    productMeta.forEach((meta)=>{
      totalQunatity = totalQunatity + meta.quantity || 0;
    })
    return totalQunatity;
  }

  const checkIsLoggedIn = () => {
    let accessToken = myStorage.getItem('access_token');
    let accessTTL = myStorage.getItem('access_ttl');
    let currentTime = new Date().getTime();

    if(!accessToken || !accessTTL || accessTTL < currentTime){
      return false;
    }

    return true;
  }

  const getHumanReadableDate = (date, format) => {
    return moment(date).format(format || 'Do MMMM YYYY');
  }


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
            if(key !== 'product' && key !== 'quantity'){
                let options = selectorsMeta[key];
                let selectedOption = options.find(option => option.value === product[key]);
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



  export {getRandomColor, invertHex, showToast, getOrderQuantity, checkIsLoggedIn, getHumanReadableDate, getFulfilledPecentage, getCountdownTimeString, getSelectorsMeta, checkOrder, calculateCartPricing};
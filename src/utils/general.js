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

  export {getRandomColor, invertHex, showToast, getOrderQuantity, checkIsLoggedIn, getHumanReadableDate};
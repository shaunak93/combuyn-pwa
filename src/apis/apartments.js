import axios from "axios";
import { baseUrl } from '../constants/api';

axios.defaults.headers.common['Content-Type'] = 'application/json'
let myStorage = window.localStorage;

const getApartmentList = (callback) => {
    let url = baseUrl + 'v1/apartments';
    axios.get(url)
        .then((res) => {
            // let data = res.data;
            // let { count, results } = data;
            // callback(null, { count, results });
            console.log('====================================');
            console.log(res);
            console.log('====================================');
            callback(null, res?.data || [])
        })
        .catch((err) => {
            console.log(err)
            callback('Unable to fetch apartments.')
            callback(err)
        })
}

export {getApartmentList};
import axios from "axios";
import { baseUrl } from '../constants/api';

axios.defaults.headers.common['Content-Type'] = 'application/json'

const getApartmentList = (callback) => {
    let url = baseUrl + 'v1/apartments';
    axios.get(url)
        .then((res) => {
            callback(null, res?.data || [])
        })
        .catch((err) => {
            console.log(err)
            callback('Unable to fetch apartments.')
            callback(err)
        })
}

export {getApartmentList};
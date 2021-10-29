import axios from "axios";
import {baseUrl} from '../constants/api';

axios.defaults.headers.common['Content-Type'] = 'application/json'
let myStorage = window.localStorage;;

const getCampaignList = (options, callback) => {
    let access_token
    let url = baseUrl + '/campaign/public';
    let apiOptions = {
        // headers: {
        //     Authorization: `Bearer ${myStorage.getItem('access_token')}`
        // }
    };
    axios.get(url,apiOptions)
    .then((res)=>{
        let data = res.data;
        let {count, results} = data;
        callback(null, {count, results});
    })
    .catch((err)=>{
        console.log(err)
        callback('Unable to fetch campaigns.')
    })
}

const getCampaignDetails = (link, callback) => {
    let access_token
    let url = baseUrl + '/campaign/public/'+ link;
    let apiOptions = {
        // headers: {
        //     Authorization: `Bearer ${myStorage.getItem('access_token')}`
        // }
    };
    axios.get(url,apiOptions)
    .then((res)=>{
        let data = res.data;
        callback(null, {details : data.data || {}});
    })
    .catch((err)=>{
        console.log(err)
        callback('Unable to fetch campaigns details')
    })
}

export {getCampaignList};
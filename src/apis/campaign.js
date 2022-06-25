import axios from "axios";
import { baseUrl } from '../constants/api';

axios.defaults.headers.common['Content-Type'] = 'application/json'

const getCampaigns = (options, callback) => {
    let url = baseUrl + 'v1/campaigns';
    axios.get(url)
        .then((res) => {
            callback(null, res?.data || [])
        })
        .catch((err) => {
            console.log(err)
            callback('Unable to fetch campaigns.')
            callback(err)
        })
}

const getCampaign = (options, callback) => {
    let {id} = options;
    let url = `${baseUrl}v1/campaigns/${id}`;
    axios.get(url)
        .then((res) => {
            callback(null, res?.data || {})
        })
        .catch((err) => {
            console.log(err)
            callback('Unable to fetch campaigns.')
            callback(err)
        })
}

export { getCampaigns, getCampaign };
import env from "../env";
import {Storage} from "../resources";
import Toast from "react-native-toast-message";

class Api {
    constructor(baseUrl) {
        this.URL = env.APP_URL + '/api' + baseUrl
    }

    _get(url = '') {
        url = this.URL + url
        return makeRequest({url})
    }

    _post(url='', body) {
        url = this.URL + url
        return makeRequest({url, body, method: 'post'})
    }
}


const makeRequest = async ({url, method = 'get', body}) => {
    const token = await Storage.getItem('token')

    const config = {
        method,
        headers: {
            "Content-Type": "application/json",
        }
    };

    if (token) config.Authorization = token

    if (body) {
        if (body.hasOwnProperty('email')) body.email = body.email.toLowerCase()
        if (body instanceof FormData) {
            config.body = body
            config.headers['Content-Type'] = 'multipart/form-data'
        } else {
            config.body = JSON.stringify(body)
        }
    }

    console.log('CONFIG',config)

    return fetch(url, config)
        .then((response) => response.json())
}

export default Api
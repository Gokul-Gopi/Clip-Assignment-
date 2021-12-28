import { BACKEND } from './api'

import axios from "axios";

const networkCall = async (route, method, data) => {
    switch (method) {
        case 'GET':
            try {
                return await axios({
                    method: 'get',
                    url: `${BACKEND}${route}`,
                })
            } catch (err) {
                return err.message
            }


        case 'POST':
            try {
                return await axios({
                    method: 'post',
                    url: `${BACKEND}${route}`,
                    data: data
                })
            } catch (err) {
                return err.message
            }


        case 'PUT':
            try {
                return await axios({
                    method: 'put',
                    url: `${BACKEND}${route}`,
                    data: data
                })
            } catch (err) {
                return err.message
            }


        case 'DELETE':
            try {
                return await axios({
                    method: 'delete',
                    url: `${BACKEND}${route}`,
                    data: data
                })
            } catch (err) {
                return err.response;
            }

        default:
            break;

    }
}

const defaultHeaderForToken = (token) => {
    if (token) {
        return axios.defaults.headers.common["Authorization"] = token
    }
}

export { networkCall, defaultHeaderForToken }
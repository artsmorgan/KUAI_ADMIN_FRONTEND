import axios from 'axios'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const IMAGE_ENDPOINT = process.env.REACT_APP_IMAGE_ENDPOINT;

const axiosRequest = axios.create({
    baseURL: API_ENDPOINT,
    /* other custom settings */
})

export {
    axiosRequest,
    IMAGE_ENDPOINT,
}
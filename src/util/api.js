import axios from 'axios'

const API_ENDPOINT = 'https://us-central1-kuai-test.cloudfunctions.net';
const IMAGE_ENDPOINT = process.env.REACT_APP_IMAGE_ENDPOINT;

const axiosRequest = axios.create({
    baseURL: API_ENDPOINT,
    /* other custom settings */
})

export {
    axiosRequest,
    IMAGE_ENDPOINT,
}
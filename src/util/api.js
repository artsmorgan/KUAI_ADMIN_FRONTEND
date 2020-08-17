import axios from "axios";

export const endPoints = {
    LOGIN: "/login",
    REGISTRY: "/registry",
    FORGOT_PASSWORD: "/forgot-password",
    CHANGE_PASSWORD: "/change-password",
}

export const getEndPointsHandler = function (url, headers) {
    axios.get(url, {headers})
        .then(res => {
            return res
        })
        .catch(err => {
            return err
        })
}

export const postEndPointsHandler = async function (url, data, headers) {
    // const res = await axios.post(url, data, {headers})
    // console.log(res)
    // return res
    const res = {
        'status': 201
    }
    return res
}

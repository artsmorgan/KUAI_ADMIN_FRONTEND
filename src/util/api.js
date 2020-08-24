import axios from "axios";

export const endPoints = {
    LOGIN: "/login",
    REGISTRY: "/registry",
    FORGOT_PASSWORD: "/forgot-password",
    CHANGE_PASSWORD: "/change-password",
    MY_ORDERS: "/my_orders"
}

export const getEndPointsHandler = async function (url, headers = {}) {
    const res = await axios.get(url, {headers})
    // console.log(res)
    return res
}

export const postEndPointsHandler = async function (url, data, headers) {
    /*    const res = await axios.post(url, data, {headers})
        console.log(res)
        return res*/

    // Just a dummy response instead of actual one. Note: to get real response comment out /* inside portion */
    const res = {
        'status': 201
    }
    return res
}

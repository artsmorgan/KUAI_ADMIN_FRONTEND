import axios from "axios";

export const endPoints = {
    APIBASEURL: "https://us-central1-kuai-test.cloudfunctions.net/api",
    AUTH: {
        login: "/login",
        registration: "/createUser",
        forgetPassword: "",
        changePassword:""
    },
    DELIVERYMETHOD: {
        update:"/deliveryMethods/{restaurantId}",
        get:"/deliveryMethods/{restaurantId}",
        create:"/deliveryMethods"
    },
    RESTAURANT: {
        create: "/retaurant",
        get: "restaurant/8cd779f0-63bb-4824-a024-72be515a93b1"
    },

    FORGOT_PASSWORD: "/forgot-password",
    CHANGE_PASSWORD: "/change-password",
    MY_ORDERS: "/my_orders"
}

export const getEndPointsHandler = async function (url, headers = {}) {
    const res = await axios.get(url, { headers })
    // console.log(res)
    return res
}

export const postEndPointsHandler = async function (url, data, headers) {  

//   axios.post(
//     url,data,headers
// ).then(
//     response => {
//       console.log(response)
//     }
// ).catch(
//     error =>{
//     console.log(error.response.data)

// }
// );

    const options = {
        method: 'post',
        url: url,
        data: data,
        transformResponse: [(data) => {
          // transform the response
          // console.log(data)
          return data;
        }]
      };
      
      // send the request
  
      return axios(options)
}

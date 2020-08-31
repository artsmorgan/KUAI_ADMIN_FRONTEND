import { push } from 'connected-react-router'

export const redirectToUrl = (URL) => {
    // console.log("Yes for redirecting");
    return (dispatch) => {
        dispatch(push(URL))
    }
};
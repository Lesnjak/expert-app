import { GET_MESSAGES } from "./types";
import API from 'api.js'



export const getMessages = () => (dispatch) => {
    let token = JSON.parse(localStorage.getItem('aws-amplify-federatedInfo'));
    if(token){
        token = token.token
    }
    API.getMessages(token).then(({data})=>{
        dispatch({
                type: GET_MESSAGES,
                payload:data
            })

    })
};

// export const clearData = () => {
//     return {
//         type: CLEAR_DATA,
//     }
// };
//
// export const addCertificate = (certificate) => {
//     return {
//         type: ADD_CERTIFICATE,
//         payload: certificate
//     }
// };

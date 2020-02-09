import { GET_SESSIONS } from "./types";
import API from 'api.js'



export const addSessions = () => (dispatch) => {
    let token = JSON.parse(localStorage.getItem('aws-amplify-federatedInfo'));
   if(token){
       token = token.token
   }
    API.getSessions(token).then(({data})=>{
        dispatch({
                type: GET_SESSIONS,
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

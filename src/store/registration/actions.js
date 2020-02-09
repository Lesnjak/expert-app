import {ADD_CERTIFICATE, ADD_DATA, CLEAR_DATA, REMOVE_CERTIFICATE, REMOVE_STATE} from "./types";

export const addData = (payload) => {
    return {
        type: ADD_DATA,
        payload
    }
};

export const clearData = () => {
    return {
        type: CLEAR_DATA,
    }
};

export const addCertificate = (certificate) => {
    return {
        type: ADD_CERTIFICATE,
        payload: certificate
    }
};

export const removeCertificate = (certificate) => {
    return {
        type: REMOVE_CERTIFICATE,
        payload: certificate
    }
};

export const removeState = () => {
    return {
        type: REMOVE_STATE,
    }
};
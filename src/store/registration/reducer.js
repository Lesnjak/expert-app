import {ADD_CERTIFICATE, ADD_DATA, CLEAR_DATA, REMOVE_CERTIFICATE, REMOVE_STATE} from "./types";
import {timezones} from "../../timezones";

const initialState = {
    currentPage: "/basic-information",
    currentStep: 0,
    userData: {
        nickname: "",
        email: "",
        pass: "",
        timezone: timezones[4].value,
        country: "United States",
    },
    skills: {},
    tempSkills: {},
    languages: [],
    tempLanguages: [],
    avatar: {},
    certificates: [],
    availableDates: [],
    certificatesList: [],
    certificatesFileObjList: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_DATA:
            console.log(action.payload);

            return {
                ...state,
                userData: {
                    ...state.userData,
                    ...action.payload.data
                },
                ...action.payload
            };
        case ADD_CERTIFICATE: {
            // console.log(action.payload);

            // const updatedCertificates = [...state.certificates, action.payload.certificate];

            return {
                ...state,
                // certificatesList: [...action.payload.fileList],
                certificatesList: [...state.certificatesList, action.payload.fileList],
                certificates: [...state.certificates, action.payload.certificate]
            }
        }
        case REMOVE_CERTIFICATE: {
            console.log(action.payload);

            const updatedCertificatesList = state.certificatesList.filter(certificate =>{
                console.log(certificate);
                return certificate.uid !== action.payload.uid
            });
            const updatedCertificates = state.certificates.filter(certificate =>
                certificate.uid !== action.payload.uid);

            return {
                ...state,
                certificatesList: updatedCertificatesList,
                certificates: updatedCertificates
            }
        }
        case CLEAR_DATA:
            return {
                currentPage: "/basic-information",
                currentStep: 0,
                userData: {
                    nickname: "",
                    email: "",
                    pass: "",
                    timezone: timezones[4].value,
                    country: "United States",
                },
                avatar: {},
                certificates: [],
                certificatesList: [],
                availableDates: []
            };
        case REMOVE_STATE:
            const updatedState = {...state};
            delete updatedState.userData.state;

            return updatedState;
        default:
            return state
    }
};

export default reducer;
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {sessions,chat} from 'helper/mockObjects'

const mock = new MockAdapter(axios);
const API = axios.create({
    baseURL: process.env.REACT_APP_API_URI,
});
const headerToken = (token) => ({headers: {Authorization: token}});
// const elasticUrl = process.env.REACT_APP_ELASTIC_API_URI;

mock.onGet('/opentok/sessions').reply(200, sessions);
mock.onGet('/questions').reply(200, chat);
mock.onAny().passThrough();


export default {
    register: user => API.post('/auth/register', user),
    anonymRegister: (device) => API.post('/auth/anonym/register', {token: device}),

    updateUserData: (data, token) => API.patch('/users', data, headerToken(token)),
    setAvailableDates: (data, token) => API.post('/timekit/projects', data, headerToken(token)),
    setDocuments: (data, token) => API.post('/docs', data, headerToken(token)),
    setAvatar: (data, token) => API.post('/avatars', data, headerToken(token)),
    checkEmail: (email, token) => API.get(`/users/verify/${email}`, headerToken(token)),

    getCategories: (token) => API.get("/categories", headerToken(token)),
    getSubCategories: (token) => axios.get("/sub-categories", headerToken(token)),

    login: (data) => API.post("/auth/authorize", data),
    refreshAwsToken: (email) => API.post("auth/aws/refresh", {email}),
    getSessions: (token) => API.get("/opentok/sessions",  headerToken(token)),
    /*////////////////////////////chat///////////////////////////////////////*/
    getMessages: (token) => API.get("/questions",  headerToken(token)),

}


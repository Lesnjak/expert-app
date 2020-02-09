import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {sessions,chat} from 'helper/mockObjects'


const APIFAKE = axios.create({
    baseURL: process.env.REACT_APP_API_URI,
});

const headerToken = (token) => ({headers: {Authorization: token}});
// const elasticUrl = process.env.REACT_APP_ELASTIC_API_URI;
const mock = new MockAdapter(APIFAKE);
mock.onGet('/opentok/sessions').reply(200, sessions);
mock.onGet('/questions').reply(200, chat);


export default {
    getSessions: (token) => APIFAKE.get("/opentok/sessions",  headerToken(token)),
    /*////////////////////////////chat///////////////////////////////////////*/
    getMessages: (token) => APIFAKE.get("/questions",  headerToken(token)),
}

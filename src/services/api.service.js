import axios from "axios";

const host = 'http://localhost:8080/api/';

const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.accessToken) {
        return 'Bearer ' + user.accessToken;
    } else {
        return '';
    }
}

const createDefault = () => {
    return axios.create({
        baseURL: host,
        headers: {
            'Content-type': 'application/json',
        }
    });
}

const createAuthorizedRequest = () => {
    return axios.create({
        baseURL: host,
        headers: {
            'Content-type': 'application/json',
            'Authorization': authHeader(),
        }
    });
}

const ApiService = {
    createDefault,
    createAuthorizedRequest
}

export default ApiService;

import axios from "axios";

const API_URL = "http://localhost:8080/";

class AuthService {

    parseJwt(token) {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    }

    login(login, password) {
        return axios
            .post(API_URL + "api/login", {
                login,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    const parsedToken = this.parseJwt(response.data.accessToken)
                    const user = {
                        login: parsedToken.sub,
                        roles: parsedToken.roles,
                        accessToken: response.data.accessToken,
                        refreshToken: response.data.refreshToken
                    }
                    console.log(user);
                    localStorage.setItem('user', JSON.stringify(user));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(login, password) {
        return axios.post(API_URL + "users/", {
            login,
            password
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();

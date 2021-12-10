import ApiService from "./api.service";

const API_URL = "http://localhost:8080/api/";

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
}

const login = (login, password) => {
    return ApiService.createDefault()
        .post('login', {
            login,
            password
        })
        .then(response => {
            if (response.data.accessToken) {
                const parsedToken = parseJwt(response.data.accessToken)
                const user = {
                    login: parsedToken.sub,
                    roles: parsedToken.roles,
                    accessToken: response.data.accessToken,
                    refreshToken: response.data.refreshToken
                }
                sessionStorage.setItem('user', JSON.stringify(user));
            }

            return response.data;
        });
}

const logout = () => {
    sessionStorage.removeItem('user');
}

const register = (login, password) => {
    return ApiService.createDefault()
        .post("users/", {
        login,
        password
    });
}

const getCurrentUser = () => {
    return JSON.parse(sessionStorage.getItem('user'));
}

const AuthService = {
    login,
    logout,
    register,
    getCurrentUser
}

export default AuthService;

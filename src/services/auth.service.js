import api from "./api";
import TokenService from "./token.service";

const register = (login, password, contactData, role) => {
    return api
    .post("/auth/register", {
        login,
        contactData,
        password,
        role
    })
        .then(
            (response) => {
                console.log(response.data.accessToken)
                if (response.data.accessToken) {
                    TokenService.setUser(response.data);
                }
                return response.data;
            }
        );
};

const activate = (name, description, start, finish) => {
    return api
    .post("/auth/activate", {
        name,
        description,
        start,
        finish
    })
    .then(
        (response) => {
            console.log(response.data.accessToken)
            if (response.data.accessToken) {
                TokenService.setUser(response.data);
            }
            return response.data;
        }
    );
};

const login = (login, password) => {
    return api
        .post("/auth/login", {
            login,
            password
        })
        .then(
            (response) => {
            console.log(response.data.accessToken)
            if (response.data.accessToken) {
                const temp = response.data
                temp[login] = login
                TokenService.setUser(response.data);
            }
            return response.data;
        }
        );
};

const logout = () => {
    TokenService.removeUser();
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
    register,
    activate,
    login,
    logout,
    getCurrentUser,
};

export default AuthService;

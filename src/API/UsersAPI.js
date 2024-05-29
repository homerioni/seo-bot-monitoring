import axios from "axios";

export const updateTokenUsers = (jwtToken) => {
    UsersAxios = axios.create({
        baseURL: 'https://users.mayabiorobotics.ru',
        headers: {'Authorization': `Bearer ${jwtToken}`},
    });
};

let UsersAxios = axios.create({
    baseURL: 'https://users.mayabiorobotics.ru',
    headers: {'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`},
});

export const UsersAPI = {
    auth: {
        logout: async () => {
            const {data} = await UsersAxios.post(`/users/api/v1/auth/logout`, {refreshToken: localStorage.getItem('refreshToken')});
            return data;
        },
        profile: async () => {
            const {data} = await UsersAxios.get(`/users/api/v1/auth/profile`, {validateStatus: status => {
                if (status === 401) {
                    localStorage.removeItem('jwtToken');
                    localStorage.removeItem('refreshToken');
                    window.location.reload();
                } else {
                    return true;
                }
            }});
            return data;
        },
        refresh: async () => {
            const {data} = await UsersAxios.post(`/users/api/v1/auth/refresh`,
                {refreshToken: localStorage.getItem('refreshToken')},
                {
                    validateStatus: status => {
                        if (status === 401) {
                            localStorage.removeItem('jwtToken');
                            localStorage.removeItem('refreshToken');
                            window.location.reload();
                        } else {
                            return true;
                        }
                    },
                    headers: {'Authorization': null}
                });
            return data;
        },
        signIn: async (postData) => {
            const {data} = await UsersAxios.post(`/users/api/v1/auth/signin`, postData, {headers: {'Authorization': null}});
            return data;
        },
        signUp: async (postData) => {
            const {data} = await UsersAxios.post(`/users/api/v1/auth/signup`, postData);
            return data;
        },
    },
    role: {
        getAll: async () => {
            const {data} = await UsersAxios.get(`/users/api/v1/roles?count=1000&numberPage=0`);
            return data;
        },
    },
    user: {
        getAll: async () => {
            const {data} = await UsersAxios.get(`/users/api/v1/users?count=10000&numberPage=0`);
            return data;
        },
        change: async (id, reqData) => {
            const {data} = await UsersAxios.post(`/users/api/v1/users/${id}/change`, reqData);
            return data;
        },
    },
};
import axios from "axios";

let Projects = axios.create({
    baseURL: 'https://statistics.mayabiorobotics.ru',
    headers: {'Authorization': `Bearer ${localStorage.getItem('refreshToken')}`},
});

export const updateTokenProjects = (jwtToken) => {
    Projects = axios.create({
        baseURL: 'https://statistics.mayabiorobotics.ru',
        headers: {'Authorization': `Bearer ${jwtToken}`},
    });
};

export const ProjectsAPI = {
    project: {
        create: async (reqData) => {
            const {data} = await Projects.post(`/project/create`, reqData);
            return data;
        },
        delete: async (id) => {
            const {data} = await Projects.post(`/project/delete/${id}`);
            return data;
        },
        getAll: async (reqData) => {
            const initialData = {count: 10000, numberPage: 0, serverIds: null, nameProject: null};
            const postData = Object.assign(initialData, reqData);
            const {data} = await Projects.post(`/project/findAllProjects`, postData);
            return data;
        },
        permission: async (reqData) => {
            const {data} = await Projects.post(`/project/permission`, reqData);
            return data;
        },
    },
    settings: {
        assignAccount: async (reqData) => {
            const {data} = await Projects.post(`/settings/assignAccount`, reqData);
            return data;
        },
        assignServers: async (reqData) => {
            const {data} = await Projects.post(`/settings/assignServers`, reqData);
            return data;
        },
        update: async (reqData) => {
            const {data} = await Projects.post(`/settings/update`, reqData);
            return data;
        },
        checkPosition: {
            start: async (id) => {
                const {data} = await Projects.post(`/settings/startCheckPosition/${id}`);
                return data;
            },
            stop: async (id) => {
                const {data} = await Projects.post(`/settings/stopCheckPosition/${id}`);
                return data;
            },
        },
        statistic: {
            start: async (id) => {
                const {data} = await Projects.post(`/settings/startStatistic/${id}`);
                return data;
            },
            stop: async (id) => {
                const {data} = await Projects.post(`/settings/stopStatistic/${id}`);
                return data;
            },
        },
    },
    statisticClick: {
        get: async (id, startDate, endDate) => {
            const {data} = await Projects.get(`/statistic-click?projectId=${id}&startAt=${startDate}&endAt=${endDate}`);
            return data;
        },
        getDaysStat: async (ids, startDate, endDate) => {
            const {data} = await Projects.get(`/statistic-click/common?startAt=${startDate}&endAt=${endDate}&projectIds=${ids?.join('&projectIds=')}`);
            return data;
        },
        getServersStat: async (startDate, endDate) => {
            const {data} = await Projects.get(`/statistic-click/servers-info?startAt=${startDate}&endAt=${endDate}`);
            return data;
        },
    },
    yandex: {
        create: async (reqData) => {
            const {data} = await Projects.post(`/yandexAccount/create`, reqData);
            return data;
        },
        delete: async (id) => {
            const {data} = await Projects.post(`/yandexAccount/delete/${id}`);
            return data;
        },
        getAll: async (reqData) => {
            const initialData = {count: 10000, numberPage: 0, nameLogin: null};
            const postData = Object.assign(initialData, reqData);
            const {data} = await Projects.post(`/yandexAccount/findAllAccounts`, postData);
            return data;
        },
        update: async (reqData) => {
            const {data} = await Projects.post(`/yandexAccount/update`, reqData);
            return data;
        },
    },
    metrika: {
        getAll: async (reqData) => {
            const initialData = {count: 10000, numberPage: 0, name: null, token: null};
            const postData = Object.assign(initialData, reqData);
            const reqParams =
                `?pageSize=${postData.count}` +
                `&pageNumber=${postData.numberPage}` +
                `${postData.name ? `&name=${postData.name}` : ''}` +
                `${postData.token ? `&token=${postData.token}` : ''}`
            const {data} = await Projects.get(`/yandex-metrica${reqParams}`);
            return data;
        },
        create: async (reqData) => {
            const {data} = await Projects.post(`/yandex-metrica/create`, reqData);
            return data;
        },
        update: async (id, reqData) => {
            const {data} = await Projects.post(`/yandex-metrica/${id}/update`, reqData);
            return data;
        },
        delete: async (id) => {
            const {data} = await Projects.post(`/yandex-metrica/${id}/delete`);
            return data;
        },
    }
};
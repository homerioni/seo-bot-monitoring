import axios from "axios";

export const apiUrl = 'https://profile-monitoring.mayabiorobotics.ru'

let PMAxios = axios.create({
    baseURL: apiUrl + '/profile-monitoring-system',
    headers: {'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`},
});

export const updateTokenPM = (jwtToken) => {
    PMAxios = axios.create({
        baseURL: apiUrl + '/profile-monitoring-system',
        headers: {'Authorization': `Bearer ${jwtToken}`},
    });
};

export const PMService = {
    accessory: {
        getAll: async () => {
            const {data} = await PMAxios.get(`/accessory`);
            return data;
        },
        create: async (reqData) => {
            const {data} = await PMAxios.post(`/accessory/create`, reqData);
            return data;
        },
        change: async (id, type, reqData) => {
            const {data} = await PMAxios.post(`/accessory/${type}/${id}/update`, reqData);
            return data;
        },
        delete: async (id, type) => {
            const {data} = await PMAxios.post(`/accessory/${type}/${id}/delete`);
            return data;
        },
        assign: async (reqData) => {
            const {data} = await PMAxios.post(`/accessory/assign`, reqData);
            return data;
        },
        getForServer: async (id) => {
            const {data} = await PMAxios.get(`/accessory/server/${id}`);
            return data;
        },
    },
    antiCaptcha: {
        getAll: async (reqData = {}) => {
            const initialData = {count: 10000, numberPage: 0, serverIds: null};
            const postData = Object.assign(initialData, reqData);
            const {data} = await PMAxios.post(`/anticaptcha/get-all`, postData);
            return data;
        },
        create: async (reqData) => {
            const {data} = await PMAxios.post(`/anticaptcha/create`, reqData);
            return data;
        },
        change: async (id = 0, reqData) => {
            const {data} = await PMAxios.post(`/anticaptcha/${id}/change`, reqData);
            return data;
        },
        delete: async (id = 0) => {
            const {data} = await PMAxios.post(`/anticaptcha/${id}/delete`);
            return data;
        },
    },
    folderDistribution: {
        whoIsActive: [],
        get: async (id = 0) => {
            const {data} = await PMAxios.get(`/folder-distribution/${id}`);
            return data;
        },
        change: async (id = 0, reqData = {}) => {
            const {data} = await PMAxios.post(`/folder-distribution/${id}/change`, reqData);
            return data;
        },
        delete: async (id = 0) => {
            const {data} = await PMAxios.post(`/folder-distribution/${id}/delete`);
            return data;
        },
        create: async (reqData = {}) => {
            const {data} = await PMAxios.post(`/folder-distribution/create`, reqData);
            return data;
        },
        start: async (id = 0) => {
            const {data} = await PMAxios.post(`/folder-distribution/${id}/start`);
            return data;
        },
        allStart: async () => {
            const {data} = await PMAxios.post(`/folder-distribution/start`);
            return data;
        },
        request: async (id) => {
            const {data} = await PMAxios.get(`/folder-distribution/request/${id}`);
            return data;
        },
    },
    group: {
        create: async (reqData = {}) => {
            const {data} = await PMAxios.post(`/group/create`, reqData);
            return data;
        },
        delete: async (id) => {
            const {data} = await PMAxios.post(`/group/delete?groupId=${id}`);
            return data;
        },
        getAll: async (reqData = {}) => {
            const initialData = {count: 10000, numberPage: 0, tabId: null};
            const postData = Object.assign(initialData, reqData);
            const {data} = await PMAxios.post(`/group/get-all`, postData);
            return data;
        },
        reassign: async (reqData = {}) => {
            const {data} = await PMAxios.post(`/group/reassign`, reqData);
            return data;
        },
    },
    location: {
        delete: async (id) => {
            const {data} = await PMAxios.post(`/location/${id}/delete`);
            return data;
        },
        update: async (id, reqData) => {
            const {data} = await PMAxios.post(`/location/${id}/update`, reqData);
            return data;
        },
        create: async (reqData) => {
            const {data} = await PMAxios.post(`/location/create`, reqData);
            return data;
        },
        getAll: async (reqData = {}) => {
            const initialData = {count: 10000, numberPage: 0, tabId: null};
            const postData = Object.assign(initialData, reqData);
            const {data} = await PMAxios.get(
                `/location/get` +
                `?count=${postData.count}` +
                `&numberPage=${postData.numberPage}` +
                `${postData.ids ? '&ids=' + postData.ids.join('&ids=') : ''}` +
                `${postData.name ? `&name=${postData.name}` : ''}`);
            return data;
        },
    },
    monitoring: {
        getLogs: async (reqData) => {
            const {data} = await PMAxios.post(`/monitoring/getLogsByServerId`, reqData);
            return data;
        },
        getListHistoryLogs: async (reqData) => {
            const {data} = await PMAxios.post(`/monitoring/getListAllHistoryLogs`, reqData);
            return data;
        },
        getWordFrequency: async (reqData) => {
            const {data} = await PMAxios.post(`/monitoring/word-frequency`, reqData);
            return data;
        },
    },
    network: {
        change: async (id, reqData = {}) => {
            const {data} = await PMAxios.post(`/network/${id}/change`, reqData);
            return data;
        },
        delete: async (id) => {
            const {data} = await PMAxios.post(`/network/${id}/delete`);
            return data;
        },
        getAll: async (type = null) => {
            const {data} = await PMAxios.post(`/network/get-all`, {type});
            return data;
        },
        createRoot: async (reqData = {}) => {
            const {data} = await PMAxios.post(`/network/root/create`, reqData);
            return data;
        },
        createRouter: async (reqData = {}) => {
            const {data} = await PMAxios.post(`/network/router/create`, reqData);
            return data;
        },
    },
    performanceCycle: {
        get: async (ids = []) => {
            const request = ids.map((id, i) => i === 0 ? `?serverIds=${id}` : `&serverIds=${id}`).join('');
            const {data} = await PMAxios.get(`/performance-cycle${request}`);
            return data;
        },
        delete: async (id) => {
            const {data} = await PMAxios.post(`/performance-cycle/${id}/delete`);
            return data;
        },
        update: async (id, reqData = {}) => {
            const {data} = await PMAxios.post(`/performance-cycle/${id}/update`, reqData);
            return data;
        },
        create: async (reqData = {}) => {
            const {data} = await PMAxios.post(`/performance-cycle/create`, reqData);
            return data;
        },
        statistics: async (reqData) => {
            const {data} = await PMAxios.post(`/performance-cycle/statistic`, reqData);
            return data;
        },
    },
    profileStatistic: {
        create: async (reqData = {}) => {
            const {data} = await PMAxios.post(`/profile-statistic/create`, reqData);
            return data;
        },
        getSetting: async (id) => {
            const {data} = await PMAxios.get(`/profile-statistic/getById?id=${id}`);
            return data;
        },
        getAll: async (reqData = {}) => {
            const initialData = {count: 10000, input: '', numberPage: 0};
            const postData = Object.assign(initialData, reqData);
            const {data} = await PMAxios.get(
                `/profile-statistic/get` +
                `?count=${postData.count}` +
                `&numberPage=${postData.numberPage}` +
                `&input=${postData.input}` +
                `${postData.aliveStatuses ? `&aliveStatuses=${postData.aliveStatuses}` : ''}` +
                `${postData.serverIds ? '&serverIds=' + postData.serverIds.join('&serverIds=') : ''}` +
                `${postData.groupIds ? '&groupIds=' + postData.groupIds.join('&groupIds=') : ''}` +
                `${postData.locationIds ? '&locationIds=' + postData.locationIds.join('&locationIds=') : ''}`);
            return data;
        },
        update: async (id) => {
            const {data} = await PMAxios.post(`/profile-statistic/settings/${id}`);
            return data;
        },
        getStatistic: async (reqData) => {
            const {data} = await PMAxios.post(`/profile-statistic/settings/statistic`, reqData);
            return data;
        },
        getAgeStatistic: async (reqData) => {
            const {data} = await PMAxios.post(`/profile-statistic/settings/statistic/more`, reqData);
            return data;
        },
        change: async (id, reqData = {}) => {
            const {data} = await PMAxios.post(`/profile-statistic/update/${id}`, reqData);
            return data;
        },
    },
    projectPromotion: {
        getAll: async () => {
            const {data} = await PMAxios.get(`/project-promotion?pageNumber=0&pageSize=10000`);
            return data;
        },
        remove: async (id) => {
            const {data} = await PMAxios.post(`/project-promotion/${id}`);
            return data;
        },
        assign: async (id, reqData) => {
            const {data} = await PMAxios.post(`/project-promotion/${id}/servers/assign`, reqData);
            return data;
        },
        update: async (id, reqData) => {
            const {data} = await PMAxios.post(`/project-promotion/${id}/update`, reqData);
            return data;
        },
        create: async (reqData) => {
            const {data} = await PMAxios.post(`/project-promotion/create`, reqData);
            return data;
        },
    },
    server: {
        getAll: async (reqData = {}) => {
            const initialData = {count: 10000, numberPage: 0, serverIds: null};
            const postData = Object.assign(initialData, reqData);
            const {data} = await PMAxios.get(
                `/server/get-all` +
                `?count=${postData.count}` +
                `&numberPage=${postData.numberPage}` +
                `${postData.aliveStatuses ? `&aliveStatuses=${postData.aliveStatuses}` : ''}` +
                `${postData.serverIds ? '&serverIds=' + postData.serverIds.join('&serverIds=') : ''}` +
                `${postData.groupIds ? '&groupIds=' + postData.groupIds.join('&groupIds=') : ''}` +
                `${postData.locationIds ? '&locationIds=' + postData.locationIds.join('&locationIds=') : ''}`);
            return data;
        },
        off: async (id) => {
            const {data} = await PMAxios.post(`/server/${id}/off`);
            return data;
        },
        on: async (id) => {
            const {data} = await PMAxios.post(`/server/${id}/on`);
            return data;
        },
        reboot: async (id) => {
            const {data} = await PMAxios.post(`/server/${id}/reboot`);
            return data;
        },
        delete: async (id) => {
            const {data} = await PMAxios.post(`/server/${id}/delete`);
            return data;
        },
        create: async (reqData = {}) => {
            const {data} = await PMAxios.post(`/server/create`, reqData);
            return data;
        },
        change: async (id, reqData = {}) => {
            const {data} = await PMAxios.post(`/server/${id}/info`, reqData);
            return data;
        },
        update: async (versionId, ids = null) => {
            const {data} = await PMAxios.post(`/server/update?versionId=${versionId}`, {serverIds: ids});
            return data;
        },
    },
    settings: {
        get: async (id) => {
            const {data} = await PMAxios.get(`/settings/${id}`);
            return data;
        },
        getAllById: async (id) => {
            const {data} = await PMAxios.get(`/settings/getByServerId?id=${id}`);
            return data;
        },
        getAllByToken: async (token) => {
            const {data} = await PMAxios.get(`/settings/getByToken?token=${token}`);
            return data;
        },
        recipientChange: async (reqData = {}) => {
            const {data} = await PMAxios.post(`/settings/add`, reqData);
            return data;
        },
        create: async (reqData = {}) => {
            const {data} = await PMAxios.post(`/settings/add`, reqData);
            return data;
        },
        change: async (id, reqData = {}) => {
            const {data} = await PMAxios.post(`/settings/${id}/change`, reqData);
            return data;
        },
        delete: async (id) => {
            const {data} = await PMAxios.post(`/settings/${id}/delete`);
            return data;
        },
        sendingStart: async (id) => {
            const {data} = await PMAxios.post(`/settings/all/server/${id}/sending/start`);
            return data;
        },
        sendingStop: async (id) => {
            const {data} = await PMAxios.post(`/settings/all/server/${id}/sending/stop`);
            return data;
        },
        recipient: {
            create: async (threadId, reqData = {}) => {
                const {data} = await PMAxios.post(`/settings/${threadId}/recipient`, reqData);
                return data;
            },
            change: async (threadId, recipientId, reqData = {}) => {
                const {data} = await PMAxios.post(`/settings/${threadId}/recipient/${recipientId}/change`, reqData);
                return data;
            },
            delete: async (threadId, recipientId) => {
                const {data} = await PMAxios.post(`/settings/${threadId}/recipient/${recipientId}/delete`);
                return data;
            },
        },
    },
    settingsType: {
        getAll: async () => {
            const {data} = await PMAxios.get(`/settings-type/all`);
            return data;
        },
        create: async (reqData = {}) => {
            const {data} = await PMAxios.post(`/settings-type/add`, reqData);
            return data;
        },
        change: async (id, reqData = {}) => {
            const {data} = await PMAxios.post(`/settings-type/${id}/change`, reqData);
            return data;
        },
        delete: async (id) => {
            const {data} = await PMAxios.post(`/settings-type/${id}/delete`);
            return data;
        },
    },
    statistics: {
        server: async (reqData) => {
            const {data} = await PMAxios.post(`/statistics/servers`, reqData);
            return data;
        },
        group: async (reqData) => {
            const {data} = await PMAxios.post(`/statistics/groups`, reqData);
            return data;
        },
    },
    groupTab: {
        getAll: async () => {
            const {data} = await PMAxios.post(`/tabs/get-all`);
            return data;
        },
        create: async (reqData = {}) => {
            const {data} = await PMAxios.post(`/tabs/create`, reqData);
            return data;
        },
        change: async (id, reqData = {}) => {
            const {data} = await PMAxios.post(`/tabs/${id}/change`, reqData);
            return data;
        },
        delete: async (id) => {
            const {data} = await PMAxios.post(`/tabs/${id}/delete`);
            return data;
        },
    },
    task: {
        change: async (id, reqData) => {
            const {data} = await PMAxios.post(`/tasks/${id}/change`, reqData);
            return data;
        },
        phrases: async (id, reqData) => {
            const {data} = await PMAxios.post(`/tasks/${id}/phrases/upload`, reqData);
            return data;
        },
        solve: async (id, reqData) => {
            const {data} = await PMAxios.post(`/tasks/${id}/solve`, reqData);
            return data;
        },
        create: async (reqData) => {
            const {data} = await PMAxios.post(`/tasks/create`, reqData);
            return data;
        },
        getAll: async () => {
            const {data} = await PMAxios.get(`/tasks/get?pageNumber=0&pageSize=10000`);
            return data;
        },
        start: async () => {
            const {data} = await PMAxios.post(`/tasks/`);
            return data;
        },
    },
    testConnection: {
        getSetting: async (token) => {
            const {data} = await PMAxios.get(`/test-connection/getByToken?token=${token}`);
            return data;
        },
        create: async (reqData) => {
            const {data} = await PMAxios.post(`/test-connection/create`, reqData);
            return data;
        },
        change: async (id, reqData) => {
            const {data} = await PMAxios.post(`/test-connection/${id}/update`, reqData);
            return data;
        },
        getStatistic: async (id, date) => { // date = 2023-10-23
            const {data} = await PMAxios.get(`/test-connection/${id}/statistic?date=${date}`);
            return data;
        },
    },
    version: {
        get: async () => {
            const {data} = await PMAxios.get(`/version`);
            return data;
        },
        upload: async (versionName, file, progress) => {
            const formData = new FormData();
            formData.append('file', file);
            const {data} = await PMAxios.post(`/version?versionName=${versionName}`, formData, {
                onUploadProgress: function(e) {
                    progress(Math.round((e.loaded / e.total) * 100));
                }});
            return data;
        },
    },
};
export const getRem = (rem) => {
    if (window.innerWidth > 768) {
        return 0.005208335 * window.innerWidth * rem;
    } else {
        return (100/375) * (0.1 * window.innerWidth) * rem;
    }
};

export const getErrorMessage = (error, url) => {
    return [{
        status: false,
        message: `${url ? url + '<br/>' : ''}${error.response ? error.response.data?.error.description : error.message}`
    }];
};

export function defaultCatch (error, addAlert, setIsLoading) {
    const message = error.response ?
        error.response.data?.error.description ?
            error.response.data.error.description
            :
            `<b>URL:</b> ${error.response.data.path}<br/><b>Data:</b> Ошибка ${error.response.data.status}<br/>${error.response.data.error}`
        :
        `<b>URL:</b> ${error.config?.url}<br/><b>Data:</b> ${error.config?.data}<br/>${error.message}`
    addAlert([{status: false, message}]);
    setIsLoading && setIsLoading(false);
}

export function cutIp(ip) {
    let start = 0;

    if (ip && ip.startsWith('http://')) {
        start = 7;
    } else if (ip && ip.startsWith('https://')) {
        start = 8;
    }

    if (ip && Number(ip.slice(ip.lastIndexOf(':') + 1))) {
        return ip.slice(start, ip.lastIndexOf(':'));
    } else if (ip) {
        return ip.slice(start);
    }
}

export function getFullIp(ip, port = true) {
    let thisIp = ip;

    if (!thisIp.startsWith('http://') && !thisIp.startsWith('https://')) {
        thisIp = 'http://' + thisIp;
    }

    if (port && !Number(thisIp.slice(thisIp.lastIndexOf(':') + 1))) {
        thisIp = thisIp + ':8089';
    }

    return thisIp;
}

export const getDate = (date) => {
    if (date) {
        let dateDay = date.slice(8, 10),
            dateMonth = date.slice(5, 7),
            dateTime = date.slice(11, 16);

        return `${dateDay}.${dateMonth} ${dateTime}`
    }
    return '-';
};

export const getServerOrder = (server) => {
    let i = 1;
    if (server.modes && !server.modes.length) {
        i += 1;
        if (server.status === 'PARTIALLY_ACTIVE') i += 1;
        else if (server.status === 'NON_ACTIVE') i += 2;
    } else if (server.status === 'ACTIVE') {
        i += 4;
        if (!server.isSentActive) i += 2;
    } else if (server.status === 'PARTIALLY_ACTIVE') {
        i += 5;
        if (!server.isSentActive) i += 2;
    } else if (server.status === 'NON_ACTIVE') {
        i += 8;
    } else i += 10;
    return i;
};

export const serverInfoForm = (server, projects) => {
    return {
        accesses: server ? server.accesses : "", //string
        affiliation: server ? server.affiliation : "", //string
        anticaptchaServerIds: server ? server.anticaptchas?.map(el => String(el.id)) : [], // array [id, id]
        cases: server ? server.cases : "", //string
        configuration: server ? server.configuration : "", //string
        control: server ? server.control : "", //string
        error: server?.error ? server.error : null, //string
        from: server ? server.from : "", //string
        help: server ? server.help : "", //string
        ip: server ? server.ip : "", //string
        locationId: server ? server?.location?.id : "", //string
        maxPower: server ? String(server.maxPower) : '', // number
        name: server ? server.name : "", //string
        numberOfThreads: server ? server.numberOfThreads : '', // number
        projects: projects?.data?.result
            .filter(el => el.settingResponse?.servers?.filter(e => e.serverId === server?.id).length)
            .map(e => String(e.id)), // array [id, id]
        purpose: server ? server.purpose : '', //string
        connectionType: server?.connectionType ?? '', //string
        internetProvider: server?.internetProvider ?? '', //string
        routerName: server?.routerName ?? '', //string
        isAttention: server?.isAttention ?? false, //boolean
        pathWithBrowserProfile: server?.pathWithBrowserProfile ?? '',
    }
};

export const threadForm = (id) => {
    return {
        folderForReading: '', // string
        isActive: true, // boolean
        isSendingCopies: null, // boolean
        maxSuccessTransferredProfilesPerDay: '', // number
        name: '', // string
        numberOfDaysFileStored: 30, // number
        numberOfProfiles: '', // number
        sendingPeriod: '', // number
        serverId: id, // number
        settingsTypeId: '', // number
        warmup: null // string
    }
};

export const recipientForm = (data) => {
    return {
        folderForRecording: data ? data.folderForRecording : "", // string
        isActive: data ? data.isActive : true, // boolean
        serverId: data ? String(data.id) : '' // number
    }
};

export const tabForm = (data) => {
    return {
        groupIds: data ? data.groupIds : [], // [number]
        name: data ? data.name : '', // string
    }
};

export const settingsForm = (data) => {
    return {
        id: data ? data.id : null, // number
        iconLink: data ? data.iconLink : '', // string
        name: data ? data.name : '', // string
    }
};

export const filteredGroupTabs = (tabs, groups) => {
    const tabsObj = {notTabs: []};
    tabs?.forEach(tab => tabsObj[tab.id] = []);

    groups?.forEach(group => {
        if (group.tabs.length) {
            group.tabs.forEach(item => tabsObj[item.id]?.push(group));
        } else {
            tabsObj.notTabs.push(group);
        }
    });

    return tabsObj;
};

export const groupForm = (data) => {
    return {
        groupId: data ? data.id : null,
        name: data ? data.name : '',
        servers: data ? data.servers.map(el => String(el.id)) : []
    }
};

export const ending = (i) => {
    if (i > 10 && i < 15) return 'ов';
    switch (i % 10) {
        case 1:
            return '';
        case 2:
        case 3:
        case 4:
            return 'а';
        default:
            return 'ов';
    }
};

export const profileStatisticForm = (data, serverId) => {
    return {
        numberOfDays: data?.numberOfDays ?? '',
        numberOfSites: data?.numberOfSites ?? '',
        numberOfSitesIsActive: data?.numberOfSites ?? false,
        numberOfWarmupProfiles: data?.numberOfWarmupProfiles ?? '',
        numberOfWarmupProfilesIsActive: data?.numberOfWarmupProfiles ?? false,
        serverId: serverId,
        id: data?.id,
        settings: data?.settings ?? [{
            desktopFolder: '',
            mobileFolder: '',
            name: '',
        }],
        withoutLimits: data?.withoutLimits ?? false,
    };
};

export const staticReqData = (id) => {
    return [{
        fullRange: 1000,
        id: id,
        step: 50,
        startRange: 0,
        types: ['DESKTOP']
    },{
        fullRange: 1000,
        id: id,
        step: 50,
        startRange: 0,
        types: ['MOBILE']
    },{
        fullRange: 1000,
        id: id,
        step: 50,
        startRange: 0,
        types: ['DESKTOP', 'MOBILE']
    }];
}

export const convertToThousands = (num) => {
    if (num >= 1000) return Math.round(num/1000) + 'k';
    return Math.floor(num);
};

export const convertToThousandsCeil = (num) => {
    if (num >= 1000) return Math.ceil(num/1000) + 'k';
    return Math.floor(num);
};

export const requestModalStat = (id, types) => {
    return [{
        fullRange: 1000,
        id: id,
        step: 1,
        types: types,
    }]
};

export const convertMsToMinute = int => Math.floor(int / 1000 / 60);

export const addZeroForNumber = int => int < 10 ? '0' + int : int;

export const getTimeString = time => {
    time = new Date(time);
    return `${addZeroForNumber(time.getHours())}:${addZeroForNumber(time.getMinutes())}:${addZeroForNumber(time.getSeconds())}`
};

export const getDateForRequest = date => {
    return `${date.getFullYear()}-${addZeroForNumber((date.getMonth() + 1))}-${addZeroForNumber(date.getDate())}`;
}

export const getFilteredServers = (servers, serverIds, searchData, filterData, projectsData) => {
    let filteredArr = servers ?? [];

    if (serverIds) {
        filteredArr = filteredArr.filter(item => {
            return serverIds.includes(item.id);
        });
    }
    if (searchData) {
        filteredArr = filteredArr.filter(item => {
            return item.name.includes(searchData) || item.ip.includes(searchData);
        });
    }
    if (filterData) {
        filteredArr = filteredArr.filter(item => {
            const filterList = [true, true, true, true];
            if (filterData.groups.length) {
                filterList[0] = false;
                item.groups?.forEach(group => {
                    if (filterData.groups.includes(String(group.id))) filterList[0] = true;
                });
            }
            if (filterData.isSentActive.length) {
                if (!item.modes.length) {
                    filterList[1] = filterData.isSentActive.includes('off');
                } else {
                    filterList[1] = filterData.isSentActive.includes(String(item.isSentActive));
                }
            }
            if (filterData.locations.length) {
                filterList[2] = filterData.locations.includes(String(item.location?.id));
            }
            if (filterData.projects.length) {
                filterList[3] = false;
                if (projectsData[item.id]) {
                    projectsData[item.id].forEach(project => {
                        if (filterData.projects.includes(String(project.id))) filterList[3] = true;
                    })
                }
            }
            return !filterList.includes(false);
        });
    }
    return filteredArr;
}

export const projectForm = (data) => {
    return {
        domain: data?.settingResponse?.domain ?? '',
        frequency: data?.settingResponse?.frequency ?? '',
        isAllPermission: true,
        phrases: data?.settingResponse?.phrases.map(el => el.word).join('\n') ?? null,
        projectName: data?.name ?? '',
        topVisorApiKey: data?.settingResponse?.topVisorApiKey ?? null,
        topVisorId: data?.settingResponse?.topVisorId ?? null,
        projectId: data?.id,
        accIds: data?.settingResponse?.accounts?.map(item => String(item.id)) ?? null,
        yandexMetricaAccountId: String(data?.settingResponse?.yandexMetrica?.id)
    };
};

export const getLink = (url) => {
    let thisUrl = url;

    if (url && !thisUrl.startsWith('http://') && !thisUrl.startsWith('https://')) {
        thisUrl = 'https://' + thisUrl;
    }

    return thisUrl;
}

export const xmlForm = (data) => {
    return {
        ipProxy: data?.ipProxy ?? "",
        key: data?.key ?? "",
        login: data?.login ?? "",
        loginProxy: data?.loginProxy ?? "",
        passwordProxy: data?.passwordProxy ?? "",
        portProxy: data?.portProxy ?? ""
    }
}

export const metrikaForm = (data) => {
    return {
        name: data?.name ?? "",
        token: data?.token ?? "",
    }
}

export const networkForm = (data) => {
    if (data?.type === 'ROUTER') {
        return {
            ip: data.ip ?? '',
            location: data.location,
            name: data.name,
            servers: data.servers.map(item => {
                return {
                    id: String(item.server.id),
                    serverPort: item.serverPort,
                    updatePort: item.updatePort,
                };
            })
        }
    } else if (data?.type === 'ROOT') {
        return {
            ip: data.ip ?? '',
            location: data.location,
            name: data.name,
            servers: data.servers.map(item => {
                return {
                    id: String(item.server.id),
                };
            })
        }
    }
    return {};
}

export const getAccessoryHtmlData = data => {
    switch (data?.type) {
        case 'PROCESSOR':
            return [{text: data.characteristics.numberOfCores, postscript: 'ядер'}, {text: data.characteristics.numberOfThreads, postscript: 'потоков'}];
        case 'HARD_DRIVE':
            return [{text: data.characteristics.type}, {text: `${data.characteristics.capacity}GB`}, {text: data.characteristics.read, postscript: 'чтение'}, {text: data.characteristics.write, postscript: 'запись'}];
        case 'RAM':
            return [{text: data.characteristics.type}, {text: `${data.characteristics.capacity}GB`}];
        case 'VIDEO_ADAPTER':
            return [{text: `${data.characteristics.capacity}GB`}];
        case 'POWER_SUPPLY':
            return [{text: `${data.characteristics.capacity}W`}];
        case 'THERMAL_PASTE':
            return [{text: `${data.characteristics.capacity}г`}];
        default:
            return [];
    }
};

export const getAccessoryForm = data => {
    const accessories = [
        {type: 'PROCESSOR', ids: []},
        {type: 'RAM', ids: []},
        {type: 'HARD_DRIVE', ids: []},
        {type: 'VIDEO_ADAPTER', ids: []},
        {type: 'POWER_SUPPLY', ids: []},
        {type: 'THERMAL_PASTE', ids: []}
    ];
    data?.forEach(el => {
        switch (el.type) {
            case 'PROCESSOR':
                accessories[0].ids.push(String(el.id));
                return;
            case 'RAM':
                accessories[1].ids.push(String(el.id));
                return;
            case 'HARD_DRIVE':
                accessories[2].ids.push(String(el.id));
                return;
            case 'VIDEO_ADAPTER':
                accessories[3].ids.push(String(el.id));
                return;
            case 'POWER_SUPPLY':
                accessories[4].ids.push(String(el.id));
                return;
            case 'THERMAL_PASTE':
                accessories[5].ids.push(String(el.id));
                return;
            default:
                return;
        }
    });

    return {accessories};
};

export const getTitleAccessory = data => {
    switch (data.type) {
        case 'PROCESSOR':
            return  'ПРОЦЕССОР';
        case 'RAM':
            return  'RAM';
        case 'HARD_DRIVE':
            return  data.characteristics.type;
        case 'VIDEO_ADAPTER':
            return  'ВИДЕОКАРТА';
        case 'POWER_SUPPLY':
            return  'БЛОК ПИТАНИЯ';
        case 'THERMAL_PASTE':
            return  'ТЕРМОПАСТА';
        default: return '';
    }
};

export const getOrderAccessory = type => {
    switch (type) {
        case 'PROCESSOR':
            return 1;
        case 'RAM':
            return 2;
        case 'HARD_DRIVE':
            return 3;
        case 'VIDEO_ADAPTER':
            return 4;
        case 'POWER_SUPPLY':
            return 5;
        case 'THERMAL_PASTE':
            return 6;
        default: return 7;
    }
};

export const createRequestForStatistics = (reqData) => {
    return reqData.map((item, itemIndex) => {
        const separator = itemIndex > 0 ? '&' : '?';
        const items = `items%5B${itemIndex}%5D`;
        const serverId = items + `.id=${item.id}`;
        const requestPeriods = item.periods.map((date, periodIndex) =>
            `&items%5B${itemIndex}%5D.requestPeriods%5B${periodIndex}%5D.startDate=${date.startDate}&items%5B${itemIndex}%5D.requestPeriods%5B${periodIndex}%5D.endDate=${date.endDate}`).join('');
        return separator + serverId + requestPeriods;
    }).join('');
};
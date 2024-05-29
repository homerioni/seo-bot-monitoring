import {PMService} from "../../../../API/PMService";
import {ProjectsAPI} from "../../../../API/ProjectsAPI";
import {defaultCatch} from "../../../../utils/tools";

const projectsAssign = (projectIds, serverId, projectsResult, addAlert, queryClient) => {
    projectsResult?.forEach(project => {
        const projectServers = project.settingResponse.servers;
        const isHaveInProject = projectServers.some(item => item.serverId === serverId);
        const isProjectChecked = projectIds?.includes(String(project.id));

        if (isProjectChecked) {
            if (!isHaveInProject) {
                ProjectsAPI.settings.assignServers({
                    projectId: project.id,
                    servers: [...projectServers, {path: '', serverId}]
                }).then(() => {
                    queryClient.invalidateQueries('projects');
                }).catch(resp => {
                    addAlert([{status: false, message: `Ошибка присовения проекта: ${resp.response.data.error.description}`}]);
                });
            }
        } else {
            if (isHaveInProject) {
                ProjectsAPI.settings.assignServers({
                    projectId: project.id,
                    servers: projectServers.filter(server => server.serverId !== serverId)
                }).then(() => {
                    queryClient.invalidateQueries('projects');
                }).catch(resp => {
                    addAlert([{status: false, message: `Ошибка присовения проекта: ${resp.response.data.error.description}`}]);
                });
            }
        }
    });
};

export const changeServer = (server, data, setIsLoading, queryClient, setServer, addAlert, projectsResult) => {
    PMService.server.change(server.id, data).then(resp => {
        setIsLoading(false);
        queryClient.setQueryData('servers', (servers) => {
            return {
                ...servers,
                result: servers.result.map(item => item.id === server.id ? resp.result[0] : item)
            };
        });
        queryClient.invalidateQueries(`servers`);
        setServer(resp.result[0]);
        addAlert([{status: true, message: `Сервер ${data.name} успешно сохранен`}]);
        projectsAssign(data.projects, resp.result[0].id, projectsResult, addAlert, queryClient);
    }).catch(e => defaultCatch(e, addAlert, setIsLoading));
}

export const createServer = (server, data, setIsLoading, queryClient, setServer, addAlert, setTabs, projectsResult) => {
    PMService.server.create(data).then(resp => {
        setIsLoading(false);
        queryClient.setQueryData('servers', (servers) => {
            return {...servers, result: [...servers.result, ...resp.result]};
        });
        queryClient.invalidateQueries([`servers`]);
        setTabs([{name: 'О сервере', isField: true}]);
        setServer(resp.result[0]);
        addAlert([{status: true, message: `Сервер ${data.name} успешно добавлен и сохранен`}]);
        projectsAssign(data.projects, resp.result[0].id, projectsResult, addAlert, queryClient);
    }).catch(e => defaultCatch(e, addAlert, setIsLoading));
}
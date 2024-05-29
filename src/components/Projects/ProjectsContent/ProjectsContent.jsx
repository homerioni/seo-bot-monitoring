import React, {useContext} from 'react';
import s from './ProjectsContent.module.scss';
import ProjectsItem from "./ProjectsItem/ProjectsItem";
import {useQueryClient} from "react-query";
import {AlertContext} from "../../../App";
import {ProjectsAPI} from "../../../API/ProjectsAPI";
import {getErrorMessage} from "../../../utils/tools";

const ProjectsContent = ({filteredProjects, setModalConfirm}) => {
    const queryClient = useQueryClient();
    const addAlert = useContext(AlertContext);
    const switchRequest = (apiRequest, id, state, name, projectName) => setModalConfirm({
        isOpen: true,
        data: {
            title: `${state ? 'Включить' : 'Выключить'} "${name}" на проекте <b>${projectName}?</b>`,
            color: state ? 'green' : 'red',
            btnText: state ? 'Да, включить' : 'Да, выключить',
            iconType: 'server',
            onConfirm: (close) => {
                apiRequest(id).then(() => {
                    queryClient.invalidateQueries('projects');
                    addAlert([{status: true, message: `${name} на проекте <b>${projectName}</b> успешно ${state ? 'включен' : 'выключен'}`}]);
                    close();
                }).catch(e => close(getErrorMessage(e)));
            }
        }
    });

    const switchIsActive = (id, state, projectName) => {
        if (state) switchRequest(ProjectsAPI.settings.statistic.start, id, state, 'Сбор кликов', projectName)
        else switchRequest(ProjectsAPI.settings.statistic.stop, id, state, 'Сбор кликов', projectName)
    };

    const switchIsCheckPosition = (id, state, projectName) => {
        if (state) switchRequest(ProjectsAPI.settings.checkPosition.start, id, state, 'Яндекс Xml', projectName)
        else switchRequest(ProjectsAPI.settings.checkPosition.stop, id, state, 'Яндекс Xml', projectName)
    };

    return (
        <div className={s.main}>
            {filteredProjects?.map(project =>
                <ProjectsItem
                    key={project.id}
                    id={project.id}
                    name={project.name}
                    switchIsActive={switchIsActive}
                    switchIsCheckPosition={switchIsCheckPosition}
                    isActive={project.settingResponse.isActive}
                    isCheckPosition={project.settingResponse.isCheckPosition}
                    qtyServers={project.settingResponse.servers.length}
                    visorId={project.settingResponse.topVisorId}
                    metrikaId={project.settingResponse.yandexMetrica?.id}
                    tableLink={project.settingResponse.linkToTable}
                    siteLink={project.settingResponse.domain}
                />)}
        </div>
    );
};

export default ProjectsContent;
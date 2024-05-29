import React from 'react';
import s from './ProjectSwitchBox.module.scss';
import SwitchBtn from "../../UI/StatusUI/SwitchBtn/SwitchBtn";
import {getErrorMessage} from "../../../utils/tools";
import {ProjectsAPI} from "../../../API/ProjectsAPI";

const ProjectSwitchBox = ({addAlert, queryClient, project, setModalConfirm}) => {
    const isActive = project?.settingResponse.isActive;
    const isCheckPosition = project?.settingResponse.isCheckPosition;

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
            <div className={s.switch}>
                <p>Сбор кликов</p>
                <SwitchBtn active={isActive} onClick={() => switchIsActive(project.id, !isActive, project.name)}/>
            </div>
            <div className={s.switch}>
                <p>Яндекс xml</p>
                <SwitchBtn active={isCheckPosition} onClick={() => switchIsCheckPosition(project.id, !isCheckPosition, project.name)}/>
            </div>
        </div>
    );
};

export default ProjectSwitchBox;
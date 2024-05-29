import React, {useContext} from 'react';
import s from './Header.module.scss';
import BackLink from "./BackLink/BackLink";
import projectIcon from '../../assets/img/project-icon.svg';
import EditBtn from "./EditBtn/EditBtn";
import DelBtn from "./DelBtn/DelBtn";
import {ProjectsAPI} from "../../API/ProjectsAPI";
import {useNavigate} from "react-router";
import {getErrorMessage} from "../../utils/tools";
import ProjectInfo from "./ProjectInfo/ProjectInfo";
import {AlertContext} from "../../App";
import {useQueryClient} from "react-query";
import ProjectSwitchBox from "./ProjectSwitchBox/ProjectSwitchBox";
import {routeNames} from "../../router/routeNames";

const ProjectPageHeader = ({project, setModalConfirm, setModalProject}) => {
    const addAlert = useContext(AlertContext);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const onDel = () => setModalConfirm({
        isOpen: true,
        data: {
            title: `Удалить проект <b>${project?.name}</b>`,
            color: 'red',
            btnText: 'Да, удалить',
            iconType: 'server',
            onConfirm: (close) => {
                ProjectsAPI.project.delete(project.id).then(() => {
                    queryClient.invalidateQueries('projects');
                    addAlert([{status: true, message: `Проект ${project.name} успешно удален`}]);
                    navigate('/projects');
                }).catch(e => close(getErrorMessage(e)));
            }
        }
    });

    const onEdit = () => setModalProject({isOpen: true, data: project});

    return (
        <div className={s.main}>
            <div>
                <BackLink src={routeNames.projects}/>
                <div className={`${s.title} ${s.flex}`}>
                    <div className={s.projectIcon}>
                        <img src={projectIcon} alt=""/>
                    </div>
                    <span>{project?.name}</span>
                </div>
            </div>
            <div>
                <ProjectSwitchBox project={project} addAlert={addAlert} queryClient={queryClient} setModalConfirm={setModalConfirm}/>
                <ProjectInfo project={project}/>
                <EditBtn onClick={onEdit}/>
                <DelBtn onClick={onDel}/>
            </div>
        </div>
    );
};

export default ProjectPageHeader;
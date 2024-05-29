import React from 'react';
import s from './ServerInfoProjects.module.scss';
import projectIcon from '../../../../../../assets/img/project-icon-square.svg';

const ServerInfoProjects = ({server, projectsData}) => {
    return (
        <div className={s.main}>
            {projectsData[server.id] ? projectsData[server.id].map(project => {
                return (
                    <div key={project.id} className={s.item}>
                        <div className={s.icon}>
                            <img src={projectIcon} alt=""/>
                        </div>
                        <p>{project.name}</p>
                    </div>
                )
            }) : ''}
        </div>
    );
};

export default ServerInfoProjects;
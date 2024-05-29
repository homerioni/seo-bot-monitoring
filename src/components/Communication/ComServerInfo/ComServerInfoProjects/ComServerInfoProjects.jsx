import React from 'react';
import s from './ComServerInfoProjects.module.scss';
import projectIcon from "../../../../assets/img/project-icon-square.svg";

const ComServerInfoProjects = ({selectedServer, projectsData}) => {
    return (
        <>
            {projectsData[selectedServer.id] &&
                <div className={s.main}>
                    {projectsData[selectedServer.id].map(project => {
                        return (
                            <div key={project.id} className={s.item}>
                                <div className={s.icon}>
                                    <img src={projectIcon} alt=""/>
                                </div>
                                <p>{project.name}</p>
                            </div>
                        )
                    })}
                </div>}
        </>
    );
};

export default ComServerInfoProjects;
import React from 'react';
import s from './ProjectServersForm.module.scss';
import Loading from "../../../../UI/Loading/Loading";
import ProjectServersLabel from "./ProjectServersLabel/ProjectServersLabel";

const ProjectServersForm = ({servers, selectedServers, setSelectedServers, setModalProjectServers}) => {
    const onEdit = data => setModalProjectServers({isOpen: true, setter: setSelectedServers, selectedServers, data});

    return (
        <div className={s.main}>
            <div className={s.titleBox}>
                <p>выберите серверы</p>
                <div className={s.tooltip}>
                    <p>Выберите сервера которые будут состоять в данном проекте.</p>
                </div>
            </div>
            <div className={s.servers}>
                {servers.isLoading && <Loading/>}
                <button type="button"
                        className={s.addBtn}
                        onClick={() => setModalProjectServers({isOpen: true, setter: setSelectedServers, selectedServers})}
                >
                    Добавить сервер
                </button>
                {selectedServers?.map(item =>
                    <ProjectServersLabel key={item.serverId} data={item} setSelectedServers={setSelectedServers} onEdit={onEdit}/>)}
            </div>
        </div>
    );
};

export default ProjectServersForm;
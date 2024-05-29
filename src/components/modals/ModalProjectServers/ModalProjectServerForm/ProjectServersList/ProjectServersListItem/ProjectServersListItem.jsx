import React from 'react';
import s from './ProjectServersListItem.module.scss';
import GroupServerInfo from "../../../../ModalGroup/GroupForm/GroupFormServers/GroupFormServer/GroupServerInfo/GroupServerInfo";

const ProjectServersListItem = ({register, server, setSelectedServer}) => {
    const onChange = () => setSelectedServer(server);

    return (
        <div className={`${s.main}`}>
            <label className={s.checkbox}>
                <input {...register('serverId', {required: true})} value={server.id} type="radio" onInput={onChange}/>
                <span className={s.checkIcon}/>
            </label>
            <GroupServerInfo data={server}/>
        </div>
    );
};

export default ProjectServersListItem;
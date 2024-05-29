import React from 'react';
import s from './ComServersListItem.module.scss';
import GroupServerInfo from "../../../../ModalGroup/GroupForm/GroupFormServers/GroupFormServer/GroupServerInfo/GroupServerInfo";

const ComServersListItem = ({register, server, setSelectedServer, setIsListOpen}) => {
    const onChange = () => {
        setSelectedServer(server);
        setIsListOpen(false);
    };

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

export default ComServersListItem;
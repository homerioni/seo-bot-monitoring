import React from 'react';
import s from "./ProjectServersLabel.module.scss";
import {cutIp} from "../../../../../../utils/tools";

const ProjectServersLabel = ({data, setSelectedServers, onEdit}) => {
    const onDel = () => setSelectedServers(prev => prev.filter(item => item.server?.id !== data?.server?.id));

    return (
        <div className={s.main}>
            <div onClick={() => onEdit(data)}>
                <p className={s.name}>{data?.server?.name}</p>
                <p className={s.ip}>{data?.server?.ip ? cutIp(data.server.ip) : ''}</p>
            </div>
            <button type='button' className={s.del} onClick={onDel}/>
        </div>
    );
};

export default ProjectServersLabel;
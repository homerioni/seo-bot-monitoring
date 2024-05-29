import React, {useMemo, useRef, useState} from 'react';
import s from './ProjectServersList.module.scss';
import ProjectServersListItem from "./ProjectServersListItem/ProjectServersListItem";
import {cutIp} from "../../../../../utils/tools";
import {useToggleDropDownList} from "../../../../../hooks/useToggleDropDownList";

const ProjectServersList = ({servers, register, setSelectedServer, selectedServer, selectedServers, data}) => {
    const listRef = useRef(null);
    const [searchData, setSearchData] = useState('');
    const [isListOpen, setIsListOpen] = useToggleDropDownList(listRef);

    const filteredServers = useMemo(() => {
        return servers.data?.result.filter(item =>
            (item.name.includes(searchData) || item.ip.includes(searchData))
            && (!selectedServers?.find(el => el.serverId == item.id) || data?.serverId == item.id));
    }, [servers, searchData, selectedServers]);

    return (
        <div className={s.main}>
            <div className={s.titleBox}>
                <p>выберите серверы</p>
                <div className={s.tooltip}>
                    <p>Выберите сервера которые будут состоять в данной группе.</p>
                </div>
            </div>
            <div className={s.label}>
                <p className={`${s.labelText} ${isListOpen ? s.active : ''}`} onClick={() => setIsListOpen(!isListOpen)} ref={listRef}>
                    <b>{selectedServer?.name}</b>
                    <span>{selectedServer?.ip ? cutIp(selectedServer.ip) : ''}</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 9L12 15L18 9" stroke="#393B44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </p>
                <div className={`${s.listBox} ${isListOpen ? s.active : ''}`}>
                    <label className={s.search}>
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.0833 17.4167C14.1334 17.4167 17.4167 14.1334 17.4167 10.0833C17.4167 6.03325 14.1334 2.75 10.0833 2.75C6.03325 2.75 2.75 6.03325 2.75 10.0833C2.75 14.1334 6.03325 17.4167 10.0833 17.4167Z" stroke="#505050" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M19.2531 19.25L15.2656 15.2625" stroke="#505050" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <input placeholder="Поиск по IP, названию.." value={searchData} onChange={e => setSearchData(e.target.value)}/>
                    </label>
                    <div className={s.list}>
                        {filteredServers?.length ?
                            filteredServers.map(server => <ProjectServersListItem key={server.id} register={register} server={server} setSelectedServer={setSelectedServer}/>) : ''}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectServersList;
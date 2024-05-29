import React, {useEffect, useRef, useState} from 'react';
import s from './GroupFormServers.module.scss';
import GroupFormServer from "./GroupFormServer/GroupFormServer";
import GroupFormServerLabel from "./GroupFormServerLabel/GroupFormServerLabel";
import Loading from "../../../../UI/Loading/Loading";
import {useToggleDropDownList} from "../../../../../hooks/useToggleDropDownList";

const GroupFormServers = ({register, servers, watch}) => {
    const listRef = useRef(null);
    const [searchData, setSearchData] = useState('');
    const [items, setItems] = useState([]);
    const [isListOpen, setIsListOpen] = useToggleDropDownList(listRef);

    useEffect(() => {
        if (watch && !servers.isLoading && !items?.length)
            setItems(watch && watch('servers').map(el => servers.data?.result.find(server => server.id == el)));
    }, [servers]);

    return (
        <div className={s.main}>
            <div className={s.titleBox}>
                <p>выберите серверы</p>
                <div className={s.tooltip}>
                    <p>Выберите сервера которые будут состоять в данной группе.</p>
                </div>
            </div>
            <div className={s.servers}>
                {servers.isLoading ? <Loading/> : ''}
                <button type="button" className={s.addBtn} onClick={() => setIsListOpen(!isListOpen)}>Добавить сервер</button>
                <div className={`${s.listBox} ${isListOpen ? s.active : ''}`} ref={listRef}>
                    <label className={s.search}>
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.0833 17.4167C14.1334 17.4167 17.4167 14.1334 17.4167 10.0833C17.4167 6.03325 14.1334 2.75 10.0833 2.75C6.03325 2.75 2.75 6.03325 2.75 10.0833C2.75 14.1334 6.03325 17.4167 10.0833 17.4167Z" stroke="#505050" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M19.2531 19.25L15.2656 15.2625" stroke="#505050" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <input placeholder="Поиск по IP, названию.." value={searchData} onChange={e => setSearchData(e.target.value)}/>
                    </label>
                    <div className={s.list}>
                        {servers.data?.result.map(server =>
                            <GroupFormServer key={server.id} register={register} watch={watch} setItems={setItems} data={server} searchData={searchData}/>
                        )}
                    </div>
                </div>
                {items?.length ?
                    items.map(item => <GroupFormServerLabel key={item?.id} data={item}/>) : ''}
            </div>
        </div>
    );
};

export default GroupFormServers;
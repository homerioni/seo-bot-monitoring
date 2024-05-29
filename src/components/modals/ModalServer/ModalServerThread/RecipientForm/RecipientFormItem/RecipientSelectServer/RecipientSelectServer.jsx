import React, {useEffect, useMemo, useRef, useState} from 'react';
import s from './RecipientSelectServer.module.scss';
import {useQueryClient} from "react-query";
import {cutIp} from "../../../../../../../utils/tools";
import {useToggleDropDownList} from "../../../../../../../hooks/useToggleDropDownList";

const RecipientSelectServer = ({register, watch, recipients}) => {
    const listRef = useRef(null);
    const queryClient = useQueryClient();
    const servers = queryClient.getQueryData('servers');
    const [selectedServer, setSelectedServer] = useState(null);
    const [isListOpen, setIsListOpen] = useToggleDropDownList(listRef);
    const [searchValue, setSearchValue] = useState('');

    const filteredServers = useMemo(() => {
        return servers?.result.filter(server => server.name.includes(searchValue));
    }, [searchValue, servers]);

    useEffect(() => {
        setSelectedServer(servers?.result.filter(item => String(item.id) === watch().serverId)[0]);
    }, [watch]);

    return (
        <div className={`${s.main} ${isListOpen ? s.upper : ''}`}>
            <div className={s.labelBox}>
                <div className={s.label} onClick={() => setIsListOpen(!isListOpen)}>
                    <p>{selectedServer ?
                        <><b>{selectedServer.name}</b> {cutIp(selectedServer.ip)}</>
                        : <span className={s.gray}>Название и Ip</span>}
                    </p>
                    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 0.999939L7 6.99994L13 0.999939" stroke="#393B44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <div className={`${s.list} ${isListOpen ? s.show : ''}`} ref={listRef}>
                    <div className={s.search}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M3 9.11135C3 5.73609 5.73601 3 9.11093 3C12.4859 3 15.2219 5.73609 15.2219 9.11135C15.2219 10.7573 14.5712 12.2513 13.5131 13.3501C13.4834 13.3737 13.4547 13.3993 13.4272 13.4267C13.3996 13.4543 13.374 13.4831 13.3503 13.5129C12.2515 14.5716 10.7572 15.2227 9.11093 15.2227C5.73601 15.2227 3 12.4866 3 9.11135ZM14.0962 15.5101C12.7209 16.5833 10.9906 17.2227 9.11093 17.2227C4.63133 17.2227 1 13.5911 1 9.11135C1 4.63163 4.63133 1 9.11093 1C13.5905 1 17.2219 4.63163 17.2219 9.11135C17.2219 10.9905 16.5829 12.7205 15.5103 14.0957L18.708 17.2936C19.0985 17.6841 19.0985 18.3173 18.7079 18.7078C18.3174 19.0983 17.6842 19.0983 17.2937 18.7078L14.0962 15.5101Z" fill="#1E1E22"/>
                        </svg>
                        <input type="text" onChange={e => setSearchValue(e.target.value)} placeholder={'Поиск...'}/>
                    </div>
                    {filteredServers?.map((server, i) => {
                        const className = recipients.filter(el => el?.id === server.id).length ? s.hide : '';

                        return (
                            <label key={server.id} className={className}>
                                <input {...register('serverId', {required: 'Обязательное поле'})}
                                       type="radio" value={server.id} onInput={() => {
                                    setSelectedServer({id: server.id, name: server.name, ip: cutIp(server.ip)});
                                    setIsListOpen(false);
                                }}/>
                                <span>{i + 1}. </span>
                                <b>{server.name}</b>
                                {cutIp(server.ip)}
                            </label>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default RecipientSelectServer;
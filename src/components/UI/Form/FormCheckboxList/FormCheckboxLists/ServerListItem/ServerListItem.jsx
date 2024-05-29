import React from 'react';
import s from './ServerListItem.module.scss';
import ServerListItemInfo from "./ServerListItemInfo/ServerListItemInfo";
import {cutIp} from "../../../../../../utils/tools";

const ServerListItem = ({register, data, setItems, searchData}) => {
    const isIncludes = data.name.includes(searchData) || data.ip.includes(searchData);

    const onChange = (e) => {
        e.target.checked ?
            setItems(prev => [...prev, {id: data.id, text: [data.name, cutIp(data.ip)], htmlFor: `groupServerLabel${data.id}`}])
            : setItems(prev => prev.filter(e => e.id !== data.id));
    };

    return (
        <div className={`${s.main} ${!isIncludes ? s.hide : ''}`}>
            <input {...register} id={`groupServerLabel${data.id}`} value={data.id} type="checkbox" onInput={onChange}/>
            <div className={s.listItemBox}>
                <label className={s.checkbox} htmlFor={`groupServerLabel${data.id}`}>
                    <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 1.5L4.75 9.75L1 6" stroke="#86E28A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </label>
                <ServerListItemInfo data={data}/>
            </div>
        </div>
    );
};

export default ServerListItem;
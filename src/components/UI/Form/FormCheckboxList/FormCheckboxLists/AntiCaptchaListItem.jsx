import React from 'react';
import s from "../FormCheckboxList.module.scss";
import {cutIp} from "../../../../../utils/tools";

const AntiCaptchaListItem = ({register, data, searchData, setItems}) => {
    const isIncludes = data.name.includes(searchData) || data.ip.includes(searchData);

    const onChange = e => {
        e.target.checked ?
            setItems(prev => {
                if (Array.isArray(prev)) {
                    return [...prev, {id: data.id, text: [data.name, cutIp(data.ip)], htmlFor: `modalCaptcha${data.id}`}]
                }
                return [{id: data.id, text: [data.name, cutIp(data.ip)], htmlFor: `modalCaptcha${data.id}`}];
            }) : setItems(prev => prev.filter(e => e.id !== data.id));
    }

    return (
        <div className={`${s.listItem} ${isIncludes ? '' : s.hide}`}>
            <input id={`modalCaptcha${data.id}`} {...register} onInput={onChange} value={data.id} type="checkbox"/>
            <div className={s.listItemBox}>
                <label className={s.checkbox} htmlFor={`modalCaptcha${data.id}`}>
                    <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 1.5L4.75 9.75L1 6" stroke="#86E28A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </label>
                <p>{data.name}</p>
                <p>{cutIp(data.ip)}</p>
            </div>
        </div>
    );
};

export default AntiCaptchaListItem;
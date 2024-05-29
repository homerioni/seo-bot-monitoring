import React from 'react';
import s from "../FormCheckboxList.module.scss";

const YandexListItem = ({register, searchData, setItems, data, icon}) => {
    const isIncludes = data.ipProxy.includes(searchData);

    const onChange = e => {
        e.target.checked ?
            setItems(prev => {
                if (prev) {
                    return [...prev, {id: data.id, text: [`Аккаунт #${data.id - 999}`], htmlFor: `YandexFormList${data.id}`}]
                } else {
                    return [{id: data.id, text: [`Аккаунт #${data.id - 999}`], htmlFor: `YandexFormList${data.id}`}]
                }
            })
            : setItems(prev => prev.filter(e => e.id !== data.id));
    }

    return (
        <div className={`${s.listItem} ${isIncludes ? '' : s.hide}`}>
            <input id={`YandexFormList${data.id}`} {...register} value={data.id} type="checkbox" onInput={onChange}/>
            <div className={s.listItemBox}>
                <label className={s.checkbox} htmlFor={`YandexFormList${data.id}`}>
                    <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 1.5L4.75 9.75L1 6" stroke="#86E28A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </label>
                <div className={s.listIcon}>
                    <img src={icon} alt=""/>
                </div>
                <p>Аккаунт #{data.id - 999}</p>
                <p>{data.ipProxy}</p>
            </div>
        </div>
    );
};

export default YandexListItem;
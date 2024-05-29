import React, {useState} from 'react';
import s from './GroupFormServer.module.scss';
import GroupServerInfo from "./GroupServerInfo/GroupServerInfo";

const GroupFormServer = ({register, watch, data, setItems, searchData}) => {
    const [isCheck, setIsCheck] = useState(watch && watch('servers')?.includes(String(data.id)));

    const onChange = (e) => {
        setIsCheck(e.target.checked);
        if (e.target.checked) {
            setItems(prev => [...prev, data]);
        } else {
            setItems(prev => prev.filter(item => item.id !== data.id));
        }
    };

    const isShow = data.name.includes(searchData) || data.ip.includes(searchData);

    return (
        <div className={`${s.main} ${isCheck ? s.active : ''} ${!isShow ? s.hide : ''}`}>
            <label className={s.checkbox}>
                <input {...register('servers', {required: 'Обязательное поле'})} id={`groupServerLabel${data.id}`} value={data.id} type="checkbox" onInput={onChange}/>
                <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 1.5L4.75 9.75L1 6" stroke="#86E28A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </label>
            <GroupServerInfo data={data}/>
        </div>
    );
};

export default GroupFormServer;
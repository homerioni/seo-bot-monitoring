import React, {useEffect, useState} from 'react';
import s from "./FormCheckboxList.module.scss";
import {cutIp} from "../../../../../../utils/tools";

const ListItem = ({register, data, searchData, setItems, watch}) => {
    const [isCheck, setIsCheck] = useState(false);
    const isIncludes = data.name.includes(searchData) || data.ip.includes(searchData);

    useEffect(() => {
        if (watch(register.name)?.includes(String(data.id))) {
            setIsCheck(true);
            setItems(prev => [...prev, {id: data.id, text: [data.name, cutIp(data.ip)], htmlFor: `modalCaptcha${data.id}`}]);
        }
    }, [watch]);

    const onChange = e => {
        setIsCheck(e.target.checked);
        e.target.checked ?
            setItems(prev => [...prev, {id: data.id, text: [data.name, cutIp(data.ip)], htmlFor: `modalCaptcha${data.id}`}])
            : setItems(prev => prev.filter(e => e.id !== data.id));
    }

    return (
        <li className={`${s.listItem} ${isCheck ? s.active : ''} ${isIncludes ? '' : s.hide}`}>
            <label className={s.checkbox}>
                <input id={`modalCaptcha${data.id}`} {...register} onInput={onChange} value={data.id} type="checkbox"/>
                <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 1.5L4.75 9.75L1 6" stroke="#86E28A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </label>
            <p>{data.name}</p>
            <p>{cutIp(data.ip)}</p>
        </li>
    );
};

const FormListAntiCaptcha = ({register, searchData, setItems, watch, antiCaptcha}) => {
    return (
        <ul className={s.list}>
            {antiCaptcha.data?.result.map(item =>
                <ListItem key={item.id} searchData={searchData} register={register} data={item} setItems={setItems} watch={watch}/>)}
        </ul>
    );
};

export default FormListAntiCaptcha;
import React, {useEffect, useRef, useState} from 'react';
import s from './FormCheckboxList.module.scss';
import Loading from "../../Loading/Loading";
import {useToggleDropDownList} from "../../../../hooks/useToggleDropDownList";
import CheckboxList from "./CheckboxList";

const FormCheckboxList = ({title, tooltip, addText, register, icon, listItems, defaultItems, children}) => {
    const listRef = useRef(null);
    const [searchData, setSearchData] = useState('');
    const [isOpen, setIsOpen] = useToggleDropDownList(listRef);
    const [items, setItems] = useState(defaultItems ?? []);

    useEffect(() => setSearchData(''), [isOpen]);
    // useEffect(() => setItems(defaultItems), [defaultItems]);

    return (
        <div className={s.main}>
            <div className={s.titleBox}>
                <p>{title}</p>
                {tooltip ?
                    <div className={s.tooltip}>
                        <p>{tooltip}</p>
                    </div> : ''}
            </div>
            <div className={s.content}>
                {listItems.isLoading && <Loading/>}
                <button type="button" className={`${s.label} ${s.add}`} onClick={() => setIsOpen(!isOpen)}>{addText ?? 'Добавить'}</button>
                <div className={`${s.listBox} ${isOpen ? s.show : ''}`} ref={listRef}>
                    <label className={s.search}>
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.0833 17.4167C14.1334 17.4167 17.4167 14.1334 17.4167 10.0833C17.4167 6.03325 14.1334 2.75 10.0833 2.75C6.03325 2.75 2.75 6.03325 2.75 10.0833C2.75 14.1334 6.03325 17.4167 10.0833 17.4167Z" stroke="#505050" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M19.2531 19.25L15.2656 15.2625" stroke="#505050" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <input placeholder="Поиск..." value={searchData} onChange={e => setSearchData(e.target.value)}/>
                    </label>
                    <CheckboxList register={register} icon={icon} setItems={setItems} searchData={searchData} listItems={listItems.data?.result}>
                        {children}
                    </CheckboxList>
                </div>
                {items?.map(item => (
                    <div key={item.id} className={s.label}>
                        {icon ?
                            <div className={s.labelIcon}>
                                <img src={icon} alt=""/>
                            </div> : ''}
                        {item.text?.map((el, i) => <p key={i}>{el}</p>)}
                        <label htmlFor={item.htmlFor} className={s.labelDel}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FormCheckboxList;
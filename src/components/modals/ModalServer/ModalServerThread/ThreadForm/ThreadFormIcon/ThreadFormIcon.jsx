import React, {useEffect, useRef, useState} from 'react';
import s from './ThreadFormIcon.module.scss';
import {useToggleDropDownList} from "../../../../../../hooks/useToggleDropDownList";

const ThreadFormIcon = ({register, settingsType, watch}) => {
    const listRef = useRef(null);
    const [isOpen, setIsOpen] = useToggleDropDownList(listRef);
    const [selectIcon, setSelectIcon] = useState('');

    useEffect(() => {
        setSelectIcon(settingsType?.filter(type => String(type.id) === watch().settingsTypeId)[0]);
    }, [watch]);

    return (
        <div>
            <div className={s.title}><p>Иконка</p></div>
            <div className={`${s.container} ${isOpen ? s.active : ''}`} ref={listRef}>
                <div className={s.btn}>
                    <div className={s.icon} onClick={() => setIsOpen(!isOpen)}>
                        <img alt="" src={selectIcon?.iconLink}/>
                    </div>
                    <div className={`${s.list} ${isOpen ? s.open : ''}`}>
                        {settingsType?.map(type => (
                            <label key={type.id} className={selectIcon?.id === type.id ? s.active : ''}>
                                <input {...register} value={type.id} type="radio" onInput={() => {setIsOpen(!isOpen); setSelectIcon(type)}}/>
                                <img src={type.iconLink} alt=""/>
                            </label>
                        ))}
                    </div>
                </div>
                <svg onClick={() => setIsOpen(!isOpen)} width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 0.999573L7 6.99957L13 0.999573" stroke="#393B44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
        </div>
    );
};

export default ThreadFormIcon;
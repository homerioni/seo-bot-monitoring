import React, {useRef, useState} from 'react';
import s from './DashSelect.module.scss';
import {useToggleDropDownList} from "../../../../../hooks/useToggleDropDownList";

const DashSelect = ({list, subtitle, defaultValue, setValue, style, titleMob, subtitleMob}) => {
    const [activeItem, setActiveItem] = useState(defaultValue ? list?.find(el => el.value == defaultValue) : null);
    const selectRef = useRef(null);
    const [isListOpen, setIsListOpen] = useToggleDropDownList(selectRef, 0);

    const onChange = e => {
        const val = e.target.value;
        setIsListOpen(false);
        setActiveItem(list.find(el => el.value == val));

        if (setValue) setValue(val);
    }

    return (
        <div className={s.main} style={{...style, zIndex: isListOpen ? '99' : ''}}>
            <div className={s.selectedItem} onClick={() => setIsListOpen(prev => !prev)} ref={selectRef}>
                {subtitle ? <span className={s.subtitle}>{subtitle}</span> : ''}
                <span>{activeItem?.name}</span>
                <svg className={isListOpen ? s.active : ''} width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2L8 8L2 2" stroke="#393B44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            {isListOpen &&
                <div className={s.list}>
                    <div className={s.listHeader}>
                        <div className={s.listTitleBox}>
                            <p>{titleMob ?? ''}</p>
                            {subtitleMob ? <p>{subtitleMob}</p> : false}
                        </div>
                        <button className={s.listClose} onClick={() => setIsListOpen(false)}/>
                    </div>
                    {list?.map(el => (
                        <label key={el.value} className={s.item}>
                            <input type="radio" name='test' value={el.value} onChange={onChange} checked={activeItem.value === el.value}/>
                            <span className={s.icon}/>
                            <span>{el.name}</span>
                        </label>
                    ))}
                </div>}
        </div>
    );
};

export default DashSelect;
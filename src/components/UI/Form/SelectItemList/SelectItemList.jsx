import React, {useEffect, useRef, useState} from 'react';
import s from './SelectItemList.module.scss';
import {useToggleDropDownList} from "../../../../hooks/useToggleDropDownList";
import TitleLabel from "../TitleLabel/TitleLabel";

const SelectItemList = ({selectedWatch, list, register, className, title, tooltip, itemTemplate}) => {
    const listRef = useRef(null);
    const [selected, setSelected] = useState();
    const [isListOpen, setIsListOpen] = useToggleDropDownList(listRef);

    useEffect(() => {
        setSelected(list?.find(el => el.id == selectedWatch));
    }, [selectedWatch]);

    const onInput = () => setIsListOpen(false);

    const listRender = list?.map((item) => itemTemplate(item, onInput, register));

    return (
        <div className={`${className ?? s.main} ${isListOpen ? s.upper : ''}`}>
            {title && <TitleLabel title={title} tooltip={tooltip}/>}
            <div className={s.labelBox}>
                <div className={s.label} onClick={() => setIsListOpen(!isListOpen)}>
                    {selected && itemTemplate(selected, onInput)}
                    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 0.999939L7 6.99994L13 0.999939" stroke="#393B44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <div className={`${s.list} ${isListOpen ? s.show : ''}`} ref={listRef}>
                    {listRender}
                </div>
            </div>
        </div>
    );
};

export default SelectItemList;
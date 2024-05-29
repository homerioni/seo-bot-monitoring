import React, {useEffect, useRef, useState} from 'react';
import s from './FormPurposeList.module.scss';
import {useClosingDropDownList} from "../../../../../../hooks/useClosingDropDownList";
import TitleLabel from "../../../../../UI/Form/TitleLabel/TitleLabel";

const FormPurposeList = ({list, register, anotherRegister, selectedWatch, className, title, tooltip, placeholder}) => {
    const listRef = useRef(null);
    const [selected, setSelected] = useState(selectedWatch);
    const [isListOpen, setIsListOpen] = useState(false);
    const [anotherValue, setAnotherValue] = useState('');
    useClosingDropDownList(listRef, () => setIsListOpen(false), isListOpen);

    useEffect(() => {
        if (!list?.includes(selectedWatch)) {
            setAnotherValue(selectedWatch);
            document.getElementById('anotherSelect').checked = true;
        }
    }, []);

    useEffect(() => {
        if (document.getElementById('anotherSelect').checked) setSelected(anotherValue);
    }, [anotherValue]);

    const onInput = e => {
        setIsListOpen(false);
        if (e.target.value === 'ANOTHER') {
            setSelected(anotherValue);
        } else {
            setSelected(e.target.value);
        }
    };

    const listRender = list?.map((item, i) => {
        return (
            <label key={item}>
                <input {...register} type="radio" value={item} onInput={onInput}/>
                <span>{i + 1}. </span>
                <b>{item}</b>
            </label>
        );
    });

    return (
        <div className={`${className ?? s.main} ${isListOpen ? s.upper : ''}`}>
            {title && <TitleLabel title={title} tooltip={tooltip}/>}
            <div className={s.labelBox}>
                <div className={s.label} onClick={() => setIsListOpen(!isListOpen)}>
                    <p>{selected ?? <span className={s.gray}>{placeholder}</span>}</p>
                    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 0.999939L7 6.99994L13 0.999939" stroke="#393B44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <div className={`${s.list} ${isListOpen ? s.show : ''}`} ref={listRef}>
                    {listRender}
                    <div className={s.inputBox}>
                        <label>
                            <input id={'anotherSelect'} {...register} type="radio" value={'ANOTHER'} onInput={onInput}/>
                            <span className={s.checkIcon}/>
                        </label>
                        <input {...anotherRegister} type="text" value={anotherValue} onChange={e => setAnotherValue(e.target.value)}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormPurposeList;
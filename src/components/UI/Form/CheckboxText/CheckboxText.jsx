import React, {useState} from 'react';
import TitleLabel from "../TitleLabel/TitleLabel";
import s from "./CheckboxText.module.scss";

const CheckboxText = ({className, title, tooltip, registerCheckbox, registerText, error, typeInput, typeRadio, disabled, isActive}) => {
    return (
        <div className={className}>
            <TitleLabel title={title} tooltip={tooltip}/>
            <div className={s.labelBox}>
                <label className={`${s.radio} ${isActive ? s.active : ''}`}>
                    <input {...registerCheckbox} type={typeRadio ?? 'checkbox'}/>
                </label>
                <label className={`${s.label} ${error ? s.error : ''}`}>
                    <input {...registerText} type={typeInput ?? 'text'} style={{cursor: `${disabled ? 'not-allowed' : 'pointer'}`}} disabled={!!disabled}/>
                </label>
            </div>
        </div>
    );
};

export default CheckboxText;
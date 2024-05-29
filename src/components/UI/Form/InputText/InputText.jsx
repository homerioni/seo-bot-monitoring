import React from 'react';
import s from "./InputText.module.scss";
import TitleLabel from "../TitleLabel/TitleLabel";

const InputText = ({className, title, tooltip, register, error, type, disabled, placeholder}) => {
    return (
        <div className={className}>
            {title ? <TitleLabel title={title} tooltip={tooltip}/> : ''}
            <div className={s.labelBox}>
                <label className={`${s.label} ${error ? s.error : ''}`}>
                    <input type={type ?? 'text'} {...register} placeholder={placeholder} style={{cursor: `${disabled ? 'not-allowed' : 'pointer'}`}} disabled={!!disabled}/>
                    {error ? <span className={s.errorText}>{error}</span> : ''}
                </label>
            </div>
        </div>
    );
};

export default InputText;
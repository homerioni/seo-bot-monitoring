import React from 'react';
import s from './SwitchCheckbox.module.scss';
import TitleLabel from "../TitleLabel/TitleLabel";

const SwitchCheckbox = ({className, title, tooltip, registerCheckbox, registerInput, error, disabled, text, typeInput, isActive}) => {
    return (
        <div className={className}>
            <TitleLabel title={title} tooltip={tooltip}/>
            <div className={s.labelBox}>
                <label className={s.switch}>
                    <input type='checkbox' {...registerCheckbox} style={{cursor: `${disabled ? 'not-allowed' : 'pointer'}`}} disabled={!!disabled}/>
                    <span/>
                </label>
                {isActive ?
                    <p>{text}</p>
                    :
                    <label className={`${s.label} ${error ? s.error : ''}`}>
                        <input type={typeInput ?? 'text'} {...registerInput} style={{cursor: `${disabled ? 'not-allowed' : 'pointer'}`}} disabled={!!disabled}/>
                    </label>
                }
            </div>
        </div>
    );
};

export default SwitchCheckbox;
import React from 'react';
import s from './RadioBtnAndText.module.scss';
import TitleLabel from "../TitleLabel/TitleLabel";

const RadioBtnAndText = ({className, title, tooltip, register, disabled, text}) => {
    return (
        <div className={className}>
            <TitleLabel title={title} tooltip={tooltip}/>
            <div className={s.labelBox}>
                <label className={s.switch}>
                    <input type='checkbox' {...register} style={{cursor: `${disabled ? 'not-allowed' : 'pointer'}`}} disabled={!!disabled}/>
                    <span/>
                </label>
                <p>{text}</p>
            </div>
        </div>
    );
};

export default RadioBtnAndText;
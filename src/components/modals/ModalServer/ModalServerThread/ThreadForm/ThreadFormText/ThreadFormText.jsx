import React from 'react';
import s from './ThreadFormText.module.scss';

const ThreadFormText = ({className, register, title, tooltip, placeholder, inputType='text'}) => {
    return (
        <div className={className}>
            <div className={s.titleBox}>
                <p>{title}</p>
                {tooltip ?
                    <div className={s.tooltip}>
                        <p>{tooltip}</p>
                    </div> : ''}
            </div>
            <div className={s.labelBox}>
                <label className={s.label}>
                    <input {...register} placeholder={placeholder} type={inputType}/>
                </label>
            </div>
        </div>
    );
};

export default ThreadFormText;
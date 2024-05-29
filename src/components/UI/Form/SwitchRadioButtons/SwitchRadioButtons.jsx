import React from 'react';
import s from './SwitchRadioButtons.module.scss';

const SwitchRadioButtons = ({title, tooltip, className, items, register}) => {
    const listRender = items?.map(item => {
        return (
            <label key={item.val} className={`${s.label}`}>
                <input {...register} value={item.val} type="radio"/>
                <span className={s.icon}/>
                <span>{item.name}</span>
                {item.icon && <span className={s.ownerIcon}>{item.icon}</span>}
            </label>
        );
    })

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
                {listRender}
            </div>
        </div>
    );
};

export default SwitchRadioButtons;
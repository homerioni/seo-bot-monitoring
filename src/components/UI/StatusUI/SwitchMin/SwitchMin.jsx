import React from 'react';
import s from './SwitchMin.module.scss';

const SwitchMin = ({active, isBgGray}) => {
    return (
        <div className={`${s.switchMin} 
        ${active === true ? s.active : (active === false ? s.disable : '')}
        ${isBgGray ? s.gray : ''}
        `}/>
    );
};

export default SwitchMin;
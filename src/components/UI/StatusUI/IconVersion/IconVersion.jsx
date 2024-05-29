import React from 'react';
import s from './IconVersion.module.scss';

const IconVersion = ({text, className, isBgGray}) => {
    return (
        <div className={`${s.version} ${isBgGray ? s.gray : ''} ${className}`}>
            <span>{text}</span>
        </div>
    );
};

export default IconVersion;
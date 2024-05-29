import React from 'react';
import s from "./IconStatus.module.scss";

const IconStatus = ({status, className}) => {
    return (
        <div className={`${s.status} ${s[status]} ${className}`}/>
    );
};

export default IconStatus;
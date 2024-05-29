import React from 'react';
import s from "./IconPower.module.scss";

const IconPower = ({power}) => {
    return (
        <div className={`${s.power} ${power <= 100 ? s.azure : s.green}`}>
            <span>{power}</span>
        </div>
    );
};

export default IconPower;
import React from 'react';
import s from './Header.module.scss';

const ConfigPcHeader = ({qty}) => {
    return (
        <div className={s.main}>
            <div>
                <div className={s.titleBox}>
                    <p className={s.title}>
                        <span>Комплектующие</span>
                        <sup>{qty}</sup>
                    </p>
                </div>
            </div>
            <div></div>
        </div>
    );
};

export default ConfigPcHeader;
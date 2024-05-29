import React from 'react';
import s from './ModalVersionInfo.module.scss'

const ModalVersionInfo = ({percent}) => {
    return (
        <div className={s.main}>
            <div className={s.textBox}>
                <span className={s.percent}>{percent}%</span>
            </div>
            <div className={s.line} style={{'--percent': `${percent}%`}}/>
        </div>
    );
};

export default ModalVersionInfo;
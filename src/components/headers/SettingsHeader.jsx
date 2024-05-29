import React from 'react';
import s from "./Header.module.scss";

const SettingsHeader = () => {
    return (
        <div className={`${s.main} ${s.settings}`}>
            <div>
                <p className={s.title}>
                    <span>Настройки серверов</span>
                </p>
            </div>
        </div>
    );
};

export default SettingsHeader;
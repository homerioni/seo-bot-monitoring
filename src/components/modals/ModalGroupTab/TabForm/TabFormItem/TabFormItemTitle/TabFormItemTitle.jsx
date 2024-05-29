import React from 'react';
import s from "./TabFormItemTitle.module.scss";

const TabFormItemTitle = () => {
    return (
        <div className={s.titleBox}>
            <p>выберите сервера</p>
            <div className={s.tooltip}>
                <p>Выберите сервера которые будут состоять в данной группе.</p>
            </div>
        </div>
    );
};

export default TabFormItemTitle;
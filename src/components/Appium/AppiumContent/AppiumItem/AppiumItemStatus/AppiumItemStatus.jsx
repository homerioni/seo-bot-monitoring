import React from 'react';
import s from './AppiumItemStatus.module.scss';

const AppiumItemStatus = () => {
    return (
        <div className={`${s.statusBox} ${s['NON_ACTIVE']}`}>
            <div className={s.status}/>
            <div className={s.statusDate}>12.01<br/>10:54</div>
        </div>
    );
};

export default AppiumItemStatus;
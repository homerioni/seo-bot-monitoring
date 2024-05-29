import React from 'react';
import s from './AppiumStatActionInfo.module.scss';
import {appiumSelectIcons} from "../../../../AppiumTools";

const AppiumStatActionInfo = ({serviceActive}) => {
    return (
        <div className={s.main}>
            <div className={s.minStat}>
                {Array.from({length: 10}, (e, i) =>
                    <div key={i} style={{'--percent': `${Math.round(Math.random() * 100)}`}}/>)}
            </div>
            <div className={s.maxStat}>
                <div className={s.headerStat}>
                    {appiumSelectIcons[serviceActive].icon}
                    <span>{appiumSelectIcons[serviceActive].text}</span>
                </div>
                <div className={s.contentStat}>
                    {Array.from({length: 10}, (e, i) => (
                        <div key={i} className={s.contentStatItem}>
                            <div>{Math.round(Math.random() * 30)}</div>
                            <div style={{'--percent': `${Math.round(Math.random() * 100)}`}}/>
                        </div>
                    ))}
                </div>
                <div className={s.footerStat}>
                    {Array.from({length: 11}, (e, i) => <div key={i}>{i * 100}</div>)}
                </div>
            </div>
        </div>
    );
};

export default AppiumStatActionInfo;
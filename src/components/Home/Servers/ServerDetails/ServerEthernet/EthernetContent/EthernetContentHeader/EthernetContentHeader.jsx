import React from 'react';
import s from './EthernetContentHeader.module.scss'
import {convertMsToMinute} from "../../../../../../../utils/tools";

const EthernetContentHeader = ({filteredStatistic}) => {
    const lte = filteredStatistic.typesTime.lte;
    const ethernet = filteredStatistic.typesTime.ethernet;
    const off = filteredStatistic.typesTime.off;
    let fullTime = lte + ethernet + off;
    fullTime = fullTime === 0 ? 1 : fullTime;

    return (
        <div className={s.header}>
            <p>Детализация за сутки:</p>
            <div className={s.infoBox}>
                <div className={s.info}>
                    <i/>
                    <b>{(lte / fullTime * 100).toFixed(0)}%</b>
                    <span>{convertMsToMinute(lte)} мин</span>
                </div>
                <div className={s.info}>
                    <i/>
                    <b>{(ethernet / fullTime * 100).toFixed(0)}%</b>
                    <span>{convertMsToMinute(ethernet)} мин</span>
                </div>
                <div className={s.info}>
                    <i/>
                    <b>{(off / fullTime * 100).toFixed(0)}%</b>
                    <span>{convertMsToMinute(off)} мин</span>
                </div>
            </div>
        </div>
    );
};

export default EthernetContentHeader;
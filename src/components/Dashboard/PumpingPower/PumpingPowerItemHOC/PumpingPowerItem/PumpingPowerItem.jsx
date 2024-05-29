import React from 'react';
import s from './PumpingPowerItem.module.scss';
import {pumpingPowerConfigGet} from "../../../dashboardTools";

const PumpingPowerItem = ({sortType, searchData, stats}) => {
    const config = pumpingPowerConfigGet(stats.server);
    const statNum = sortType === 'AVERAGE' ? stats?.average : sortType === 'MAX' ? stats?.max : stats?.min;
    const searchResult = !!searchData && stats.server?.name.toLowerCase().includes(searchData.toLowerCase());

    return (
        <div className={`${s.item} ${searchResult ? s.active : ''}`} style={{order: statNum * -1 || 0, display: stats ? '' : 'none'}}>
            <p>{statNum}</p>
            <p>{stats.server.name}</p>
            <p>
                {config.qtyCpu > 0 ? <>
                    {config.qtyCpu > 1 ? <span className={s.qty} style={{opacity: 1}}>
                        x<b>{config.qtyCpu}</b>
                    </span> : ''}
                    <span>{config.cpuName} {config.valueRam}Gb</span>
                </> : ''}
            </p>
            <p>{stats.server.location?.name}</p>
            <p>{stats.server.connectionType}</p>
        </div>
    );
};

export default PumpingPowerItem;
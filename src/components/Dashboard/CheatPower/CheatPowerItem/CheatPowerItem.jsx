import React, {useMemo} from 'react';
import s from './CheatPowerItem.module.scss'
import {pumpingPowerConfigGet} from "../../dashboardTools";

const CheatPowerItem = ({data, projects, searchData}) => {
    const config = pumpingPowerConfigGet(data.server);
    const isSearchIncludes = !!searchData && data?.server.name.toLowerCase().includes(searchData.toLowerCase());

    const projectsList = useMemo(() => {
        const list = projects.data?.result
            .filter(project => project.settingResponse.servers.find(item => item.serverId === data.server.id))
            .map(project => project.name);

        if (list?.length > 1) {
            let arr;

            if (list[0].length + list[1].length > 16) {
                arr = [list.shift()];
            } else {
                arr = [list.shift(), list.shift()];
            }

            return [[...arr], [...list]];
        }

        return [[...list], []];
    }, [projects.data, data?.server.id])

    return (
        <div className={`${s.item} ${isSearchIncludes ? s.active : ''}`}>
            <p>{Math.abs(data?.count).toLocaleString()}</p> {/* Math.abs() число по модулю временно стоит, с бэка приходи почемуто минус число */}
            <p>{data?.server.name}</p>
            <p>
                {config.qtyCpu > 1 ?
                    <span className={s.qty}>
                        x<b>{config.qtyCpu}</b>
                    </span> : ''}
                <span>{config.cpuName} {config.valueRam}Gb</span>
            </p>
            <p>{data?.server.location?.name ?? '-'}</p>
            <p>{data?.server.connectionType ? data?.server.connectionType : '-'}</p>
            <p>{data?.server.internetProvider ? data?.server.internetProvider : '-'}</p>
            <p>{data?.server.routerName ? data?.server.routerName : '-'}</p>
            <div className={s.projects}>
                {projectsList ?
                    <>
                        <div>{projectsList[0].join(', ')}</div>
                        {projectsList[1].length ?
                            <div className={s.hideBox}>
                                <p>+{projectsList[1].length}</p>
                                <ul className={s.hideList}>
                                    {projectsList[1].map(item => <li key={item}>{item}</li>)}
                                </ul>
                            </div> : ''}
                    </> : '-'}
            </div>
        </div>
    );
};

export default CheatPowerItem;
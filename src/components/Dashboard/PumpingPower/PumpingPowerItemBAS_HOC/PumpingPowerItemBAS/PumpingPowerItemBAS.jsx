import React, {useContext, useEffect, useState} from 'react';
import s from './PumpingPowerItemBAS.module.scss';
import {pumpingPowerConfigGet} from "../../../dashboardTools";
import {PMService} from "../../../../../API/PMService";
import {useQuery, useQueryClient} from "react-query";
import {defaultCatch} from "../../../../../utils/tools";
import {AlertContext} from "../../../../../App";

const PumpingPowerItemBAS = ({server, sortType, searchData, qtyDaysStat, dates}) => {
    const addAlert = useContext(AlertContext);
    const [stats, setStats] = useState(null);
    const isCycle = useQuery(`serverCycle${server.id}`,
        () => PMService.performanceCycle.get(server.id),
        {keepPreviousData: true, refetchOnWindowFocus: false, retry: false, onError: () => {}});

    useEffect(() => {
        if (isCycle.data) {
            setStats(null);

            const timer = setTimeout(() => {
                const datesData = dates ?? {
                    endDate: new Date(Date.now() - 86400000).toISOString().slice(0,10),
                    startDate: new Date(Date.now() - 86400000 - (qtyDaysStat*24*60*60*1000)).toISOString().slice(0,10)
                };

                PMService.performanceCycle.statistics(datesData.startDate, datesData.endDate, sortType, [server.id]).then(resp => {
                    setStats(resp);
                }).catch(e => defaultCatch(e, addAlert));
            }, 1000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [qtyDaysStat, dates, sortType, isCycle.data]);

    const config = pumpingPowerConfigGet(server);
    const searchResult = !!searchData && server?.name.toLowerCase().includes(searchData.toLowerCase());

    return (
        <>
            {isCycle.data &&
                <div className={`${s.item} ${searchResult ? s.active : ''}`} style={{order: stats?.result[0]?.result[0]?.number * -1 || 0, display: !stats ? 'none' : ''}}>
                    <p>{stats?.result[0]?.result[0]?.number || 0}</p>
                    <p>{server.name}</p>
                    <p>
                        {config.qtyCpu > 0 ? <>
                            {config.qtyCpu > 1 ?
                                <span className={s.qty} style={{opacity: 1}}>
                                    x<b>{config.qtyCpu}</b>
                                </span> : ''}
                            <span>{config.cpuName} {config.valueRam}Gb</span>
                        </> : ''}
                    </p>
                    <p>{server.location?.name}</p>
                    <p>{server.connectionType}</p>
                </div>
            }
        </>
    );
};

export default PumpingPowerItemBAS;
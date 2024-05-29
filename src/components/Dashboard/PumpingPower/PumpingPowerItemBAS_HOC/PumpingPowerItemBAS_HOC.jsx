import React, {useContext, useEffect, useState} from 'react';
import PumpingPowerItem from "../PumpingPowerItemHOC/PumpingPowerItem/PumpingPowerItem";
import {PMService} from "../../../../API/PMService";
import {defaultCatch} from "../../../../utils/tools";
import {AlertContext} from "../../../../App";

const PumpingPowerItemBasHoc = ({servers, selectedConfigs, configs, searchData, sortType, configFilter, qtyDaysStat, dates, serversIsHaveBAS}) => {
    const addAlert = useContext(AlertContext);
    const [stats, setStats] = useState(null);

    useEffect(() => {
        setStats(null);
        let arr = [];
        const cycleServerIdsList = serversIsHaveBAS.data?.result.map(e => e.serverId);

        if (configFilter && configFilter != 1) {
            arr = configs[configFilter].servers;
        } else {
            for (let key in configs) {
                if (!selectedConfigs.includes(key)) arr = [...arr, ...configs[key].servers];
            }
        }

        arr = arr.filter(e => cycleServerIdsList?.includes(e.id));

        if (arr?.length) {
            const reqData = {
                endAt: dates?.endDate ?? new Date().toISOString().slice(0, 10),
                startAt: dates?.startDate ?? new Date(Date.now() - 86400000 * qtyDaysStat).toISOString().slice(0, 10),
                mode: [sortType],
                serverIds: arr.map(e => e.id),
            }

            PMService.performanceCycle.statistics(reqData).then(resp => {
                if (resp.result[0]) {
                    const arrStats = resp.result[0].result.map(stat => {
                        const data = {
                            server: stat.server
                        };
                        data[resp.result[0].mode.toLowerCase()] = stat.number;

                        return data;
                    });

                    setStats(arrStats);
                }
            }).catch(e => defaultCatch(e, addAlert));
        }
    }, [servers.data, configFilter, selectedConfigs, dates, qtyDaysStat, sortType, serversIsHaveBAS.data]);

    return (
        <>
            {stats?.map(stat => stat.server && <PumpingPowerItem key={stat.server?.id} stats={stat} searchData={searchData} sortType={sortType}/>)}
        </>
    );
};

export default PumpingPowerItemBasHoc;
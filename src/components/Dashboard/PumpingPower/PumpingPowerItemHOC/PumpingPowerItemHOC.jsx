import React, {useEffect, useState} from 'react';
import PumpingPowerItem from "./PumpingPowerItem/PumpingPowerItem";
import {PMService} from "../../../../API/PMService";

const PumpingPowerItemHoc = ({configFilter, qtyDaysStat, dates, servers, selectedConfigs, configs, searchData, sortType}) => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        let arr = [];

        if (configFilter && configFilter != 1) {
            arr = configs[configFilter].servers;
        } else {
            for (let key in configs) {
                if (!selectedConfigs.includes(key)) arr = [...arr, ...configs[key].servers];
            }
        }

        if (arr?.length) {
            const qtyDays = dates?.qtyDays ?? qtyDaysStat;
            const endDate = dates?.endDate ? new Date(dates.endDate) : Date.now() - 86400000;
            const datesArr = Array.from({length: qtyDays}, (e, i) => new Date(endDate - i*24*60*60*1000).toISOString().slice(0, 10));
            const reqData = {
                items: arr?.map(server => {
                    return {
                        id: server.id, requestPeriods: datesArr.map(date => {
                            return {endDate: date, startDate: date}
                        })
                    }
                })
            }

            PMService.statistics.server(reqData).then(resp => {
                const arrStats = resp.result.map(stat => {
                    const data = {
                        average: 0,
                        min: 0,
                        max: 0,
                        server: arr.find(el => el.id === stat.serverId)
                    };
                    let sum = 0;

                    stat.deliveryStatistics?.result?.forEach((item, i) => {
                        const profQty = item.numberOfSuccess;
                        sum += profQty;

                        if (i === 0) {
                            data.max = profQty;
                            data.min = profQty;
                        }

                        if (profQty > data.max) data.max = profQty;
                        if (profQty < data.min) data.min = profQty;
                    });

                    data.average = Math.floor(sum / stat?.deliveryStatistics?.result?.length);

                    return data;
                });

                setStats(arrStats);
            });
        }
    }, [servers.data, configFilter, selectedConfigs, dates, qtyDaysStat]);

    return (
        <>
            {stats?.map(stat => <PumpingPowerItem key={stat.server.id} stats={stat} searchData={searchData} sortType={sortType}/>)}
        </>
    );
};

export default PumpingPowerItemHoc;
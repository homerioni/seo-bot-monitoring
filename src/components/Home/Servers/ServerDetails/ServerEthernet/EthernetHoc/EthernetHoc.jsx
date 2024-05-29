import React, {useMemo, useState} from 'react';
import EthernetContent from "../EthernetContent/EthernetContent";
import EthernetDetails from "../EthernetDetails/EthernetDetails";
import {getTimeString} from "../../../../../../utils/tools";
import {useQuery} from "react-query";
import {PMService} from "../../../../../../API/PMService";
import Loading from "../../../../../UI/Loading/Loading";

const EthernetHoc = ({testSettings, date}) => {
    const [activeTime, setActiveTime] = useState(null);
    const statistic = useQuery(`testConnectionStat${date}`,
        () => testSettings.data ? PMService.testConnection.getStatistic(testSettings.data?.result.id, date) : null);

    const filteredStatistic = useMemo(() => {
        const filteredArr = [];
        const statisticArr = {
            typesTime: {lte: 0, ethernet: 0, off: 0},
            data: Array.from({length: 24}, () =>
                Array.from({length: 12}, () => [])
            )};
        const data = statistic.data?.result.data;
        const interval = testSettings.data?.result.interval * 1000;

        if (data?.length) data.forEach((item, index, dataArr) => {
            if (index === 0) return;
            const dateTime = new Date(item.dateTime);
            const prevDateTime = new Date(dataArr[index - 1].dateTime);
            const prevType = dataArr[index - 1].type;
            const timeDif = dateTime - prevDateTime;
            const qtyInterval = timeDif / interval;

            if (qtyInterval > 2) {
                statisticArr.typesTime.off += timeDif;
                for (let i = 0; i < Math.floor(qtyInterval); i++) {
                    const thisTime = Number(prevDateTime) + i * interval;
                    if (i === 0) {
                        filteredArr.push({time: getTimeString(thisTime), type: prevType});
                    } else {
                        filteredArr.push({time: getTimeString(thisTime), type: 'OFF'});
                    }
                }
            } else {
                prevType === 'CONNECTED_4G' ? statisticArr.typesTime.lte += timeDif : statisticArr.typesTime.ethernet += timeDif;
                filteredArr.push({time: getTimeString(prevDateTime), type: prevType});
            }
        });

        if (filteredArr.length) filteredArr.forEach((el) => {
            const hourIndex = Number(el.time.slice(0, 2));
            const minuteIndex = Math.floor(el.time.slice(3, 5) / 5);

            statisticArr.data[hourIndex][minuteIndex].push(el);
        });

        return statisticArr;
    }, [statistic]);

    return (
        <>
            {statistic.isLoading ? <Loading/> : ''}
            <EthernetContent activeTime={activeTime} setActiveTime={setActiveTime} filteredStatistic={filteredStatistic}/>
            {activeTime !== null ? <EthernetDetails interval={testSettings.data?.result.interval} activeTime={activeTime} filteredStatistic={filteredStatistic}/> : ''}
        </>
    );
};

export default EthernetHoc;
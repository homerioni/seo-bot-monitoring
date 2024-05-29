import React, {useMemo} from 'react';
import s from "../GroupStat.module.scss";
import Loading from "../../../UI/Loading/Loading";
import GroupStatListItem from "./GroupStatListItem";
import {useQuery} from "react-query";
import {PMService} from "../../../../API/PMService";
import GroupStatItemHeader from "./GroupStatItemHeader";

const GroupStatItem = ({title, days, stats, setModalStat, id}) => {
    const index = days === 1 ? 0 : days === 10 ? 1 : 2;
    const deliveryStatistics = stats.data?.result[0].deliveryStatistics.result[index].settings;
    const receiptStatistics = stats.data?.result[0].receiptStatistics.result[index].settings;
    const statsEachDayData = useMemo(() => {
        const dateNow = Date.now();
        let arrDates = [];
        for (let i = 0; i < days; i++) {
            const startDate = (new Date(dateNow - i * 24 * 3600000)).toJSON().slice(0, 10);
            arrDates.push({startDate: startDate, endDate: startDate});
        }
        return arrDates;
    }, [days]);

    const statsEachDay = useQuery(`statsEachDay${days}`,
        () => PMService.statistics.group({items: [{id, requestPeriods: statsEachDayData}]}),
        {keepPreviousData: true, refetchOnWindowFocus: false});

    return (
        <div className={s.item}>
            {stats.isLoading ? <Loading/> : ''}
            <GroupStatItemHeader title={title} days={days} setModalStat={setModalStat} statsEachDay={statsEachDay}/>
            <div className={s.infoBox}>
                <div className={`${s.icon} ${s.purple}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.4414 14.62L20.0014 12.06L17.4414 9.5" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9.76172 12.06H19.9317" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M11.7617 20C7.34172 20 3.76172 17 3.76172 12C3.76172 7 7.34172 4 11.7617 4" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <ul className={s.list}>
                    {deliveryStatistics?.map(item => <GroupStatListItem key={item.settingsTypeId} data={item} days={days}/>)}
                </ul>
            </div>
            <div className={s.infoBox}>
                <div className={`${s.icon} ${s.green}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.6797 14.62L14.2397 12.06L11.6797 9.5" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4 12.06H14.17" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 4C16.42 4 20 7 20 12C20 17 16.42 20 12 20" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <div className={s.list}>
                    {receiptStatistics?.map(item => <GroupStatListItem key={item.settingsTypeId} data={item} days={days}/>)}
                </div>
            </div>
        </div>
    );
};

export default GroupStatItem;
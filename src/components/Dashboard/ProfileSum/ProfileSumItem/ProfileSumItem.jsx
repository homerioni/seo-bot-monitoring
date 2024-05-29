import React, {useEffect, useMemo} from 'react';
import s from './ProfileSumItem.module.scss';
import ProfileSumItemHeader from "./ProfileSumItemHeader/ProfileSumItemHeader";
import ProfileSumItemGraph from "./ProfileSumItemGraph/ProfileSumItemGraph";
import {useQuery} from "react-query";
import {PMService} from "../../../../API/PMService";
import {statsEachDayData} from "../../dashboardTools";
import Loading from "../../../UI/Loading/Loading";

const ProfileSumItem = ({id, color, name, setGroupsStatData, profSumGroups}) => {
    const statsEachDay = useQuery(`statsEachDayTen${id}`,
        () => PMService.statistics.group({items: [{id, requestPeriods: statsEachDayData(10)}]}),
        {keepPreviousData: true, refetchOnWindowFocus: false});

    const average = useMemo(() => {
        let sum = 0;
        statsEachDay.data?.result[0].deliveryStatistics?.result?.forEach(item => {
            sum += item.numberOfSuccess;
        });
        return Math.floor(sum / 10);
    }, [statsEachDay.data]);

    useEffect(() => {
        setGroupsStatData(prev => [...prev, {id, name, color, result: statsEachDay.data?.result[0].deliveryStatistics?.result}]);

        return () => setGroupsStatData(prev => prev.filter(el => el.id !== id));
    }, [statsEachDay.data, profSumGroups]);

    return (
        <div className={s.main} style={{'--color': color}}>
            {statsEachDay.isLoading && <Loading/>}
            <ProfileSumItemHeader average={average} name={name}/>
            <ProfileSumItemGraph statsEachDayData={statsEachDay.data?.result[0].deliveryStatistics?.result}/>
        </div>
    );
};

export default ProfileSumItem;
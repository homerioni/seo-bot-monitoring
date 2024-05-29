import React, {useMemo} from 'react';
import s from './ProfileSumPie.module.scss';
import ProfileSumItemHeader from "../ProfileSumItem/ProfileSumItemHeader/ProfileSumItemHeader";
import ProfileSumPieGraph from "./ProfileSumPieGraph/ProfileSumPieGraph";

const ProfileSumPie = ({groups, servers, days, isNotAverage, groupsStatData}) => {
    const average = useMemo(() => {
        if (!isNotAverage) {
            let sum = 0;
            groupsStatData?.forEach(item => {
                item.result?.forEach(el => {
                    sum += el.numberOfSuccess;
                });
            });
            return Math.floor(sum / days);
        }
    }, [groupsStatData]);

    return (
        <div className={s.main}>
            <ProfileSumItemHeader name={days === 1 ? 'За сегодня' : `За ${days} дней`} average={average}/>
            <ProfileSumPieGraph groupsStatData={groupsStatData} groups={groups} servers={servers}/>
        </div>
    );
};

export default ProfileSumPie;
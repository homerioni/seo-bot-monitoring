import React, {useState} from 'react';
import s from './ProfileSum.module.scss';
import ProfileSumHeader from "./ProfileSumHeader";
import ProfileSumItem from "./ProfileSumItem/ProfileSumItem";
import ProfileSumPie from "./ProfileSumPie/ProfileSumPie";
import {dashboardColors} from "../dashboardTools";
import EmptyData from "../../UI/EmptyData/EmptyData";

const ProfileSum = ({profSumGroups, setModalProfSum, groups, servers}) => {
    const [groupsStatData, setGroupsStatData] = useState([]);

    return (
        <div className={s.main}>
            <ProfileSumHeader setModalProfSum={setModalProfSum}/>
            {profSumGroups?.length && !!profSumGroups[0] ? <div className={s.content}>
                <div>
                    {profSumGroups?.map((item, i) =>
                        <ProfileSumItem key={item}
                                        id={item}
                                        profSumGroups={profSumGroups}
                                        color={dashboardColors[i % 14]}
                                        name={groups.data?.result.find(el => el.id == item)?.name}
                                        setGroupsStatData={setGroupsStatData}/>)}
                </div>
                <div>
                    <ProfileSumPie groups={groups}
                                   servers={servers}
                                   days={1}
                                   groupsStatData={groupsStatData?.map(el => {
                                       return {...el, result: el.result ? [el.result[0]] : null}
                                   })}
                                   isNotAverage={true}/>
                    <ProfileSumPie groups={groups}
                                   servers={servers}
                                   days={10}
                                   groupsStatData={groupsStatData}/>
                </div>
            </div> : <EmptyData>Группы не выбраны</EmptyData>}
        </div>
    );
};

export default ProfileSum;
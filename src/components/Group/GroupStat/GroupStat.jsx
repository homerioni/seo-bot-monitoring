import React from 'react';
import s from './GroupStat.module.scss';
import GroupStatItem from "./GroupStatItem/GroupStatItem";
import {useQuery} from "react-query";
import {PMService} from "../../../API/PMService";

const GroupStat = ({id, setModalStat}) => {
    const stats = useQuery(`stats1Group${id}`, () => PMService.statistics.group({items: [{id}]}), {keepPreviousData: true});

    return (
        <div className={s.content}>
            <GroupStatItem title={'За сегодня'} stats={stats} days={1} setModalStat={setModalStat} id={id}/>
            <GroupStatItem title={'За 10 дней'} stats={stats} days={10} setModalStat={setModalStat} id={id}/>
            <GroupStatItem title={'За 30 дней'} stats={stats} days={30} setModalStat={setModalStat} id={id}/>
        </div>
    );
};

export default GroupStat;
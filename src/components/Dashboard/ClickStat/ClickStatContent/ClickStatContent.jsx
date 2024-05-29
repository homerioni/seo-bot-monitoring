import React, {useEffect} from 'react';
import s from './ClickStatContent.module.scss';
import Loading from "../../../UI/Loading/Loading";
import ClickStatProject from "./ClickStatProject";
import {useQuery, useQueryClient} from "react-query";
import {ProjectsAPI} from "../../../../API/ProjectsAPI";

const dateNow = new Date();
const dateArr = Array.from({length: 15}, (e, i) => {
    if (i !== 0) dateNow.setDate(dateNow.getDate() - 1);
    return dateNow.toISOString().slice(0, 10);
});

const ClickStatContent = ({projectsIds, searchData}) => {
    const queryClient = useQueryClient();
    const projectClickStat = useQuery(`projectClickStat`,
        () => ProjectsAPI.statisticClick.getDaysStat(projectsIds, dateArr[14], dateArr[0]),
        {keepPreviousData: true, refetchOnWindowFocus: false, onError: () => {}});

    useEffect(() => {
        queryClient.invalidateQueries('projectClickStat');
    }, [projectsIds]);

    return (
        <div className={s.main}>
            <div className={s.header}>
                <p>Проект</p>
                {dateArr.map((el, i) => <p key={i}>{el.slice(8, 10)}.{el.slice(5, 7)}</p>)}
            </div>
            <div className={s.content}>
                {projectClickStat.isLoading && <div style={{height: '12rem'}}><Loading/></div>}
                {projectClickStat.data?.result?.map(project => {
                    return <ClickStatProject key={project.projectId} project={project} dateArr={dateArr} searchData={searchData}/>
                })}
            </div>
        </div>
    );
};

export default ClickStatContent;
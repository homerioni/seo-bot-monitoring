import React, {useMemo} from 'react';
import s from './ClickStatContent.module.scss';

const ClickStatProject = ({project, dateArr, searchData}) => {
    const projectData = useMemo(() => {
        const data = {};
        project?.data?.forEach(el => data[el.date.slice(8, 10)] = el.count);
        return data;
    }, [project]);

    return (
        <div className={`${s.item} ${!!searchData && project.projectName.toUpperCase().includes(searchData.toUpperCase()) ? s.active : ''}`}>
            <p>{project.projectName}</p>
            {dateArr.map((date, i) => {
                return <p key={i}>{projectData ? projectData[date.slice(8, 10)] ?? '-' : '-'}</p>
            })}
        </div>
    );
};

export default ClickStatProject;
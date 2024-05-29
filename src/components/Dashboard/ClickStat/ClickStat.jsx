import React, {useMemo, useState} from 'react';
import s from './ClickStat.module.scss';
import ClickStatHeader from "./ClickStatHeader";
import ClickStatContent from "./ClickStatContent/ClickStatContent";

const ClickStat = ({projects}) => {
    const [searchData, setSearchData] = useState('');
    const projectsIds = useMemo(() => projects.data?.result?.map(project => project.id), [projects.data]);

    return (
        <div className={s.main}>
            <ClickStatHeader searchData={searchData} setSearchData={setSearchData}/>
            {projectsIds && <ClickStatContent projectsIds={projectsIds} searchData={searchData}/>}
        </div>
    );
};

export default ClickStat;
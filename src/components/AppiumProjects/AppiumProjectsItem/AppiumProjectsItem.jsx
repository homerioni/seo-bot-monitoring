import React from 'react';
import s from './AppiumProjectsItem.module.scss';
import iconProject from "../../../assets/img/project-icon.svg";
import SwitchBtn from "../../UI/StatusUI/SwitchBtn/SwitchBtn";
import EditBtn from "../../headers/EditBtn/EditBtn";
import DelBtn from "../../headers/DelBtn/DelBtn";

const AppiumProjectsItem = ({data, setModalProjects, onDel}) => {
    return (
        <div className={s.main}>
            <div className={s.name}>
                <div className={s.icon}>
                    <img src={iconProject} alt=""/>
                </div>
                <p>{data.name}</p>
            </div>
            <p>{data.domain}</p>
            <p>{data.regionNumber}</p>
            <div className={s.switchBox}>
                <SwitchBtn active={data.priorityType === 'PRIORITY'}/>
            </div>
            <EditBtn onClick={() => setModalProjects({isOpen: true, data})}/>
            <DelBtn onClick={() => onDel(data)}/>
        </div>
    );
};

export default AppiumProjectsItem;
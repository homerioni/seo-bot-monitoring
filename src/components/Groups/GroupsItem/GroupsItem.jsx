import React from 'react';
import s from './GroupsItem.module.scss';
import groupBg from '../../../assets/img/group-bg.svg';
import {NavLink} from "react-router-dom";
import GroupsItemButtons from "./GroupsItemButtons";

const GroupsItem = ({data, setModalGroup, setModalConfirm}) => {
    return (
        <div className={s.main}>
            <NavLink to={`/groups/${data.id}`} className={s.link}/>
            <div className={s.bg}>
                <img src={groupBg} alt=""/>
            </div>
            <div className={s.header}>
                <div className={s.qty}>
                    <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.6355 1.83334H8.06093C5.95539 1.83334 4.25 3.47417 4.25 5.5V12.1458C4.25 12.65 4.67873 13.0625 5.20273 13.0625H19.4937C20.0177 13.0625 20.4465 12.65 20.4465 12.1458V5.5C20.4465 3.47417 18.7411 1.83334 16.6355 1.83334Z" fill="#88D0FA"/>
                        <path d="M4.25 15.3542V16.5C4.25 18.5258 5.95539 20.1667 8.06093 20.1667H16.6355C18.7411 20.1667 20.4465 18.5258 20.4465 16.5V15.3542C20.4465 14.85 20.0177 14.4375 19.4937 14.4375H5.20273C4.67873 14.4375 4.25 14.85 4.25 15.3542ZM17.312 17.8383C17.1309 18.0033 16.8832 18.1042 16.6355 18.1042C16.3878 18.1042 16.1401 18.0033 15.9591 17.8383C15.7876 17.6642 15.6828 17.4258 15.6828 17.1875C15.6828 16.9492 15.7876 16.7108 15.9591 16.5367C16.3116 16.1975 16.9499 16.1975 17.312 16.5367C17.4835 16.7108 17.5883 16.9492 17.5883 17.1875C17.5883 17.4258 17.4835 17.6642 17.312 17.8383Z" fill="#88D0FA"/>
                    </svg>
                    <span>{data.servers.length}</span>
                </div>
                <div className={s.power}>
                    <span>{data.sumOfThreads}</span>
                </div>
            </div>
            <div className={s.content}>
                <p className={s.name}>{data.name}</p>
                <GroupsItemButtons setModalGroup={setModalGroup} setModalConfirm={setModalConfirm} data={data}/>
            </div>
        </div>
    );
};

export default GroupsItem;
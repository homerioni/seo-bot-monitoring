import React from 'react';
import s from './Header.module.scss';
import BackLink from "./BackLink/BackLink";
import {routeNames} from "../../router/routeNames";

const DashboardHeader = () => {
    return (
        <div className={s.main}>
            <div>
                <BackLink src={routeNames.main}/>
                <div className={s.grayBoxTitle}>
                    <p>MB Dashboard</p>
                </div>
            </div>
            <div></div>
        </div>
    );
};

export default DashboardHeader;
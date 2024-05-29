import React from 'react';
import s from './DashLogsContent.module.scss';
import DashLogsItem from "./DashLogsItem/DashLogsItem";

const DashLogsContent = () => {
    return (
        <div className={s.main}>
            <div className={s.content}>
                <p className={s.title}>новые</p>
                <div className={s.list}>
                    <DashLogsItem/>
                    <DashLogsItem/>
                </div>
            </div>
            <div className={s.content}>
                <p className={`${s.title} ${s.gray}`}>сегодня</p>
                <div className={s.list}>
                    <DashLogsItem/>
                    <DashLogsItem/>
                    <DashLogsItem/>
                    <DashLogsItem/>
                    <DashLogsItem/>
                </div>
            </div>
        </div>
    );
};

export default DashLogsContent;
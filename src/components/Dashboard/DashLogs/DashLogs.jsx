import React from 'react';
import s from './DashLogs.module.scss';
import DashLogsHeader from "./DashLogsHeader";
import DashLogsContent from "./DashLogsContent/DashLogsContent";

const DashLogs = () => {
    return (
        <div className={s.main}>
            <DashLogsHeader/>
            <DashLogsContent/>
        </div>
    );
};

export default DashLogs;
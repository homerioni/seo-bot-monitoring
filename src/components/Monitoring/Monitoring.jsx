import React from 'react';
import s from './Monitoring.module.scss';
import MonitorHeader from "./MonitorHeader/MonitorHeader";
import MonitorItem from "./MonitorItem/MonitorItem";

const Monitoring = ({statistics}) => {
    return (
        <div className={s.main}>
            <div>
                <MonitorHeader type={'delivery'}/>
                {statistics?.result[0].deliveryStatistics.result.map((item, i) => <MonitorItem key={i} data={item} isAverage={i !== 0}/>)}
            </div>
            <div>
                <MonitorHeader type={'receipt'}/>
                {statistics?.result[0].receiptStatistics.result.map((item, i) => <MonitorItem key={i} data={item} isAverage={i !== 0}/>)}
            </div>
        </div>
    );
};

export default Monitoring;
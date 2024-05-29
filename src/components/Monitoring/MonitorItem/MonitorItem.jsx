import React, {useState} from 'react';
import s from './MonitorItem.module.scss';
import MonitorItemHeader from "./MonitorItemHeader/MonitorItemHeader";
import MonitorWrapper from "./MonitorWrapper/MonitorWrapper";

const MonitorItem = ({data, isAverage}) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className={s.main}>
            <MonitorItemHeader data={data} isAverage={isAverage} setIsOpen={setIsOpen} isOpen={isOpen}/>
            <MonitorWrapper data={data} isAverage={isAverage} isOpen={isOpen}/>
        </div>
    );
};

export default MonitorItem;
import React from 'react';
import s from './EthernetContentItems.module.scss';
import EthernetContentItem from "./EthernetContentItem";

const EthernetContentItems = ({activeTime, setActiveTime, filteredStatistic}) => {
    return (
        <div className={s.main}>
            {filteredStatistic?.data.map((item, i) =>
                <EthernetContentItem key={i} hourData={item} index={i} activeTime={activeTime} setActiveTime={setActiveTime}/>)}
        </div>
    );
};

export default EthernetContentItems;
import React from 'react';
import s from "./EthernetDetailsItems.module.scss";
import EthernetDetailsItem from "./EthernetDetailsItem";

const EthernetDetailsItems = ({activeTime, filteredStatistic}) => {
    return (
        <div className={s.main}>
            {filteredStatistic.data[activeTime].map((item, i) => <EthernetDetailsItem key={i} dateArr={item} index={i}/>)}
        </div>
    );
};

export default EthernetDetailsItems;
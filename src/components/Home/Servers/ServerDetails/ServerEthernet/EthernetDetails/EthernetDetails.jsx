import React from 'react';
import s from './EthernetDetails.module.scss';
import EthernetDetailsItems from "./EthernetDetailsItems/EthernetDetailsItems";

const EthernetDetails = ({activeTime, filteredStatistic, interval}) => {
    return (
        <div>
            <div className={s.content}>
                <div className={s.header}>
                    <p>Детализация за час:</p>
                    <p>
                        <span>Интервал: </span>
                        <span>5 мин по {interval} сек</span>
                    </p>
                </div>
                <EthernetDetailsItems activeTime={activeTime} filteredStatistic={filteredStatistic}/>
            </div>
        </div>
    );
};

export default EthernetDetails;
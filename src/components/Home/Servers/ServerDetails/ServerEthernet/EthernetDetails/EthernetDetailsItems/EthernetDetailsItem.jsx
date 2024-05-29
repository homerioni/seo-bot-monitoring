import React, {useRef} from 'react';
import s from "./EthernetDetailsItems.module.scss";

const DataItem = ({item}) => {
    const tooltip = useRef(null);
    let background = '#A1B1C5';
    let typeText = 'Нет связи';
    switch (item.type) {
        case 'CONNECTED_4G': background = '#87D449'; typeText = '4G'; break;
        case 'CONNECTED_ETHERNET': background = '#5BC2FF'; typeText = 'Ethernet'; break;
    }

    return (
        <div className={s.item} ref={tooltip}>
            <div className={s.line} style={{background: background}}/>
            <div className={s.status}>
                <p>{item.time}</p>
                <div>
                    <i style={{background: background}}/> {typeText}
                </div>
            </div>
        </div>
    );
};

const EthernetDetailsItem = ({dateArr, index}) => {
    return (
        <div className={s.items}>
            <div>{dateArr.map((item, i) => <DataItem key={i} item={item}/>)}</div>
            <p>
                {index === 11 ? '01:00'
                : index === 0 ? '00:05'
                : '00:' + (index + 1) * 5}
            </p>
        </div>
    );
};

export default EthernetDetailsItem;
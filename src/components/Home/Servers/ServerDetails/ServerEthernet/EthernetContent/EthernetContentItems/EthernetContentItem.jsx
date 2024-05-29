import React, {useMemo} from 'react';
import s from "./EthernetContentItems.module.scss";

const EthernetContentItem = ({index, hourData, setActiveTime, activeTime}) => {
    const items = useMemo(() => {
        const data = [];
        hourData.forEach((fiveMinute, i) => {
            let types = {
                CONNECTED_4G: 0,
                CONNECTED_ETHERNET: 0,
                OFF: 0
            };
            fiveMinute.forEach(el => types[el.type] += 1);

            if (types.CONNECTED_4G > types.CONNECTED_ETHERNET && types.CONNECTED_4G > types.OFF) {
                data.push(<div key={i} className={s.item} style={{background: '#87D449'}}></div>);
            } else if (types.CONNECTED_ETHERNET > types.CONNECTED_4G && types.CONNECTED_ETHERNET > types.OFF) {
                data.push(<div key={i} className={s.item} style={{background: '#5BC2FF'}}></div>);
            } else if (types.CONNECTED_4G + types.CONNECTED_ETHERNET + types.OFF !== 0) {
                data.push(<div key={i} className={s.item} style={{background: '#A1B1C5'}}></div>);
            }
        });
        return data;
    }, [hourData]);

    return (
        <div className={s.items}>
            <div>
                {items}
            </div>
            <button type='button' onClick={() => setActiveTime(index)} className={`${activeTime === index  ? s.active : ''} ${activeTime === index + 1 ? s.bold : ''}`}>
                <span>{(index + 1) < 10 ? '0' + (index + 1) : (index + 1)}</span>
            </button>
            <span className={s.btnBg}/>
            {(index + 1) === 1 ? <p className={activeTime === 1 ? s.active : ''}><span>00</span></p> : ''}
        </div>
    );
};

export default EthernetContentItem;
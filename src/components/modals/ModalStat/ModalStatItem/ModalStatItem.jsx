import React, {useEffect, useState} from 'react';
import s from './ModalStatItem.module.scss';

const ModalStatItem = ({data, maxSend, maxFail}) => {
    const [successPercent, setSuccessPercent] = useState(0);
    const [failPercent, setFailPercent] = useState(0);
    const successNum = data.numberOfSuccess;
    const failNum = data.numberOfFail;

    useEffect(() => {
        const t = setTimeout(() => {
            setSuccessPercent(successNum / maxSend);
            setFailPercent(failNum / maxFail);
            clearTimeout(t);
        }, 300);
    }, []);

    return (
        <div className={s.itemBox}>
            <div className={s.date}>{data?.endDate.slice(8)}.{data?.endDate.slice(5,7)}</div>
            <div className={s.item}>
                <div className={s.send} style={{'--percent': successPercent}}><span>{new Intl.NumberFormat('ru-RU').format(successNum)}</span></div>
                <div className={s.fail} style={{'--percent': failPercent}}><span>{new Intl.NumberFormat('ru-RU').format(failNum)}</span></div>
            </div>
        </div>
    );
};

export default ModalStatItem;
import React, {useMemo} from 'react';
import s from "./ModalStatLabels.module.scss";

const ModalStatLabels = ({maxSend, maxFail}) => {
    const sendArr = useMemo(() => {
        const arr = [];
        for (let i = 9; i > 0; i--) {
            const numb = (maxSend / 9 * i).toFixed(0);
            arr.push(new Intl.NumberFormat('ru-RU').format(numb));
        }
        return arr;
    }, [maxSend]);

    const failArr = useMemo(() => {
        const arr = [];
        for (let i = 1; i < 4; i++) {
            const numb = (maxFail / 3 * i).toFixed(0);
            arr.push(new Intl.NumberFormat('ru-RU').format(numb));
        }
        return arr;
    }, [maxSend]);

    return (
        <div className={s.labels}>
            {sendArr?.map((item, i) => <span key={i}>{item}</span>)}
            <span>0</span>
            {failArr?.map((item, i) => <span key={i}>{item}</span>)}
        </div>
    );
};

export default ModalStatLabels;
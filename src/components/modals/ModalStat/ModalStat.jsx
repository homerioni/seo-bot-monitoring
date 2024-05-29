import React, {useMemo} from 'react';
import s from './ModalStat.module.scss';
import Modal from "../Modal";
import ModalStatHeader from "./ModalStatHeader/ModalStatHeader";
import ModalStatLabels from "./ModalStatLabels/ModalStatLabels";
import ModalStatItem from "./ModalStatItem/ModalStatItem";

const ModalStat = ({setModalStat, data, name}) => {
    const result = data?.statsEachDay.data?.result[0].deliveryStatistics.result;
    const maxSend = useMemo(() => {
        let value = 0;
        result?.forEach(item => value = item.numberOfSuccess > value ? item.numberOfSuccess : value);
        return value;
    }, [data]);
    const maxFail = useMemo(() => {
        let value = 0;
        result?.forEach(item => value = item.numberOfFail > value ? item.numberOfFail : value);
        return value;
    }, [data]);

    return (
        <Modal containerClass={s.container} onClose={() => setModalStat({isOpen: false, data: null})}>
            <ModalStatHeader name={name} title={data?.title} type={data?.type}/>
            <div className={s.stat}>
                <ModalStatLabels maxSend={maxSend} maxFail={maxFail}/>
                <div className={s.list}>
                    {result?.map(item => <ModalStatItem key={item.periodName} data={item} maxFail={maxFail} maxSend={maxSend}/>)}
                </div>
            </div>
        </Modal>
    );
};

export default ModalStat;
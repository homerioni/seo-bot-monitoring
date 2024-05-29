import React, {useState} from 'react';
import s from './ModalLog.module.scss';
import sModal from '../Modal.module.scss';

const ModalLog = ({data, setModalLog}) => {
    const [isClosed, setIsClosed] = useState(false);

    const onClose = () => {
        setIsClosed(true);
        const t = setTimeout(() => {
            setModalLog({isOpen: false});
            clearTimeout(t);
        }, 300);
    };

    return (
        <div className={`${sModal.modal} ${isClosed ? sModal.closeAnim : ''}`} onClick={onClose}>
            <div className={s.content} onClick={e => e.stopPropagation()}>
                {data.resultSuccess?.length ? data.resultSuccess.map(item => <p>{item}</p>) : false}
                {data.resultSuccess?.length && data.resultFail?.length ? <div className={s.line}/> : false}
                {data.resultFail?.length ? data.resultFail.map(item => <p>{item}</p>) : false}
            </div>
        </div>
    );
};

export default ModalLog;
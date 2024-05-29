import React, {useEffect, useState} from 'react';
import sModal from "./Modal.module.scss";

const Modal = ({children, onClose, containerClass, close}) => {
    const [isClosed, setIsClosed] = useState(false);

    const closeHandle = () => {
        if (!!onClose) {
            setIsClosed(true);
            const t = setTimeout(() => {
                onClose();
                clearTimeout(t);
            }, 300);
        }
    };

    useEffect(() => {if (close) closeHandle()}, [close]);

    return (
        <div className={`${sModal.modal} ${isClosed ? sModal.closeAnim : ''}`} onClick={closeHandle}>
            <div className={`${sModal.scrollBox}`}>
                <div className={`${sModal.container} ${containerClass}`} onClick={e => e.stopPropagation()}>
                    {!!onClose && <button type="button" className={sModal.close} onClick={closeHandle}/>}
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
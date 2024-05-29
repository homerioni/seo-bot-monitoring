import React from 'react';
import s from "./ModalNetwork.module.scss";
import Modal from "../Modal";

const ModalNetworkOptions = ({setModalNetwork, setModalOptions, setModalRouter, setModalRoot}) => {
    const onClick = handle => {
        handle();
        const t = setTimeout(() => {
            setModalOptions(false);
            clearTimeout(t);
        }, 300);
    };

    return (
        <Modal containerClass={s.container} onClose={() => setModalNetwork(false)}>
            <div className={s.icon}>
                <svg className="plus" xmlns="http://www.w3.org/2000/svg" width="31" height="30" viewBox="0 0 31 30" fill="none">
                    <path d="M15.5 1V29" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M0 15H31" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            <p className={s.title}>Что создаем?</p>
            <div className={s.buttons}>
                <button type="button" className={s.btn} onClick={() => onClick(() => setModalRouter(true))}>Роутер</button>
                <button type="button" className={s.btn} onClick={() => onClick(() => setModalRoot(true))}>ROOT-сервер</button>
            </div>
        </Modal>
    );
};

export default ModalNetworkOptions;